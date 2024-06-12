import React from 'react'

const IndividualPost = ({list}) => {
    console.log(list)
    
    return (
        <>
        <div>
            <h3 className='font-bold'>{list?.title}</h3>
            <p>{list?.description}</p>
            <img src={list?.image[0]?.url} alt='Not Found' />
        </div>
        </>
    )
}

export default IndividualPost