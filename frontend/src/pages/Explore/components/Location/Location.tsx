import React, { useEffect, useState, useRef } from 'react'
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
}


export const Location = ({ longtitude, setLongtitude, latitude, setLatitude }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [customAddress, setCustomAddress] = useState<string>("")
    const [address, setAddress] = useState<string>("");
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

    useEffect(() => {
        if(latitude && longtitude){
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then(data => {
                setAddress(data.results[0].formatted_address)
                });
        }
    }, [latitude, longtitude])

    useEffect(() => {
        if(customAddress){
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${customAddress}{&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setLatitude(data.results[0].geometry.location.lat)
                setLongtitude(data.results[0].geometry.location.lng)
            })
        }
    }, [customAddress, setLatitude, setLongtitude]) 
    
    
    const removeInputValue = () => {
    if (inputRef.current?.value != null)
      inputRef.current.value = "";
    };
  

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
            <Autocomplete ref={inputRef} placeholder={address}
                apiKey={process.env.REACT_APP_API_KEY}
                onPlaceSelected={(place) => {
                    setCustomAddress(place.formatted_address)
                }}
                options={{
                    fields: ["formatted_address", "name"],
                    strictBounds: false,
                    types: ["address"],
                }}
            />
            <LocationSvg onClick={function(event){removeInputValue(); getPosition()}} />
        </div >
    )
        : (
            <div>Getting the location data&hellip; </div>
        );
};
