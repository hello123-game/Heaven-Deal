import React, { useEffect, useState } from 'react'
import MyMap from './MyMap'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const FormPost = () => {
    const [data, setData] = useState({
        title: "",
        description: "Start a Business - Rs. 250,000/- Too Risky.\niPhone - Rs.250,000/- Affordable.\nHealthy Groceries - Rs. 4,000/- Too Expensive.\nDinner Date - Rs. 4,000/- Reasonable.\nSkill- Rs. 20,000/- Too Expensive.\nTour - Rs. 20,000/-It's affordable.\nPeople always work for happiness instead of long-term growth.",
        latitude: "22",
        longitude: "22",
        location: "patan",

    })
    const [allTag, setAllTag] = useState([])
    const [allSubTag, setAllSubTag] = useState([])

    useEffect(() => {
        getAllTag()
    }, [])

    const position = [27.7293, 85.3343]

    
    const HandleClick = () => {
        const customIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        useMapEvent("click", async (e) => {
            const { lat, lng } = e.latlng
            const loc = await fetchGalliMap(lat, lng)
            // console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                setData((prevState) => ({
                    ...prevState,
                    latitude: lat.toFixed(8),
                    longitude: lng.toFixed(8),
                    location: loc.data.generalName
                })
            )
            // return <Marker />
        })
        return(
            <Marker position={[data.latitude, data.longitude]} icon={customIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
        )
            
    }

    const fetchGalliMap = async(lat, lng) =>{
        const response = await fetch(`https://route-init.gallimap.com/api/v1/reverse/generalReverse?accessToken=83a5ccd3-fc18-4eb3-8d98-a734446a4c2a&lat=${lat}&lng=${lng}`)
        return await response.json()
    }



    
    function handleChange(e) {
        if (e.target.name === "image") {
            setData((prevData) => ({ ...data, image: e.target.files[0] }))
        } else {
            setData(() =>
            ({
                ...data,
                [e.target.name]: e.target.value
            })
            )
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key])
        }
        try {
            let userToken = localStorage.getItem("authToken")
            const response = await fetch("http://localhost:8080/api/post", {
                method: "POST",
                headers: {
                    "auth-token": userToken,
                },
                body: formData
            })
            const result = await response.json()
            // console.log(result)
        } catch (error) {
            console.log("fetch error post", error)
        }
    }

    const getAllTag = async () => {
        try {
            const userToken = localStorage.getItem("authToken")
            const response = await fetch("http://localhost:8080/api/tag", {
                method: "GET",
                headers: {
                    "auth-token": userToken,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            // console.log(data)
            setAllTag(data.data)
        } catch (err) {
            console.log("Error fetching All Tag" + err);
        }
    }

    const selectTag = async (e) => {
        try {
            const userToken = localStorage.getItem("authToken")
            const subTagId = e.target.value
            const response = await fetch(`http://localhost:8080/api/subtag/${subTagId}`, {
                method: "GET",
                headers: {
                    "auth-token": userToken,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            console.log(data)
            setAllSubTag(data.data)
        }
        catch (error) {
            console.log("fetch error selectTag", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input  type='text' placeholder='title' onChange={handleChange} name='title' value={data.title}></input>
                <input type='text' placeholder='description' onChange={handleChange} name='description' value={data.description}></input>
                <select
                    onChange={(e) => selectTag(e)}
                >
                    <option>Select Tag</option>
                    {
                        allTag.map((tag) => {
                            return (
                                <option key={tag._id} value={tag._id}>
                                    {tag.title}
                                </option>
                            )
                        })
                    }
                </select>
                <select>
                    <option>Select Sub</option>
                    {
                        allSubTag.map((subTag) => {
                            return (
                                <option key={subTag._id} value={subTag._id}>
                                    {subTag.title}
                                </option>
                            )
                        })
                    }
                </select>
                <MapContainer className='w-5/6 h-96' center={position} zoom={19} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <HandleClick />
                </MapContainer>

                <input type='text' placeholder='latitude' onChange={handleChange} name='latitude' value={data.latitude}></input>
                <input type='text' placeholder='longitude' onChange={handleChange} name='longitude' value={data.longitude}></input>
                <input type='file' placeholder='image' accept="image/*, .pdf, .doc, .docx" onChange={handleChange} name='image'></input>
                <input type='text' placeholder='location' onChange={handleChange} name='location' value={data.location}></input>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default FormPost