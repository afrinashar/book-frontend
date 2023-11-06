import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3000/books');
    setBooks(response.data);
  };
console.log(books)
  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    await axios.post('http://localhost:3000/books', { title, author,year });
    setTitle('');
    setAuthor('');
    setYear('');
    fetchBooks();
    
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} year of{book.year}
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
       <input
        type="text"
        placeholder="Year of Publish"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
