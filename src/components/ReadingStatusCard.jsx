import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Book, BookOpen, Star } from 'lucide-react';

function ReadingStatusCard({ book, onUpdate, onRemove }) {
  useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = async (status) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      onUpdate(book.id, status);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      onRemove(book.id);
      setShowConfirm(false);
    } catch (error) {
      console.error("Failed to remove book:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reading': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'wishlist': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reading': return <BookOpen />;
      case 'completed': return "done";
      case 'wishlist': return <Star />;
      default: return <Book />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Book Cover */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={book.coverUrl || 'https://via.placeholder.com/200x280/4f46e5/ffffff?text=No+Cover'} 
          alt={book.title} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(book.status)}`}>
            {getStatusIcon(book.status)} {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        
        {book.rating && (
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < Math.floor(book.rating) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">{book.rating.toFixed(1)}</span>
          </div>
        )}
        
        {book.pages && (
          <p className="text-xs text-gray-500 mt-2">{book.pages} pages</p>
        )}
        
        {book.genre && (
          <div className="mt-2 flex flex-wrap gap-1">
            {book.genre.split(',').slice(0, 3).map((genre, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {genre.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {["reading", "completed", "wishlist"].map(status => (
            <button 
              key={status}
              onClick={() => handleUpdate(status)}
              disabled={isUpdating}
              className={`flex-1 text-xs py-2 px-3 rounded-lg transition-colors ${
                book.status === status 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUpdating ? '...' : getStatusIcon(status)}
            </button>
          ))}
        </div>
        
        {!showConfirm ? (
          <button 
            onClick={() => setShowConfirm(true)}
            className="w-full text-xs py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
          >
            Remove
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleRemove}
              disabled={isUpdating}
              className={`flex-1 text-xs py-2 bg-red-600 text-white rounded-lg ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              }`}
            >
              {isUpdating ? 'Removing...' : 'Confirm'}
            </button>
            <button 
              onClick={() => setShowConfirm(false)}
              disabled={isUpdating}
              className="flex-1 text-xs py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingStatusCard;