// src/components/BookDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}`);
            setBook(response.data);
        };
        fetchBook();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Description:</strong> {book.description}</p>
        </div>
    );
};

export default BookDetails;