import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, Star, BookOpen, Clock, ArrowRight } from 'lucide-react';

function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full flex items-center text-xs font-medium">
          <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
          {book.rating}
        </div>

        {/* Genre Badge */}
        <div className="absolute top-3 right-3 bg-white text-black px-2 py-1 rounded-full text-xs font-medium">
          {book.genre}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
          {book.title}
        </h3>
        
        <p className="text-gray-600 text-sm mt-1">by {book.author}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {book.pages} pages
          </div>
          <span className="text-xs text-gray-400">{book.publishYear}</span>
        </div>

        <p className="text-gray-700 text-sm mt-3 line-clamp-2">
          {book.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <button className="flex items-center text-gray-400 hover:text-black transition-colors">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-xs">Save</span>
          </button>
          
          <Link 
            to={`/book/${book.id}`}
            className="flex items-center text-black hover:text-gray-700 transition-colors group/link"
          >
            <span className="text-sm font-medium mr-2">View Details</span>
            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;