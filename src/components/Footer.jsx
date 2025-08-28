import { BookOpen } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <div>

            {/* Footer */}
            <footer className='py-12 px-6 bg-black border-t border-gray-800'>
                <div className='max-w-6xl mx-auto text-center'>
                    <div className='flex items-center justify-center space-x-3 mb-6'>
                        <BookOpen className='w-8 h-8 text-white' />
                        <span className='text-2xl font-bold text-white'>Talespace</span>
                    </div>
                    <p className='text-gray-400 mb-6 max-w-2xl mx-auto'>
                        Your gateway to endless stories and literary adventures. Discover, read, and share your journey with fellow book lovers.
                    </p>
                    <div className='flex justify-center space-x-6 text-sm'>
                        <span className='text-gray-400'>© 2024 Talespace</span>
                        <span className='text-gray-400'>•</span>
                        <span className='text-gray-400'>All rights reserved</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer