from flask import Flask, jsonify, make_response, request, abort
import requests
import threading
import json
import jwt
import sqlite3
from functools import wraps

app = Flask(__name__)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        headers = request.headers
        bearer = headers.get('Authorization')
        if not bearer:
            return make_response(jsonify({"message": "Brak tokena!"}), 401)

        token = bearer.split()[1]

        response = requests.get(f'http://127.0.0.1:3003/local/verify_token/{token}')
        if(response.status_code == 401):
            return make_response(jsonify({"message": "Token niepoprawny!"}), 401)

        return f(*args, **kwargs)
    return decorator

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_post(id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM orders WHERE id = ?',
                        (id,)).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

@app.route("/api/orders/<int:id>",  methods=['GET'])
def getPostById(id):
    conn = get_db_connection()
    orders = conn.execute('SELECT * FROM orders WHERE userID = ?', (id,)).fetchall()
    conn.close()
    result = []
    for item in orders:
        result.append({k: item[k] for k in item.keys()})
    return json.dumps(result)



@app.route("/api/orders",  methods=['POST'])
@token_required
def createPost():
    headers = request.headers
    bearer = headers.get('Authorization')
    if not bearer:
        return make_response(jsonify({"message": "Brak tokena!"}), 401)

    token = bearer.split()[1]
    try:
        data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
        userID = data.get('public_id')
    except:
        return make_response(jsonify({"message": "Token niepoprawny!"}), 401)
    bookID = request.get_json().get('bookID')
    quantity = request.get_json().get('quantity')
    if not bookID:
        return 'bookID is required!', 400
    elif not quantity:
        return 'quantity is required!', 400
    else:
        response = requests.get('http://127.0.0.1:3001/api/books/2')
        if(response.status_code == 404):
            return make_response(jsonify({"message": "We don't have this book!"}), 404)

        conn = get_db_connection()
        conn.execute('INSERT INTO orders (userID, bookID, quantity) VALUES (?, ?, ?)',
                     (userID, bookID, quantity))
        conn.commit()
        conn.close()
        return 'Order was successfully added', 200

@app.route("/api/orders/<int:id>",  methods=['PATCH'])
@token_required
def editPost(id):
    userID = request.get_json().get('userID')
    bookID = request.get_json().get('bookID')
    quantity = request.get_json().get('quantity')

    conn = get_db_connection()
    currentOrder = conn.execute('SELECT * FROM orders WHERE id = ?',
                            (id,)).fetchone()
    print(currentOrder)
    if not userID:
        userID = currentOrder['userID']
    if not bookID:
        bookID = currentOrder['bookID']
    if not quantity:
        quantity = currentOrder['quantity']

    headers = request.headers
    bearer = headers.get('Authorization')
    token = bearer.split()[1]
    try:
        data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
        publicID = data.get('public_id')
    except:
        return make_response(jsonify({"message": "Token niepoprawny!"}), 401)

    if(publicID != userID):
        conn.close()
        return 'You can not change this order', 409

    conn.execute('UPDATE orders SET userID = ?, bookID = ?, quantity = ?'
                 ' WHERE id = ?',
                 (userID, bookID, quantity, id))
    conn.commit()
    conn.close()
    return 'Order was successfully changed', 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3002)