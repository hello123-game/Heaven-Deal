import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useAuthContext } from '../utils/AuthContext'

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState("")
    const {userId} = useParams()
    console.log("Binu" + userId)
    const {token} = useAuthContext()
    const navigate = useNavigate()
    
    const inputChange = (e) => {
        setVerificationCode(e.target.value)
    } 

    const handleValidation = async (e) => {
        e.preventDefault()
        const dcode = {verificationCode}
        
        try 
            {
                const res = await fetch(`http://localhost:8080/api/verifyemail/${userId}`,{
                    method: "POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dcode)
                })
                console.log(res)
                    const data = await res.json();
                    let userIds = data.data.userId
                    console.log("response data", data)

                    if(data.data.authToken !== ""){
                        const authToken = data.data.authToken
                        token(authToken)
                        
                        const profileResponse = await fetch('http://localhost:8080/api/myprofile', {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": authToken
                            }
                        })
                        if(profileResponse.ok){
                            const profileData = await profileResponse.json() 
                            const name = profileData.data.name

                            localStorage.setItem("username", name)
                            navigate("/")
                        }else{
                            console.log("failed to fetch api profile")
                        }
                    }else{
                        navigate(`/verifyemail/${userIds}`);
                    }
                }
        catch (err) {
            console.log("register", err);
        }
    }

    return (
        <form
            onSubmit={handleValidation} 
            className="absolute mt-6 w-3/12 mx-auto left-0 right-0"
        >
            <div className='p-8 rounded-lg border border-solid shadow-lg'>
                <h1 className='p-2 font-bold text-3xl text-center'>Verification Code</h1>
                <div className='my-3 w-full flex flex-col'>
                    <label>OTP Code</label>
                    <input
                        className='p-2 mt-1 border border-solid outline-none'
                        type='text'
                        name='verificationCode'
                        value={verificationCode}
                        onChange={inputChange}
                    />
                </div>
                <button
                    className='my-4 p-4 w-full bg-blue-400 text-white'
                    type='submit'
                >
                    Verify OTP
                </button>
                
            </div>
        </form>
    )
}

export default VerifyEmail