import React from 'react'
import { Link } from 'react-router-dom'

const Head = () => {
    return (
        <>
            <div className=' p-4 flex place-content-around items-center'>
                <a href="/">
                    <img className='h-20'
                        src='https://images.fineartamerica.com/images-medium-large-5/7th-heaven-7th-heaven-logo-brand-a.jpg' alt='logo' />
                </a>

                <ul className='flex gap-4'>
                    <Link to={"/"}><li>Home</li></Link>
                    <li>Market</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <Link to={"signup"}>
                        <li>
                            Sign Up
                        </li>
                    </Link>

                </ul>
            </div>
        </>
    )
}

export default Head