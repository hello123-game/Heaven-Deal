import React, { useState } from 'react'
import FormPost from './FormPost'
import ListPost from './ListPost'

const AddPost = () => {
    const [activeTab, setActiveTab] = useState('post')

    const handleTabChange = (active) => {
        setActiveTab(active)
    }
    return (
        <>
            <div className='flex justify-center gap-4'>
                <button
                    className={`rounded-lg p-4 ${activeTab === 'post' ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={() => handleTabChange('post')}

                >
                    Add Post
                </button>
                <button
                    className={`rounded-lg p-4 ${activeTab === 'list' ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={() => handleTabChange('list')}
                >
                    Your Post
                </button>
            </div>
            <div>
                {activeTab === 'post' && <FormPost />}
                {activeTab === 'list' && <ListPost />}
            </div>
        </>
    )
}

export default AddPost