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

        response = requests.get('http://127.0.0.1:3003/local/verify_token/{token}')
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
    post = get_post(id)
    result =  {k: post[k] for k in post.keys()}
    return json.dumps(result)



@app.route("/api/orders",  methods=['POST'])
@token_required
def createPost():
    userID = request.get_json().get('userID')
    bookID = request.get_json().get('bookID')
    quantity = request.get_json().get('quantity')
    if not userID:
        return 'userID is required!', 400
    elif not bookID:
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

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3002)