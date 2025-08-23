import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/Firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { BookOpen, Mail } from 'lucide-react';



function Login() {
  const { signUp } = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("")
  const [ showPassword, setShowPassword ] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] =useState("")
  const [ isLogin, setIsLogin ] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await signUp(email, password)
      }

      navigate("/dashboard")
    } catch (error) {
      setError(getErrorMessage(error.code))
      console.error('Auth Error: ', error.code, error.message)
    } finally {
      setLoading(false)
    }
  }

  // const handleEmailLogin = async () => {
  //   // const result = await emailLogin(email, password)
  //   // if (result) navigate("/dashboard")

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate('/dashboard')
  //   } catch (error) {
  //     console.error('Login error: ', error.code,  error.message)
  //   }
  // }

  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate("/dashboard");
    } catch (error) {
      setError(getErrorMessage(error.code))
      console.error('Google login error: ', error.code,  error.message)
    } finally {
      setLoading(false)
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "Account disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/email-already-in-use":
        return "Email already in use";
      default:
        return "Error occurred during authentication";
      
      
      
 
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 bg-gradient-to-br from-purple-50 to-blue-100 p-4'>
       <div className='w-full max-w-md'>

        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <BookOpen className='w-6 h-6 text-black'/>
          </div>

          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Talespace
          </h1>

          <p className='text-gray-600'>
            Your Journey through stories begins here
          </p>

        </div>

        {/* Login form */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <h2 className='text-2xl font-bold text-center text-gray-900'>
            {isLogin ? "Welcome back:" : "Create Account"}
          </h2>

          <div className='mb-4'>
              {/* Error handling */}

              {error && (
                <div className=' mt-4 bg-red-50 border border-red-200
                rounded-lg text-red-700 text-center p-1 text-sm'>
                  {error}
                </div>
              )}

          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email */}
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2'/>

            </div>
          </form>
            
        </div>

       </div>
    </div>

    
  )
}

export default Login

