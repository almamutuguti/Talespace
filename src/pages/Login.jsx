import React from 'react'
import { useAuth } from '../context/AuthContext'


function Login() {

    const { login } = useAuth();
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
       <h1 className='text-3xl font-bold text-purple-700 mb-6'>Welcome to Talespace</h1> 
       <button onClick={login}
                className='text-white px-6 py-3 rounded hover:bg-purple-700 bg-purple-600'
        >
        Sign in with Google
       </button>
    </div>
  )
}

export default Login