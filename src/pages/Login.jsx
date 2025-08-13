import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Route } from 'react-router-dom';


function Login() {
  const { login, emailLogin, signUp } = useAuth();
  const { email, setEmail } = useState("");
  const { password, setPassword} = useState("")
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
       <h1 className='text-3xl font-bold text-purple-700 mb-6'>Welcome to Talespace</h1>
       <div className='w-full max-w-sm bg-white p-6 rounded shadow'>
          <input type="email"
                  placeholder='Email'
                  className='w-full mb-2 p-2 border rounded'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
          />
          <input type="password"
                  placeholder='Password'
                  className='w-full mb-4 p-2 border rounded'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
          />
          <button className='w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 mb-2' onClick={() => emailLogin(email, password)}>
            Login
          </button>
          <button onClick={() => signUp(email, password)} className='w-full bg-gray-200 py-2 rounded hover:bg-gray-300'>
            Sign Up
          </button>
        </div> 
       <button onClick={login}
                className='text-white px-6 py-3 rounded hover:bg-purple-700 bg-purple-600'
        >
        Sign in with Google
       </button>
    </div>

    
  )
}

export default Login