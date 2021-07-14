import '../index.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'

function Nearme() {

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const [got, setGot] = useState(false)
        const [center, setCenter] = useState([])
        const [loc, setLoc] = useState(false)
        const map = useMapEvents({
            click() {
                map.locate({
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                })
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
            locationerror() {
                console.log("access denied")
            }
        })

        if (position !== null && got === false) {
            setGot(true)
            console.log("fetch is called")
            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${position.lat}&long=${position.lng}`)
                .then((res) => res.json())
                .then((data) => setCenter(data.centers))
                .catch((e) => console.log(e))
        }

        return position === null ? null : (
            <>
                <Marker position={position}>
                    <Popup><b>You are here</b></Popup>
                </Marker>
                {
                    center !== [] ?
                        center.map((item, index) => <Marker
                            key={index}
                            position={[item.lat, item.long]} >
                            <Popup> <b>Center Name:</b>{item.name} <br></br><b>Address</b> {item.location}, {item.district_name}, {item.pincode} </Popup></Marker>) : null
                }
            </>
        )
    }

    return (
        <>
            <MapContainer center={[28.6139, 77.2090]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='<b>Click on the map to go to your location</b>'
                    url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=pBK9k3W2Nui7X94H2P1S"
                />
                <Marker position={[28.6139, 77.2090]}>
                    <Popup>
                        <b>Click on the map to go to your location</b>
                    </Popup>
                </Marker>
                <LocationMarker />
            </MapContainer>
        </>
    );
}

export default Nearme;
