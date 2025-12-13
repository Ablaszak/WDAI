import sqlite3

connection = sqlite3.connect('database.db')


with open('orders.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO orders (userID, bookID, quantity) VALUES (?, ?, ?)",
            (1, 1, 99999)
            )

cur.execute("INSERT INTO orders (userID, bookID, quantity) VALUES (?, ?, ?)",
            (1, 2, 250)
            )

connection.commit()
connection.close()