from flask import Flask, jsonify, make_response, request, abort
import requests
import threading
import json
import jwt
import sqlite3
from functools import wraps
import bcrypt

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_post(id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?',
                        (id,)).fetchone()
    conn.close()
    if post is None:
        abort(404)
    return post

@app.route("/local/verify_token/<String:token>")
def verify_token(token):
    data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
    publicID = data.get('public_id')
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE userID = ?', (publicID,)).fetchone()
    conn.close()
    if(user is None):
        return make_response(jsonify({"message": "Token niepoprawny!"}), 401)
    return make_response(jsonify({"message": "Token poprawny"}), 200)



@app.route("/api/register", methods = ['POST'])
def register():
    auth = request.get_json()
    email = auth.get('email')
    password = auth.get('password')

    if not auth or not email or not password:
        return make_response('Could not register!', 401, {'WWW-Authenticate': 'Basic-realm= "Login required!"'})

    # check if user exists
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()
    if(user is not None):
        return make_response('User already exists!', 409, {'WWW-Authenticate': 'Basic-realm= "User already exists!"'})

    connection = sqlite3.connect('database.db')

    cur = connection.cursor()

    # stolen from https://www.geeksforgeeks.org/python/hashing-passwords-in-python-with-bcrypt/

    # converting password to array of bytes
    bytes = password.encode('utf-8')

    # generating the salt
    salt = bcrypt.gensalt()

    # Hashing the password
    hash = bcrypt.hashpw(bytes, salt)

    cur.execute("INSERT INTO users (email, password) VALUES (?, ?)",
            (email, hash))

    connection.commit()
    connection.close()

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()
    id = user['userID']

    return jsonify({'ID': id})

@app.route("/api/login",  methods = ['POST'])
def login():
    auth = request.get_json()
    email = auth.get('email')
    password = auth.get('password')
    if not auth or not email or not password:
        return make_response('Could not verify!', 401, {'WWW-Authenticate': 'Basic-realm= "Login required!"'})

    # get user
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    # kradzione z https://www.geeksforgeeks.org/python/hashing-passwords-in-python-with-bcrypt/
    # encoding user password
    userBytes = password.encode('utf-8')
    # checking password
    if(bcrypt.checkpw(userBytes, user['password'])):
        token = jwt.encode({'public_id': user['userID']}, 'SECRET_KEY', algorithm='HS256')
        return jsonify({'token': token})

    return make_response('Could not verify password!', 403, {'WWW-Authenticate': 'Basic-realm= "Wrong Password!"'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3003)