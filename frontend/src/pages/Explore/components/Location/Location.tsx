import React, { useState, useEffect } from 'react'
import { ReactComponent as PinSvg } from '../../../../assets/icons/pin.svg';
import { TextInput } from '../../../../components';
import './style.scss';
import { ReactComponent as LocationSvg } from '../../../../assets/icons/location.svg';
import { useGeolocated } from 'react-geolocated';

type Props = {
    longtitude: number | null,
    setLongtitude: React.Dispatch<React.SetStateAction<number | null>>,
    latitude: number | null,
    setLatitude: React.Dispatch<React.SetStateAction<number | null>>
}

export const Location = ({ }: Props) => {
    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latutide, setLatitude] = useState<number | null>(null);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
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
    }, [coords?.latitude, coords?.longitude])

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
                    <div>{longtitude} {latutide}</div>
                </div>
            </div>
            <TextInput placeholder='Type adress or city...'>
                <LocationSvg />
            </TextInput>
        </div >
    )
        : (
            <div>Getting the location data&hellip; </div>
        );
};
