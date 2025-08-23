import React, { useEffect, useState } from 'react'
import { getAllBooks } from "../services/Firestore"
import BookCard from '../components/BookCard';
import { books } from '../services/dummybooks';

function Explore() {
    // const [books, setBooks] = useState([])
    const [genreFilter, setGenreFilter] = useState("All");

    useEffect(() => {
        getAllBooks().then(books)
    }, [])

    const filteredBooks = genreFilter === "All"
    ? books
    : books.filter(book => book.genre === genreFilter)
  return (
    <div>
       <h2>Explore Stories</h2> 
       <select onChange={e => setGenreFilter(e.target.value)}>
        <option>All</option>
        <option>Fantasy</option>
        <option>Romance</option>
        <option>Thriller</option>
        <option>Sci-Fi</option>
       </select>

       <div className='book-grid'>
        {filteredBooks.map(book => (
            <BookCard key={book.id} book={book}/>
        ))}
       </div>
    </div>
  )
}

export default Explore