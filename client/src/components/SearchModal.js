import React, { useState } from "react";
import { Modal, Form, Container, Row, Button, Col, InputGroup } from "react-bootstrap";
import api from "../api";

export default function SearchModal({ show, handleClose }) {
    const [query, setQuery] = useState('')
    const [book, setBook] = useState(null)

    function clearClose() {
        handleClose()
        setQuery(null)
        setBook(null)
    }

    function searchBook(event) {
        event.preventDefault()
        api.get(`/books/${query}`)
            .then((res) => {
                setBook(res.data)
            })
    }

    return (
        <Modal show={show} onHide={clearClose}>
            <Modal.Header closeButton>
                Searching books
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={searchBook}>
                        <Row className="justify-content-center align-items-center">
                            <Col>
                                <InputGroup className="mb-3">
                                    <Form.Control value={query} onChange={(event) => { setQuery(event.target.value) }} aria-describedby="button-search" placeholder="Insert ISBN code" />
                                    <Button type="submit" id="button-search" variant="dark">
                                        Search
                                    </Button>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                    {book && (
                        <Container>
                            <p>{book.book_name}</p>
                            <p>{book.book_author}</p>
                            <p>{book.book_pages}</p>
                            <p>{book.book_copies}</p>
                        </Container>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    )
}

