import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const MyMap = () => {
    const HandleClick = () => {
        useMapEvent("click", (e)=>{
            const {lat, lng} = e.latlng
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        })
    }



    const position = [27.7293, 85.3343]

    const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });
    return (
        <MapContainer className='w-5/6 h-96' center={position} zoom={19} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <HandleClick />
        </MapContainer>
    )
}

export default MyMap