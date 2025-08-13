import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/Firebase';
import BookCard from '../components/BookCard';

function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("favorites")
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!user) return;

    const fetchBooks = async () => {
      const ref = collection(db, "users", user.uid, activeTab )
      const snapShot = await getDocs(ref);
      const data = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setBooks(data)
    };

    fetchBooks();

  }, [user, activeTab])
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-purple-700 mb-4'>Your Talespace</h1>

      <div className='flex gap-4 mb-6'>
        {["favorites", "readingStatus"].map(tab => (
          <button key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded ${activeTab === tab ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          >
            {tab === "favorites" ? "Favorites" : "Reading Status"}
          </button>
        ))}
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {books.length > 0 ? (
          books.map(book => <BookCard key={book.id} book={book}/>)
        ) : (
          <p className='text-gray-500'>No books found here</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard