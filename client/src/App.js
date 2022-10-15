import { Button, Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import api from "./api";
import BookTable from "./components/BookTable";
import RegisterModal from './components/RegisterModal';
import SearchModal from './components/SearchModal';


function App() {
  const [books, setBooks] = useState([]) // creating state "books"
  const [showRegister, setShowRegister] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    getBooks()
  }, [])

  function getBooks() {
    api.get('/books')
      .then((res) => {
        setBooks(res.data)
      })
  }

  function registerBook(isbn, name, author, numPages, numCopies) {
    api.post('/books', {
      isbn: isbn,
      name: name,
      author: author,
      numPages: numPages,
      numCopies: numCopies
    })
      .then(() => {
        setShowRegister(false)
        getBooks()
      })
  }

  function deleteBook(isbn) {
    api.delete(`/books/${isbn}`) // create a string putting isbn value on it
      .then(() => {
        getBooks()
      })
  }

  function updateBook(isbn, name, author, numPages, numCopies) {
    api.patch(`/books/${isbn}`, {
      name: name,
      author: author,
      numPages: numPages,
      numCopies: numCopies
    })
      .then(() => {
        getBooks()
      })
  }

  function showEditModal(book) {
    console.log(3, JSON.stringify(book))
    localStorage.setItem('selectedBook', JSON.stringify(book))
    setIsUpdating(true)
    setShowRegister(true)
  }

  function closeSearch() {
    setShowSearch(false)
  }

  function closeModal() {
    setShowRegister(false)
    console.log('setting to null...')
    localStorage.removeItem('selectedBook')
    setIsUpdating(false)
  }

  return (
    <Container>
      <RegisterModal show={showRegister} handleClose={closeModal} isUpdating={isUpdating} handleRegister={registerBook} handleUpdate={updateBook} />
      <SearchModal show={showSearch} handleClose={closeSearch} />
      <Row className='my-4 justify-content-space-between align-items-center'>
        <Col xs={10}>
          <h1 style={{
            fontSize: 54
          }}>本book</h1>
        </Col>
        <Col>
          <Row className="justify-content-space-between align-items-left">
            <Col xs={5}>
              <Button onClick={() => { setShowRegister(true) }} variant='dark'>
                Register
              </Button>
            </Col>
            <Col>
              <Button onClick={() => { setShowSearch(true) }}>
                Search
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <BookTable books={books} handleDelete={deleteBook} handleUpdate={showEditModal} />
    </Container>
  );
}

export default App;
