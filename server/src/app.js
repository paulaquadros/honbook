const cors = require('cors')

const express = require('express')

const app = express()

const dbConfig = require('./dbConfig.json')

const mysql = require('mysql')

const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
})

//connecting to database
con.connect((err) => {
    if (err) {
        throw err
    }
    console.log('connected to database.')
})

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

//returns list of books 
app.get('/books', (req, res) => {
    const query = "SELECT * FROM books"
    con.query(query, (err, result) => {
        if (err) {
            throw err
        }
        res.send(JSON.parse(JSON.stringify(result))) //front-end receives list of books in JSON format 
    })
})

app.post('/books', (req, res) => {
    console.log(req.body)
    const { isbn, name, author, numPages, numCopies } = req.body
    if (!isbn) {
        res.status(401).send({
            message: 'isbn code cannot be empty.'
        })
        return
    }

    const query = "INSERT INTO books VALUES (?, ?, ?, ?, ?)"
    con.query(query, [isbn, name, author, numPages, numCopies], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }
        res.send({  // returns a successful message
            result: true
        })
    })
})

app.patch('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const { name, author, numPages, numCopies } = req.body
    const query = "UPDATE books SET book_name = ?, book_author = ?, book_pages = ?, book_copies = ? WHERE isbn = ?"
    con.query(query, [name, author, numPages, numCopies, isbn], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }
        res.send({
            result: true
        })
    })
})

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const query = "DELETE FROM books WHERE isbn = ?"
    con.query(query, [isbn], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }
        res.send({
            result: true
        })
    })
})

app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    const query = "SELECT * FROM books WHERE isbn = ?"
    con.query(query, [isbn], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err
            })
            return
        }

        res.send(JSON.parse(JSON.stringify(result[0])))

    })
})

app.listen(3001, () => {
    console.log('server is running...')
})
