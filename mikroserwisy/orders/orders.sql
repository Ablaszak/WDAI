DROP TABLE IF EXISTS posts;

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userID int not null,
    bookID int not null,
    quantity int not null
);