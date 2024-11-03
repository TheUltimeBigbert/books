// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };

    const deleteBook = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await axios.delete(`http://127.0.0.1:8000/api/books/${id}`);
            fetchBooks(); // Refresh the list
        }
    };

    return (
        <div>
            <h2>Book List</h2>
            <Link to="/add">Add Book</Link>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <Link to={`/view/${book.id}`}> View </Link>
                        <Link to={`/edit/${book.id}`}> Edit </Link>
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;