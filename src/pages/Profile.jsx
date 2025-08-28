import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserStats } from '../services/Firestore';
import Spinner from '../components/Spinner';
import { BookOpen, Heart, LogOut, Mail, User, ChevronRight, Edit, Bookmark, BarChart3 } from 'lucide-react';

function Profile() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({ read: 0, favorites: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchStats = async () => {
          if (user) {
            try {
              setLoading(true);
              const userStats = await getUserStats(user)
              setStats(userStats || { read: 0, favorites: 0 })
            } catch (err) {
              setError('Failed to load stats')
              console.error("Error fetching stats:", err)
            } finally {
              setLoading(false)
            }
          }
        }
        fetchStats();
    }, [user])

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Failed to logout;', error)
      }
    }

    if (loading) {
      return <Spinner />
    }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl w-full mx-auto'>
          {/* Header with page title */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-3 tracking-tight'>PROFILE</h1>
            <div className='w-24 h-1 bg-black mx-auto'></div>
          </div>
          
          {/* Profile card */}
          <div className='bg-white rounded-none shadow-xl border border-gray-200 p-8 mb-10'>
            {/* User info section */}
            <div className='flex flex-col md:flex-row items-center mb-10'>
              <div className='w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center mr-0 md:mr-8 mb-6 md:mb-0 border-4 border-white shadow-lg'>
                <User className='w-12 h-12 text-white'/>
              </div>
              <div className='text-center md:text-left'>
                <h2 className='text-2xl font-bold text-gray-900 uppercase tracking-wide'>
                  {user?.displayName || "READER"}
                </h2>
                <div className='flex items-center justify-center md:justify-start text-gray-600 mt-2 mb-4'>
                  <Mail className='w-5 h-5 mr-2'/>
                  <span className='text-gray-700'>{user?.email}</span>
                </div>
                <button className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1'>
                  <Edit className='w-4 h-4 mr-1'/>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
              <div className='border border-gray-800 rounded-none p-6 text-center transition-all hover:bg-gray-50'>
                <div className='flex items-center justify-center mb-4'>
                  <BookOpen className='w-8 h-8 text-black'/>
                </div>
                <h3 className='text-4xl font-light text-gray-900 mb-2'>
                  {stats.read}
                </h3>
                <p className='text-sm uppercase tracking-widest text-gray-600'>Books Read</p>
              </div>

              <div className='border border-gray-800 rounded-none p-6 text-center transition-all hover:bg-gray-50'>
                <div className='flex items-center justify-center mb-4'>
                  <Heart className='w-8 h-8 text-black'/>
                </div>
                <h3 className='text-4xl font-light text-gray-900 mb-2'>
                  {stats.favorites}
                </h3>
                <p className='text-sm uppercase tracking-widest text-gray-600'>Favorites</p>
              </div>

              <div className='border border-gray-800 rounded-none p-6 text-center transition-all hover:bg-gray-50'>
                <div className='flex items-center justify-center mb-4'>
                  <Bookmark className='w-8 h-8 text-black'/>
                </div>
                <h3 className='text-4xl font-light text-gray-900 mb-2'>
                  {stats.reading || 0}
                </h3>
                <p className='text-sm uppercase tracking-widest text-gray-600'>Reading Now</p>
              </div>
            </div>

            {/* Additional profile sections */}
            <div className='border-t border-gray-200 pt-8 mb-8'>
              <h3 className='text-lg font-semibold text-gray-900 mb-6 uppercase tracking-wide'>Activity</h3>
              
              <div className='space-y-4'>
                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                  <div className='flex items-center'>
                    <div className='bg-gray-100 p-2 mr-4'>
                      <BarChart3 className='w-5 h-5 text-gray-700'/>
                    </div>
                    <span className='text-gray-700'>Reading Streak</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-gray-900 font-medium mr-2'>14 days</span>
                    <ChevronRight className='w-5 h-5 text-gray-400'/>
                  </div>
                </div>
                
                <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                  <div className='flex items-center'>
                    <div className='bg-gray-100 p-2 mr-4'>
                      <BookOpen className='w-5 h-5 text-gray-700'/>
                    </div>
                    <span className='text-gray-700'>Last Book Read</span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-gray-900 font-medium mr-2'>The Silent Patient</span>
                    <ChevronRight className='w-5 h-5 text-gray-400'/>
                  </div>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className='mb-6 bg-gray-100 border border-gray-300 rounded-none text-gray-700 text-center p-3 text-sm'>
                {error}
              </div>
            )}
            
            {/* Logout button */}
            <div className='text-center'>
              <button 
                onClick={handleLogout} 
                className='
                  inline-flex items-center px-8 py-3 border border-gray-900
                   font-medium rounded-none text-gray-900 bg-white
                  hover:bg-gray-900 hover:text-white transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                  uppercase tracking-widest text-sm'
              >
                <LogOut className='w-5 h-5 mr-2'/>
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Footer note */}
          <p className='text-center text-gray-500 text-xs uppercase tracking-widest'>
            Reader Profile • Since 2023
          </p>
        </div>
    </div>
  )
}

export default Profile