// src/components/BookForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchBook = async () => {
                const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}`);
                const book = response.data;
                setTitle(book.title);
                setAuthor(book.author);
                setDescription(book.description);
            };
            fetchBook();
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!title || !author) {
            setError("Title and Author are required");
            return;
        }

        try {
            if (id) {
                await axios.put(`http://127.0.0.1:8000api/books/${id}`, { title, author, description });
            } else {
                await axios.post('http://127.0.0.1:8000/api/books', { title, author, description });
            }
            history.push('/');
        } catch (error) {
            setError("Error saving book. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
            </form>
        </div>
    );
};

export default BookForm;