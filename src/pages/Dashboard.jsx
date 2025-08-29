import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import ReadingStatusCard from '../components/ReadingStatusCard';
import { Bookmark, BookOpen, Filter, Heart, User } from 'lucide-react';
import { getBooks } from '../../controllers/bookControllers';


function Dashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("favorites");
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Fetch all books from MongoDB
        const booksData = await getBooks();
        
        // Filter based on active tab and status
        let filteredBooks = booksData;
        
        if (activeTab === "favorites") {
          filteredBooks = booksData.filter(book => book.isFavorite);
        } else if (activeTab === "readingStatus") {
          if (statusFilter !== "all") {
            filteredBooks = booksData.filter(book => book.status === statusFilter);
          }
        }
        
        setBooks(filteredBooks);
      } catch (err) {
        console.error('Error fetching books: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentUser, activeTab, statusFilter]);

  // Calculate stats for the dashboard
  const totalBooks = books.length;
  const readingNowCount = books.filter(book => book.status === "reading").length;
  const completedCount = books.filter(book => book.status === "completed").length;
  const favoritesCount = books.filter(book => book.isFavorite).length;

  return (
    <div className='p-6 min-h-screen bg-white text-black'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Your Dashboard</h1>
            <p className='text-gray-600'>Welcome back, {currentUser?.username || currentUser?.email}</p>
          </div>

          <div className='flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full'>
            <User className='w-5 h-5'/>
            <span>Profile</span>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg w-fit'>
          {[
            { id: "favorites", label: "Favorites", icon: Heart },
            { id: "readingStatus", label: "Reading Status", icon: BookOpen }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id); 
                  setStatusFilter("all");
                }} 
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200 ${
                  activeTab === tab.id 
                    ? "bg-white text-black shadow-lg border border-gray-200" 
                    : "text-gray-600 hover:text-black"
                }`}
              >
                <Icon className='w-5 h-5' />
                <span className='font-medium'>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Filters */}
        {activeTab === "readingStatus" && (
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <Filter className='w-5 h-5 text-gray-600'/>
              <span className='text-sm font-medium text-gray-700'>
                Filter by status:
              </span>
            </div>
            <div className='flex gap-2 flex-wrap'>
              {[
                { id: "all", label: "All Books" },
                { id: "reading", label: "Currently Reading" },
                { id: "completed", label: "Completed" },
                { id: "wishlist", label: "Wishlist" }
              ].map(status => (
                <button 
                  key={status.id} 
                  onClick={() => setStatusFilter(status.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    statusFilter === status.id 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='bg-black text-white p-6 rounded-2xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-400 text-sm'>Total Books</p>
                    <p className='text-3xl font-bold'>{totalBooks}</p>
                  </div>
                  <Bookmark className='w-8 h-8 text-gray-400'/>
                </div>
              </div>

              {activeTab === "favorites" ? (
                <div className='bg-gray-50 p-6 rounded-2xl border border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-gray-600 text-sm'>Favorites</p>
                      <p className='text-3xl font-bold text-black'>{favoritesCount}</p>
                    </div>
                    <Heart className='w-8 h-8 text-gray-400'/>
                  </div>
                </div>
              ) : (
                <>
                  <div className='bg-gray-50 p-6 rounded-2xl border border-gray-200'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-gray-600 text-sm'>Reading Now</p>
                        <p className='text-3xl font-bold text-black'>{readingNowCount}</p>
                      </div>
                      <BookOpen className='w-8 h-8 text-gray-400'/>
                    </div>
                  </div>

                  <div className='bg-gray-50 p-6 rounded-2xl border border-gray-200'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-gray-600 text-sm'>Completed</p>
                        <p className='text-3xl font-bold text-black'>{completedCount}</p>
                      </div>
                      <BookOpen className='w-8 h-8 text-gray-400'/>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Book Grid */}
            {books.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {activeTab === "readingStatus" 
                  ? books.map(book => (
                      <ReadingStatusCard key={book._id} book={book}/>
                    ))
                  : books.map(book => (
                      <BookCard key={book._id} book={book}/>
                    ))
                }
              </div>
            ) : (
              <div className='text-center py-20'>
                <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4'/>
                <h3 className='text-xl font-semibold text-gray-700'>No Books Found</h3>
                <p className='text-gray-500'>
                  {activeTab === "favorites" 
                    ? "You haven't added any books to your favorites yet." 
                    : "No books match your current filter."
                  }
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;