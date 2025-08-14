import React from 'react'
import { books } from '../services/dummybooks'
import { useParams } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"
import { addFavorite, setReadingStatus } from '../services/Firestore'

function BookDetails() {
    const { id } = useParams()
    const { user } = useAuth()
    const book = books.find(b => b.id === id)

    const handleFavorite = () => {
        if (user) addFavorite(user.uid, book)
    }

    const handleReadingStatus = status => {
        if (user) setReadingStatus(user.uid, book.id, status, book);
    }

    if (!book) {
        return <div className='p-6 text-red-500'>Book not found</div>
    }
  return (
    <div className='p-6 max-w-4xl mx-auto'>
        <div className='flex flex-col md:flex-row gap-6'>
            <img src={book.coverUrl}
                 alt={book.title} 
                 className='w-full md:w-1/3 object-cover rounded shadow'
                    
            />
            <div className='flex-1'>
                <h1 className='text-3xl font-bold text-purple-700'>{book.title}</h1>
                <p className='text-lg text-gray-600 mb-2'>by {book.author}</p>
                <span className='inline-block bg-purple-100 text-purple-700'>{book.genre}</span>
                <p className='text-gray-800'>{book.description}</p>

                {/* placeholder for added features */}
                <div className='mt-6 flex gap-4'>
                     <button className='bg-purple-600 text-white px-4 py-2 rounded' onClick={handleFavorite}>Add to Favorites</button> {/*add an icon */}
                    <button className='bg-purple-200 px-4 py-2 rounded' onClick={() => handleReadingStatus("reading")}>Mark as Reading</button>
                    <button className='bg-purple-200 px-4 py-2 rounded' onClick={() => handleReadingStatus("completed")}>Mark as Complete</button>
                    <button className='bg-purple-200 px-4 py-2 rounded' onClick={() => handleReadingStatus("wishlist")}>Add To Wishlist</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default BookDetails