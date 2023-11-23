import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button,Card,Row,Col,Form,Image,Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
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
handleClose()
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
const handleClose = () => setShow(false);
const addnew = () => setShow(true);
  return (<>
    <div>
      <h2>Book List</h2>
      <div> <select  className=' btn btn-primary '  placeholder='SORT' onChange={(e) => setSortOrder(e.target.value)}>
        SORT
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
      <Button onClick={addnew} >Add Books</Button>
      <Form.Control
      xs={4} sm={3} md={2}
              type="text"
              placeholder="Search..."
              className=" w-25 mr-sm-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /></div>
      
        <Row className="justify-content-md-center mt-4 d-flex flex-col">
        {books && books.map((book) => (<>
           
          <Col key={book._id} xs={12} sm={6} md={3}>
<Card key={book._id} style={{ width: '18rem' }}>
<Image variant="top" src={book.ImageUrl
} ></Image>
<Card.Body>
  <Card.Title> Title:{book.title}</Card.Title>
  <Card.Title> Author:{book.author}</Card.Title>
  <p>{book.genre}</p>
  <p>{book.price}</p>
  <p>{book.language}</p>
  <p><span><h4>Plot</h4></span>{book.plot}</p>
  <p><span><h4>synopsis</h4></span>{book.synopsis}</p>
  <Card.Text>
   <p>Puplish Year <h5>{book.publishedYear}</h5></p>
  </Card.Text>
  <Button variant="danger" onClick={() => deleteBook(book._id)}>Delete</Button>
</Card.Body>
</Card></Col>
</> ))}</Row>
     
    
      <button ></button>
    </div>


//model
<Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <input
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
        <input
        type="text"
        placeholder="price"
        value={price}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="plot"
        value={plot}
        onChange={(e) => setAuthor(e.target.value)}
      />
       <input
        type="text"
        placeholder="Synopsis"
        value={synopsis}
        onChange={(e) => setYear(e.target.value)}
      />
        <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="language"
        value={language}
        onChange={(e) => setAuthor(e.target.value)}
      />
       <input
        type="text"
        placeholder="Image"
        value={ImageUrl}
        onChange={(e) => setYear(e.target.value)}
      />
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBook}>
          Add Book
          </Button>
        </Modal.Footer>
      </Modal>
      </>);
}

export default App;
