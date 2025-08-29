import React, { useState } from 'react'
import { books } from '../services/dummybooks'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"

import { 
  Heart, 
  Bookmark, 
  Star, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  CheckCircle, 
  BookOpen,
  Eye,
  Share,
  Plus,
  ChevronDown
} from 'lucide-react'

function BookDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const book = books.find(b => b.id === parseInt(id))
    const [currentImage] = useState(book?.cover || '')
    const [selectedStatus, setSelectedStatus] = useState('')
    const [showStatusDropdown, setShowStatusDropdown] = useState(false)

    const handleFavorite = async () => {
        if (user) {
            try {
                await addFavorite(user.uid, book)
                // Show success feedback
            } catch (error) {
                console.error('Error adding to favorites:', error)
            }
        }
    }

    const handleReadingStatus = async (status) => {
        if (user) {
            try {
                await setReadingStatus(user.uid, book.id, status, book)
                setSelectedStatus(status)
                setShowStatusDropdown(false)
            } catch (error) {
                console.error('Error setting reading status:', error)
            }
        }
    }

    const readingStatusOptions = [
        { value: 'reading', label: 'Currently Reading', icon: BookOpen },
        { value: 'completed', label: 'Mark as Completed', icon: CheckCircle },
        { value: 'wishlist', label: 'Add to Wishlist', icon: Bookmark }
    ]

    if (!book) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
                    <p className="text-gray-600 mb-4">The book you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/explore')}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Browse Books
                    </button>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Explore
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Book Cover */}
                        <div className="lg:w-2/5 p-8">
                            <div className="relative group">
                                <img 
                                    src={currentImage} 
                                    alt={book.title}
                                    className="w-full h-auto rounded-xl shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = 'https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=600';
                                    }}
                                />
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full flex items-center text-sm font-medium">
                                    <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                                    {book.rating}
                                </div>
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="lg:w-3/5 p-8">
                            <div className="space-y-6">
                                {/* Title and Author */}
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                        {book.title}
                                    </h1>
                                    <p className="text-xl text-gray-600">by {book.author}</p>
                                </div>

                                {/* Meta Information */}
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span>{book.pages} pages</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <span>Published {book.publishYear}</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                        {book.genre}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {book.description}
                                    </p>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">ISBN</h4>
                                        <p className="text-gray-600">{book.isbn}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Genre</h4>
                                        <p className="text-gray-600">{book.genre}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                                    {/* Favorite Button */}
                                    <button
                                        onClick={handleFavorite}
                                        className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <Heart className="w-5 h-5 mr-2" />
                                        Add to Favorites
                                    </button>

                                    {/* Reading Status Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                            className="flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Reading Status
                                            <ChevronDown className="w-4 h-4 ml-2" />
                                        </button>
                                        
                                        {showStatusDropdown && (
                                            <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                                {readingStatusOptions.map((option) => {
                                                    const Icon = option.icon;
                                                    return (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => handleReadingStatus(option.value)}
                                                            className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                        >
                                                            <Icon className="w-4 h-4 mr-3 text-gray-600" />
                                                            <span>{option.label}</span>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Share Button */}
                                    <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors">
                                        <Share className="w-5 h-5 mr-2" />
                                        Share
                                    </button>
                                </div>

                                {/* Current Status Display */}
                                {selectedStatus && (
                                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="text-green-800">
                                            Added to {selectedStatus.replace('_', ' ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Books Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {book.genre}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books
                            .filter(b => b.genre === book.genre && b.id !== book.id)
                            .slice(0, 3)
                            .map(relatedBook => (
                                <div 
                                    key={relatedBook.id} 
                                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => navigate(`/book/${relatedBook.id}`)}
                                >
                                    <img 
                                        src={relatedBook.cover} 
                                        alt={relatedBook.title}
                                        className="w-full h-40 object-cover rounded mb-3"
                                    />
                                    <h3 className="font-semibold text-gray-900">{relatedBook.title}</h3>
                                    <p className="text-sm text-gray-600">by {relatedBook.author}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails
