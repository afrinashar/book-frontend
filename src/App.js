import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button,Card,Row,Col,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const [year, setYear] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [language, setLanguage] = useState('');
  const [plot, setPlot] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3000/books');
    setBooks(response.data);
  };
console.log(books,"book")
  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    await axios.post('http://localhost:3000/books', { ImageUrl, title, author,publishedYear,genre,plot,synopsis,language,price  });
    setTitle('');
    setAuthor('');
    setYear('');
    fetchBooks();
    setGenre('');
      setPlot('');
    setPublishedYear('');
    setImageUrl('');
setSynopsis('');
setLanguage('');
setPrice('');
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    fetchBooks();
  };
 // Search logic
//  const filteredBooks = books.filter((book) =>
//  book.title.toLowerCase().includes(searchTerm.toLowerCase())
//  )
//  console.log(filteredBooks,"filteredBooks");


 // Sorting logic
// const sortedBooks = [...filteredBooks].sort((a, b) => {
//  const order = sortOrder === 'asc' ? 1 : -1;
//  return order * a.title.localeCompare(b.title);
// });

  return (
    <div>
      <h2>Book List</h2>
      <div> <select  className=' btn btn-primary '  placeholder='SORT' onChange={(e) => setSortOrder(e.target.value)}>
        SORT
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
      
      <Form.Control
      xs={4} sm={3} md={2}
              type="text"
              placeholder="Search..."
              className=" w-25 mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /></div>
      
        <Row className="justify-content-md-center d-flex flex-col">
        {books && books.map((book) => (<>
           
          <Col key={book._id} xs={12} sm={6} md={3}>
<Card key={book._id} style={{ width: '18rem' }}>
<Card.Img variant="top" src={book.ImageUrl} />
<Card.Body>
  <Card.Title> Title:{book.title}</Card.Title>
  <Card.Title> Author:{book.author}</Card.Title>
  <Card.Text>
    <h5>{book.publishedYear}</h5>
  </Card.Text>
  <Button variant="danger" onClick={() => deleteBook(book._id)}>Delete</Button>
</Card.Body>
</Card></Col>
</> ))}</Row>
     
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
