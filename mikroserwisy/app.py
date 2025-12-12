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

        try:
            data = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
            if data['public_id'] != 'admin':
                return make_response(jsonify({"message": "Niepoprawny token!"}), 401)
            current_user = 'admin'
        except:
            return make_response(jsonify({"message": "Token niepoprawny!"}), 401)
        return f(*args, **kwargs)
    return decorator

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

@app.route("/login",  methods = ['POST'])
def login():
    auth = request.get_json()
    if not auth or not auth.get('username') or not auth.get('password'):
        return make_response('Could not verify!', 401, {'WWW-Authenticate': 'Basic-realm= "Login required!"'})

    # sprawdzenie danych w users.sql
    conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

    return make_response('Could not verify password!', 403, {'WWW-Authenticate': 'Basic-realm= "Wrong Password!"'})


if __name__ == '__main__':
    app.run()

