import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


function Navbar() {
    const { user, logout } = useAuth()
    const listStyle = {
        textDecoration: "none",
        display: "flex",
        flex: "flex-wrap",
        gap: "26px"
    }
    return (
        <nav className='flex justify-between items-center p-4 bg-gray-100 shadow'>
            <Link to="/" className='text-xl font-bold text-purple-600'>Talespace</Link>
            <div className='flex items-center gap-4'>
                {user ? (
                    <ul style={listStyle}>
                        {/* <span className='text-sm text-gray-700'>Hi, {user.displayName}</span> */}
                        <li><Link to="/dashboard">My Library</Link></li>
                        <li><Link to="/explore">Explore</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={logout} className='text-purple-600 hover:underline'>Logout</button></li>

                    </ul>
                ) : (
                    <ul style={listStyle}>
                        <li><Link to="/login" className='text-purple-600 hover:underline'>Login</Link></li>
                        <li><Link to="/signup" className='text-purple-600 hover:underline'>Sign Up</Link></li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar