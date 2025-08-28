import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard';
import { books } from '../services/dummybooks';
import { BookOpen, ChevronDown, Filter, Grid, List, Search, Star, Clock, X } from 'lucide-react';

function Explore() {
  const [bookList, setBookList] = useState([])
  const [genreFilter, setGenreFilter] = useState("All");
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setBookList(books)
      } catch (err) {
        console.error("Error fetching books: ", err)
      } finally {
        setLoading(false)
      }
    };

    fetchBooks()
  }, []);

  const filteredBooks = bookList.filter(book => {
    const matchesGenre = genreFilter === "All" || book.genre === genreFilter;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title); // Fixed: localeCompare not localCompare
      case "author":
        return a.author.localeCompare(b.author); // Fixed: author not title
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.publishYear) - new Date(a.publishYear); // Fixed: publishYear not publishedDate
      default:
        return 0;
    }
  });

  const genres = ["All", "Fantasy", "Romance", "Thriller", "Sci-Fi", "Mystery", "Horror", "Biography", "Fiction", "Self-Help", "Finance", "Classic", "Dystopian"];

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 mt-10'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-gray-900 text-3xl font-bold'>
                Explore Stories
              </h1>
              <p className='text-gray-600 mt-2'>
                Discover {bookList.length}+ amazing books
              </p>
            </div>

            <div className='flex items-center space-x-4'>
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className='p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors'
              >
                {viewMode === "grid" ? <List className='w-5 h-5' /> : <Grid className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-2xl shadow-sm p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input 
                type="text"
                placeholder='Search books, authors, or genres...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none'
              />
            </div>

            {/* Genre Filter */}
            <div className='relative'>
              <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400'/>
              <select 
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className='w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none'
              >
                {genres.map(genre => (
                  <option value={genre} key={genre}>{genre}</option>
                ))}
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400'/>
            </div>

            {/* Sort */}
            <div className='relative'>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none'
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option> {/* Fixed: author not suthor */}
                <option value="rating">Sort by Rating</option>
                <option value="newest">Sort by Newest</option>
              </select>
              <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
            </div>
          </div>

          {/* Results Info */}
          <div className='mt-4 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Showing {sortedBooks.length} of {bookList.length} books
            </p>
            {genreFilter !== "All" && (
              <button
                onClick={() => setGenreFilter("All")} // Fixed: added function call
                className='text-sm text-purple-600 hover:text-purple-700'
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Books Grid/List */}
        {sortedBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {sortedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                viewMode={viewMode}
                onSelect={setSelectedBook}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedBook.title}</h3>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedBook.cover} // Fixed: cover not coverImage
                  alt={selectedBook.title}
                  className="w-48 h-64 object-cover rounded-lg mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">by {selectedBook.author}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{selectedBook.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedBook.pages} pages</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                  <div className="flex gap-2">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {selectedBook.genre}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {selectedBook.publishYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;