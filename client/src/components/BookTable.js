import React from "react";
import { Table, Button } from 'react-bootstrap'

// creating component "BookTable".
export default function BookTable({ books, handleDelete, handleUpdate }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Book name</th>
                    <th>Book author</th>
                    <th>Book pages</th>
                    <th>Book copies</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.isbn}>
                        <td>{book.isbn}</td>
                        <td>{book.book_name}</td>
                        <td>{book.book_author}</td>
                        <td>{book.book_pages}</td>
                        <td>{book.book_copies}</td>
                        <td>
                            <Button size="sm" variant="" onClick={() => handleUpdate(book)}>
                                Edit
                            </Button>{'  '}
                            <Button size="sm" variant="danger" onClick={() => handleDelete(book.isbn)} >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

