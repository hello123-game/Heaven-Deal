import React, { useContext, useRef, useState } from 'react'
import { checkValidData } from '../utils/validate'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../utils/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const [validationMessage, setValidationMessage] = useState(null)

    // const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [user, setUser] = useState({
        email: '',
        password: 'Binu@1234',

    })

    const {token} = useContext(AuthContext)

    const clickSignin = () => {
        console.log("Clicked")
        // setIsSignIn(!isSignIn)
        navigate("/signup")
    }

    const inputChange = (e) => {
        // console.log(e);
        setUser({
            ...user,
            [e.target.name]: e.target.value, //[] Dynamic
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Validation")
        const message = checkValidData(email.current.value, password.current.value)
        setValidationMessage(message)

        if (message) return;
        try {
            
                const res = await fetch(`http://localhost:8080/api/login`,{
                    method: "POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                if(res.ok){
                    const data = await res.json();
                    const userId = data.data.userId
                    console.log("response data", data)
                    if(data.data.authToken !== ""){
                        token(data.data.authToken)
                    }else{
                        navigate(`/verifyemail/${userId}`);
                        // <VerifyEmail />
                    }
                }

            
        } catch (err) {
            console.log("register", err);
        }
    }

    return (
        <form
            onSubmit={handleSubmit} //handleSubmit
            className="absolute mt-6 w-3/12 mx-auto left-0 right-0"
        >
            <div className='p-8 rounded-lg border border-solid shadow-lg'>
                <h1 className='p-2 font-bold text-3xl text-center'>Login</h1>
                {/* {
                    !isSignIn && <div className='my-3 w-full flex flex-col'>
                        <label>Full Name</label>
                        <input
                            // ref={name}
                            className='p-2 mt-1 border border-solid outline-none'
                            type='text'
                            name='name'
                            value={user.name}
                            onChange={inputChange}
                        />
                    </div>
                } */}
                <div className='my-3 w-full flex flex-col'>
                    <label>Email</label>
                    <input
                        ref={email}
                        className='p-2 mt-1 border border-solid outline-none'
                        type='email'
                        name='email'
                        placeholder=''
                        value={user.email}
                        onChange={inputChange}
                    />
                </div>
                <div className='my-3 w-full flex flex-col'>
                    <label>Password</label>
                    <input
                        ref={password}
                        className='p-2 mt-1 border border-solid outline-none'
                        type='password'
                        name='password'
                        onChange={inputChange}
                        placeholder=''
                        value={user.password} />
                </div>
                <p className='text-red-500'>{validationMessage}</p>
                <button
                    // onClick={handleValidation}
                    className='my-4 p-4 w-full bg-blue-400 text-white'
                    type='submit'
                >
                    Login
                </button>
                <span
                    className='cursor-pointer'
                    onClick={clickSignin}
                >
                    New to Heaven Deal? Register Now
                </span>
            </div>
        </form>
    )
}

export default Login