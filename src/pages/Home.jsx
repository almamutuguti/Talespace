import React from 'react'
import { books } from '../services/dummybooks'
import BookCard from '../components/BookCard'

function Home() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-purple-700 mb-4'>Welcome to Talespace</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {books.map(book => (
            <BookCard key={book.id} book={book}/>
          ))}
      </div>
    </div>
  )
}

export default Home