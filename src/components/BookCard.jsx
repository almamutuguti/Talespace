import React from 'react'
import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 hover:scale-105 transition'>
        <img src={book.coverUrl} alt={book.title} className='h-48 w-full object-cover rounded'/>
        <h3 className='text-lg font-semibold mt-2'>{book.title}</h3>
        <p className='text-sm text-gray-600'>{book.author}</p>
        <Link to={`/book/${book.id}`} className='text-purple-600 mt-2 inline-block hover:underline'>View Details</Link>
    </div>
  )
}

export default BookCard