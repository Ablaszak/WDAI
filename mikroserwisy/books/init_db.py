import sqlite3

connection = sqlite3.connect('database.db')


with open('books.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ('Ksionszka', 'Aótor', 2025)
            )

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ('Warunek', 'AGH', 560)
            )

connection.commit()
connection.close()