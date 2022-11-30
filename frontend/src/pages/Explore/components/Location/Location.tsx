import React, { useEffect, useState } from 'react'
import { ReactComponent as PinSvg } from '../../../../assets/icons/pin.svg';
import './style.scss';
import { ReactComponent as LocationSvg } from '../../../../assets/icons/location.svg';
import { useGeolocated } from 'react-geolocated';
import Autocomplete from "react-google-autocomplete";

type Props = {
    longtitude: number | null,
    setLongtitude: React.Dispatch<React.SetStateAction<number | null>>,
    latitude: number | null,
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>
    address: string,
}


export const Location = ({ longtitude, setLongtitude, latitude, setLatitude, address}: Props) => {
    const [customAddress, setCustomAddress] = useState<string>("")
    const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    useEffect(() => {
        if (coords?.latitude && coords?.longitude) {
            setLatitude(coords.latitude);
            setLongtitude(coords.longitude)
        }
    }, [coords, setLatitude, setLongtitude])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAddress(e.target.value);
      }
      console.log(customAddress);
      

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Allow location</div>
    ) : coords ? (
        < div className='components__Location' >
            <div className="locationDisplay">
                <PinSvg width="22px" height="22px" />
                <div>
                    <div>Search area near: </div>

                </div>
            </div>
            <Autocomplete placeholder={address} onChange={handleChange} oninput
                apiKey={process.env.REACT_APP_API_KEY}
                options={{
                    fields: ["formatted_address", "name"],
                    strictBounds: false,
                    types: ["address"],
                }}
            />
             <LocationSvg onClick={getPosition} />
           
    
        </div >
    )
        : (
            <div>Getting the location data&hellip; </div>
        );
};
