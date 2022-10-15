CREATE DATABASE IF NOT EXISTS honbook;

USE honbook;

DROP TABLE IF EXISTS books;

CREATE TABLE books (
	isbn varchar(13) not null primary key,
    book_name varchar(225) not null,
    book_author varchar(225) not null,
    book_pages varchar(20) not null,
    book_copies varchar(225) not null
);

INSERT INTO books VALUES (
	"9786589711278", "Pride and Prejudice", "Jane Austen", "278", "15"
), 
	(
    "9780439655484", "Harry Potter and the Prisoner of Azkaban", "J.K Rolling", "435", "20"
	),
    (
    "9780486404882", "A General History of the Pyrates", "Daniel Defoe", "733", "10"
    )

