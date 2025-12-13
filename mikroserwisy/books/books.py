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
    post = conn.execute('SELECT * FROM books WHERE id = ?',
                        (id,)).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

@app.route("/api/books", methods=['GET'])
def getPosts():
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books').fetchall()
    conn.close()
    result = []
    for item in books:
      result.append({k: item[k] for k in item.keys()})
    return json.dumps(result)

@app.route("/api/books/<int:id>",  methods=['GET'])
def getPostById(id):
    post = get_post(id)
    result =  {k: post[k] for k in post.keys()}
    return json.dumps(result)

@app.route("/api/books",  methods=['POST'])
@token_required
def createPost():
    title = request.get_json().get('title')
    author = request.get_json().get('author')
    year = request.get_json().get('year')
    if not title:
        return 'Title is required!', 400
    elif not author:
        return 'Author is required!', 400
    elif not year:
        return 'Year is required!', 400

    else:
        conn = get_db_connection()
        conn.execute('INSERT INTO books (title, author, year) VALUES (?, ?, ?)',
                     (title, author, year))
        conn.commit()
        conn.close()
        return 'Book was successfully added', 200


@app.route("/api/books/<int:id>", methods=['DELETE'])
@token_required
def deletePost(id):
    post = get_post(id)
    conn = get_db_connection()
    conn.execute('DELETE FROM books WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return 'deleted', 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3001)

