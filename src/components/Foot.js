import React from 'react'

const Foot = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1"></main>
            <footer className="text-center bg-gray-200 py-4">
                I am Footer
            </footer>
        </div>
        // <div className='flex bg-black text-white justify-center fixed bottom-0 min-w-full'>I am Footer</div>
    )
}

export default Foot