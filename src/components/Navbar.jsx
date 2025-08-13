import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Navbar() {
    const { user, logout } = useAuth()
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-100 shadow'>
        <Link to="/" className='text-xl font-bold text-purple-600'>Talespace</Link>
        <div className='flex items-center gap-4'>
            {user ? (
                <div>
                    <span className='text-sm text-gray-700'>Hi, {user.displayName}</span>
                    <button onClick={logout} className='text-purple-600 hover:underline'>Logout</button>
                </div>
            ) : (
                <Link to="/login" className='text-purple-600 hover:underline'>Login</Link>
            )}
        </div>
    </nav>
  )
}

export default Navbar