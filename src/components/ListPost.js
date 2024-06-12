import React, { useEffect, useState } from 'react'
import IndividualPost from './IndividualPost'

const ListPost = () => {

    const [myPostData, setMyPostData] = useState([])

    useEffect(() => {
        myPost()
    }, [])

    const myPost = async() => {
        try{

            let userToken = localStorage.getItem("authToken")
            const response = await fetch('http://localhost:8080/api/mypost',{
                method: "GET",
                headers: {
                    "auth-token": userToken,
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setMyPostData(data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
            
        }catch(err){
            console.error("Error fetching mypost", err)
        }
    }
    return (
        <div>
            {
                myPostData.map((element) => 
                    
                <IndividualPost  
                key = {element?._id}
                list = {element} />
                )
            }
        </div>
    )
}

export default ListPost