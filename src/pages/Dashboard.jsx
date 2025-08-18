import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/Firebase';
import BookCard from '../components/BookCard';
import ReadingStatusCard from '../components/ReadingStatusCard';

function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("favorites")
  const [books, setBooks] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!user) return;

    const fetchBooks = async () => {
      const ref = collection(db, "users", user.uid, activeTab)
      const snapShot = await getDocs(ref);
      let data = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      if (activeTab === "readingStatus" && statusFilter !== "all") {
        data = data.filter(book => book.status === statusFilter)
      }
      setBooks(data)
    };

    fetchBooks();

  }, [user, activeTab, statusFilter])
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-purple-700 mb-4'>Your Talespace</h1>

      {/* Tabs */}
      <div className='flex gap-4 mb-6'>
        {["favorites", "readingStatus"].map(tab => (
          <button key={tab}
            onClick={() => {setActiveTab(tab); setStatusFilter("all")}}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-purple-600 text-white" : "bg-gray-200"}`}
          >
            {tab === "favorites" ? "Favorites" : "Reading Status"}
          </button>
        ))}
      </div>

      {/* Status Filters */}

      {activeTab === "readingStatus" && (
        <div className='flex gap-2 mb-4'>
          {["all", "reading", "completed", "wishlist"].map(status => (
            <button key={status} onClick={() => setStatusFilter(status)} className={`px-3 py-1 rounded text-sm ${statusFilter === status ? "bg-purple-500 text-white" : "bg-gray-100"}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Book Card grid */}
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {books.length > 0 ? (
          activeTab === "readingStatus"
            ? books.map(book => <ReadingStatusCard key={book.id} book={book} />)
            : books.map(book => <BookCard key={book.id} book={book} />)
        ) : (
          <p className='text-gray-500'>No books found in this section.</p>
        )}
      </div>

      

    </div>
  )
}

export default Dashboard