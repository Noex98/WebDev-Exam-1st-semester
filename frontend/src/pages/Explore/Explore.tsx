import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { Location, Filter } from './components'
import './style.scss';

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [categories, setCategories] = useState<number[]>([]);
    const [address, setAddress] = useState([]);

    useEffect(() => {
        const filter = {
            longtitude: longtitude,
            latitude: latitude,
            searchString: searchString,
            sortBy: sortBy,
            maxDistance: maxDistance,
            categories: categories
        }
        console.log(filter);



    }, [longtitude, latitude, searchString, sortBy, maxDistance, categories])

    useEffect(() => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=AIzaSyBvRjeC4wHsf574-_J6z-I7eEy32dmNCkQ`)
        .then((response) => response.json())
        .then((data) => setAddress(data))
        console.log(address);
        
    }, [latitude, longtitude])
    return (
        <><div className="component__Explore">
            <Location
                longtitude={longtitude}
                latitude={latitude}
                setLongtitude={setLongtitude}
                setLatitude={setLatitude} />
            <Filter
                searchString={searchString}
                sortBy={sortBy}
                maxDistance={maxDistance}
                setSearchString={setSearchString}
                setSortBy={setSortBy}
                setMaxDistance={setMaxDistance} />

        </div><Nav /></>
    )
}
