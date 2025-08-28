import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Spinner from '../components/Spinner';



function Login() {
  const { signUp, user, emailLogin, login, loading: authLoading, error: authError } = useAuth();
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("")
  const [ showPassword, setShowPassword ] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] =useState("")
  const [ isLogin, setIsLogin ] = useState(true)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await emailLogin(email, password)
      } else {
        await signUp(email, password)
      }

    } catch (error) {
      setError(getErrorMessage(error.code))
      console.error('Auth Error: ', error.code, error.message)
    } finally {
      setLoading(false)
    }
  }



  const handleGoogleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      await login()
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

  const isLoading = loading || authLoading
  const errorMessage = error || authError


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

              {errorMessage && (
                <div className=' mt-4 bg-red-50 border border-red-200
                rounded-lg text-red-700 text-center p-1 text-sm'>
                  {errorMessage}
                </div>
              )}

          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email */}
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2
              w-5 h-5 text-gray-400'/>

              <input type="email" 
                      placeholder="Email Address" 
                      className="w-full pl-10 pr-4 py-3 border
                      border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500
                      focus:border-transparent outline-none transition-colors" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
              />

            </div>

            {/* Password */}
              <div className='relative'>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <input type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      className="w-full pl-10 pr-4 py-3 border
                      border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500
                      focus:border-transparent outline-none transition-colors" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      minLength={6}
              />
              <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 tranform -translate-y-1/2 text-gray-600'>
                  {showPassword ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5'/>}
              </button>
              </div>

              {/* Submit Button */}
              <button type='submit'
                      disabled={isLoading}
                      className='w-full bg-black text-white
                      py-3 px-4 rounded-lg font-medium hover:bg-gray-300 hover:text-black
                      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                      transition-colors duration-700 disabled:opacity-50
                      disabled:cursor-not-allowed'>

                        {isLoading ? (
                          <div className='flex items-center justify-center'>
                            <Spinner />
                            {isLogin ? "Signing in..." : "Creating Account"}
                          </div>
                        ) : (
                          isLogin ? "Sign In" : "Create Account"

                        )}
                
              </button>
          </form>

          {/* Divider */}
           
          <div className='relative items-center my-6'>
            <div className='flex-grow border-t border-gray-300 mb-4 justify-center items-center'></div>
            <span className='flex-shrink mx-32 text-gray-400 text-sm'>or continue with</span>
            <div className='flex-grow border-t border-gray-300'></div>
            
          </div>

            <div className='w-full'>
              {/* Google Sign In */}

              <button onClick={handleGoogleLogin} disabled={isLoading} className='w-full bg-black text-white
                      py-3 px-4 rounded-lg font-medium hover:bg-gray-300 hover:text-black
                      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                      transition-colors duration-700 disabled:opacity-50
                      disabled:cursor-not-allowed'>

              {/* <Google className="w-5 h-5" /> */}
              Sign In With Google

            </button>
            </div>

            
          
          {/* Toogle bettween login and sign up */}
            <div className='text-center mt-6'>
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account"}

                <button type='button' onClick={() => setIsLogin(!isLogin)}
                  className='text-gray-400 hover:underline
                  font-small focus:outline-none 
                  rounded'>
                    {isLogin ? "Sign Up" : "Sign In"}

                </button>
              </p>

            </div>
            
        </div>

       </div>
    </div>

    
  )
}

export default Login

