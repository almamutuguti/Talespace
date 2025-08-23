import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getUserStats } from '../services/Firestore';
import Spinner from '../components/Spinner';
import { BookOpen, Heart, LogOut, Mail, User } from 'lucide-react';

function Profile() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({ read: 0, favorites: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] =useState("")

    useEffect(() => {
        // if (user) {
        //     getUserStats(user).then(setStats)
        // }
        const fetchStats = async () => {
          if (user) {
            try {
              setLoading(true);
              const userStats = await getUserStats(user)
              setStats(userStats || { read: 0, favorites: 0 })
            } catch (err) {
              setError('Failed to load status')
              console.error("Error fetching status:", err)
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
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        {/* <h2>My Profile</h2>
        <p><strong>Email:</strong>{user?.email}</p>
        <p><strong>Books Read:</strong>{stats.read}</p>
        <p><strong>Email:</strong>{stats.favorites}</p>
        <button onClick={logout}>Logout</button> */}
        <div className='max-w-4xl mx-auto px-4'>
          {/* header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Profile</h1>
            <p className='text-gray-600'>Manage your reading journey and prefences</p>
          </div>
          {/* Profile card */}
          <div className='bg-white rounded shadow-lg p-6 mb-6'>

            {/* userInfo */} 
            <div className='flex items-center mb-6'>
              <div className='w-20 h-20 bg-gradient-to-br from-black to-gray-400 rounded-full flex items-center justify-center mr-4'>
                  <User className='w-6 h-6 text-white '/>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  {user?.displayName || "Reader"}
                </h2>
                <div className='flex items-center text-gray-600 mt-1'>
                  <Mail className='w-4 h-4 mr-2'/>
                  <span>{user?.email}</span>
                </div>
              </div>
            </div>

            {/* status grid */}
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
              <div className='bg-blue-50 rounded-xl p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <BookOpen className='w-6 h-6 text-black'/>
                </div>

                <h3 className='text-2xl font-bold text-gray-600 mb-1'>
                  {stats.read}
                </h3>
                <p className='text-sm text-gary-800'>Books Read</p>
              </div>

              <div className='bg-gray-100 rounded-xl p-4 text-center'>
                <div className='flex items-center justify-center mb-2'>
                  <Heart className='w-6 h-6 text-gray-600'/>
                </div>

                <h3 className='text-2xl font-bold text-gray-600 mb-1'>
                  {stats.favorites}
                </h3>
                <p className='text-sm text-gary-800'>Favorites</p>
              </div>

              
              

            </div>

            <div className='mb-4'>
              {/* Error handling */}

              {error && (
                <div className=' mt-4 bg-red-50 border border-red-200
                rounded-lg text-red-700 text-center p-1 text-sm'>
                  {error}
                </div>
              )}

            </div>
            
            <div className='text-center'>
                  <button onClick={handleLogout} className='
                  inline-flex items-center px-6 py-3 border border-transparent
                  text-base font-medium rounded-md text-white bg-red-600
                  hover:bg-red-700 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-red-500 transition-colors
                  duration-200'>

                    <LogOut className='w-5 h-5 mr-2'/>

                    Sign Out 

                  </button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Profile