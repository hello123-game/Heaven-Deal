import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../utils/AuthContext'

const Head = () => {
    const {profileData, setProfileData} = useAuthContext();

    const navigate = useNavigate()
    // let user = JSON.parse(localStorage.getItem("authToken"))
    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('username')
        // localStorage.clear();
        setProfileData('')
        navigate("/login")
    }

    // useEffect(() => {
    //     const localStorageName = localStorage.getItem('username')
    //     if(localStorageName){
    //         setProfileData(localStorageName)
    //     }
    //     // if (localStorage.getItem("authToken") && localStorage.getItem("authToken") !== null) {
    //     //     // profile();
    //     //     navigate("/")
    //     // } else {
    //     //     navigate("/login")
    //     // }
    //     //
    // }, [])

    return (
        <>
            <div className=' p-4 flex place-content-around items-center'>
                <a href="/">
                    <img className='h-20'
                        src='https://images.fineartamerica.com/images-medium-large-5/7th-heaven-7th-heaven-logo-brand-a.jpg' alt='logo' />
                </a>

                <ul className='flex gap-4'>
                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"market"}><li>Market</li></Link>
                    <Link to={"addpost"}><li>AddPost</li></Link>
                    <li>About Us</li>
                    <li>Contact Us</li>

                    {
                        profileData ?
                            <>
                                <li className='cursor-pointer' onClick={logout}>
                                    Logout
                                </li>
                                {/* {profileData && <li className='font-bold'>{profileData}</li>} */}
                                <li> {profileData} </li>
    
                            </>
                            :
                            <Link to={"login"}>
                                <li className='cursor-pointer'>
                                    Login
                                </li>
                            </Link>
                    }
                </ul>
            </div>
        </>
    )
}

export default Head
