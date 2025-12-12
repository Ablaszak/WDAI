DROP TABLE IF EXISTS boooks;

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Author text not null,
    title TEXT NOT NULL,
    year int not null
);