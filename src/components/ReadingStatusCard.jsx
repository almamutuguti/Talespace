import React from 'react'
import { useAuth } from '../context/AuthContext'
import { removeReadingStatus, updateReadingStatus } from '../services/Firestore'

function ReadingStatusCard({ book }) {

    const { user } = useAuth()

    const handleUpdate = status => {
        updateReadingStatus(user.uid, book.id, status );
    }

    const handleRemove = () => {
        removeReadingStatus(user.uid, book.id)
    }
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
        <img src={book.coverUrl} alt={book.title} className='h-48 w-full object-cover rounded'/>
        <h3 className='text-lg font-semibold mt-2'>{book.title}</h3>
        <p className='text-sm text-gray-600'>{book.author}</p>
        <p className='text-xs text-purple-500 mt-1'>Status: {book.status}</p>

        <div className='mt-3 flex flex-wrap gap-2'>
            {["reading", "completed", "wishlist"].map(status => (
                <button key={status} onClick={() => handleUpdate(status)} className='text-xs bg-gray-200 px-2 rounded hover:bg-gray-300'>Mark as {status}</button>

            ))}

            <button onClick={handleRemove} className='text-xs text-red-500 hover:underline'>Remove</button>
        </div>
    </div>
  )
}

export default ReadingStatusCard