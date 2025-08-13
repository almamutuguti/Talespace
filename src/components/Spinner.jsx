import React from 'react'

function Spinner() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600 border-opacity-50'></div>
    </div>
  )
}

export default Spinner