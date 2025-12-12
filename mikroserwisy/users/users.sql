DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    email text not null,
    password text -- to nie powinno być bcrypt czy coś?
);