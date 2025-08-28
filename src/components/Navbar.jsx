import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14 flex items-center">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-black flex items-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L3 9L12 15L21 9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 9L12 15L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 15L12 21L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Talespace
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-black transition-colors duration-200 text-sm">
                                Dashboard
                            </Link>
                            <Link to="/explore" className="text-gray-600 hover:text-black transition-colors duration-200 text-sm">
                                Explore
                            </Link>
                            <Link to="/profile" className="text-gray-600 hover:text-black transition-colors duration-200 text-sm">
                                Profile
                            </Link>
                            <button 
                                onClick={logout} 
                                className="text-gray-600 hover:text-black transition-colors duration-200 text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-black transition-colors duration-200 text-sm">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors duration-200">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden text-black focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-14 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
                    <div className="flex flex-col space-y-3">
                        {user ? (
                            <>
                                <Link 
                                    to="/dashboard" 
                                    className="text-gray-600 hover:text-black py-1 transition-colors duration-200 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    to="/explore" 
                                    className="text-gray-600 hover:text-black py-1 transition-colors duration-200 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Explore
                                </Link>
                                <Link 
                                    to="/profile" 
                                    className="text-gray-600 hover:text-black py-1 transition-colors duration-200 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button 
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }} 
                                    className="text-gray-600 hover:text-black text-left py-1 transition-colors duration-200 text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-600 hover:text-black py-1 transition-colors duration-200 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="text-gray-600 hover:text-black py-1 transition-colors duration-200 text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;