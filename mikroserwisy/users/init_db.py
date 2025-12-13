import sqlite3
import bcrypt

connection = sqlite3.connect('database.db')


with open('users.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

# ukradzione z https://www.geeksforgeeks.org/python/hashing-passwords-in-python-with-bcrypt/

# example password
password = 'konienieistnieja'

# converting password to array of bytes
bytes = password.encode('utf-8')

# generating the salt
salt = bcrypt.gensalt()

# Hashing the password
hash = bcrypt.hashpw(bytes, salt)

cur.execute("INSERT INTO users (email, password) VALUES (?, ?)",
            ('a@a.com', hash))

connection.commit()
connection.close()