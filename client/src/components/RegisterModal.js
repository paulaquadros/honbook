import React from "react";
import { Modal, Form, Container, Button } from 'react-bootstrap'
import { useState } from "react";

export default function RegisterModal({ show, handleClose, isUpdating, handleRegister, handleUpdate }) {
    const [isbn, setIsbn] = useState('')
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [numPages, setNumPages] = useState('')
    const [numCopies, setNumCopies] = useState('')

    console.log(2, { isbn, name, author, numPages, numCopies })

    const value = JSON.parse(localStorage.getItem('selectedBook'))

    if (show && value) {
        localStorage.removeItem('selectedBook')
        console.log(1, value)
        setIsbn(value.isbn)
        setName(value.book_name)
        setAuthor(value.book_author)
        setNumPages(value.book_pages)
        setNumCopies(value.book_copies)
    }


    function clearClose() {
        handleClose()
        clearStates()
    }

    function clearStates() {
        setIsbn('')
        setName('')
        setAuthor('')
        setNumPages('')
        setNumCopies('')
    }

    function submitBook(event) {
        event.preventDefault()
        if (isUpdating) {
            handleUpdate(isbn, name, author, numPages, numCopies)
        } else {
            handleRegister(isbn, name, author, numPages, numCopies)
        }
        clearStates()
    }

    return (
        <Modal show={show} onHide={clearClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Book {isUpdating ? 'edit' : 'register'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitBook}>
                <Modal.Body>
                    <Container>
                        <Form.Group className="mb-3" hidden={isUpdating}>
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                value={isbn}
                                onChange={(event) => { setIsbn(event.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Book name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Book author</Form.Label>
                            <Form.Control
                                value={author}
                                onChange={(event) => { setAuthor(event.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Number of book pages</Form.Label>
                            <Form.Control
                                value={numPages}
                                onChange={(event) => { setNumPages(event.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Number of copies available</Form.Label>
                            <Form.Control
                                value={numCopies}
                                onChange={(event) => { setNumCopies(event.target.value) }}
                            />
                        </Form.Group>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">
                        {isUpdating ? 'Save changes' : 'Save new book'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
