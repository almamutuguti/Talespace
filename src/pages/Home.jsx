import React, { useEffect, useState } from 'react'
import { books } from '../services/dummybooks'
import BookCard from '../components/BookCard'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Star, Users, Bookmark, TrendingUp, ChevronRight } from 'lucide-react'

function Home() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [featuredBooks, setFeaturedBooks] = useState([])

  useEffect(() => {
    setIsVisible(true)
    // Select 3 random featured books
    const shuffled = [...books].sort(() => 0.5 - Math.random())
    setFeaturedBooks(shuffled.slice(0, 3))
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='pt-32 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-6xl mx-auto text-center'>
          <div className={`transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className='flex justify-center mb-6'>
              <div className='w-20 h-20 bg-black rounded-2xl flex items-center justify-center'>
                <BookOpen className='w-10 h-10 text-white' />
              </div>
            </div>
            
            <h1 className='text-5xl md:text-7xl font-bold mb-6 text-gray-900'>
              Discover Your
              <span className='block text-black'>Next Story</span>
            </h1>
            
            <p className='text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed'>
              Dive into a world of endless stories. Connect with readers, share your thoughts, 
              and explore books that will change your perspective.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <button
                onClick={() => navigate("/explore")}
                className='group bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg'
              >
                <span>Explore Books</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>

              <button
                onClick={() => navigate('/login')}
                className='border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-lg'
              >
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className='py-20 px-6 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-gray-900 mb-4'>
              Featured Stories
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Curated collection of books loved by our community
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
            {featuredBooks.map((book, index) => (
              <div 
                key={book.id}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className='mb-6 relative'>
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className='w-full h-60 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300'
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className='w-full h-60 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl hidden items-center justify-center'>
                    <BookOpen className='w-12 h-12 text-gray-400' />
                  </div>
                  
                  <div className='absolute top-4 right-4 bg-black/90 rounded-full p-2'>
                    <Bookmark className='w-4 h-4 text-white' />
                  </div>
                </div>

                <div className='space-y-3'>
                  <h3 className='text-xl font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-1'>
                    {book.title}
                  </h3>
                  
                  <p className='text-gray-600 text-sm'>
                    by {book.author}
                  </p>
                  
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-1'>
                      <Star className='w-4 h-4 text-yellow-400 fill-current' />
                      <span className='text-sm font-medium text-gray-700'>
                        {book.rating}
                      </span>
                    </div>
                    
                    <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                      {book.genre}
                    </span>
                  </div>

                  <p className='text-gray-600 text-sm line-clamp-2 leading-relaxed'>
                    {book.description}
                  </p>

                  <button className='w-full mt-4 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors transform hover:scale-105 flex items-center justify-center group/btn'>
                    Read More
                    <ChevronRight className='w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform' />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='text-center'>
            <button
              onClick={() => navigate('/explore')}
              className='border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center mx-auto space-x-2'
            >
              <span>View All Books</span>
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-20 px-6 bg-black text-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            {[
              { number: '15+', label: 'Books Available', icon: BookOpen },
              { number: '50K+', label: 'Active Readers', icon: Users },
              { number: '5K+', label: 'Reviews Posted', icon: Star },
              { number: '100+', label: 'New Monthly', icon: TrendingUp }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div 
                  key={index} 
                  className={`transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className='flex justify-center mb-4'>
                    <Icon className='w-8 h-8 text-gray-400' />
                  </div>
                  <div className='text-3xl md:text-4xl font-bold text-white mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-gray-400 text-sm'>
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-6 bg-gray-900 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to Start Your Reading Journey?
            </h2>
            <p className='text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed'>
              Join thousands of readers who are already discovering new stories and sharing their experiences.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button 
                onClick={() => navigate('/signup')}
                className='bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg'
              >
                Create Account
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className='border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 shadow-lg'
              >
                Browse Books
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home