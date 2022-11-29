import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { apiService } from '../../service/apiService';
import { Location, Filter, Categories } from './components'
import './style.scss';

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(1000);
    const [selectedCategories, setSelctedCategories] = useState<number[]>([]);
    const [address, setAddress] = useState<string>("");

    const [resturants, setResturants] = useState<any[]>([]);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        if(latitude && longtitude){
            apiService.getResturantList(
                latitude,
                longtitude,
                maxDistance,
                selectedCategories,
                searchString,
                sortBy
                ).then(res => {
                    if (res.succes){
                        setResturants(res.data)
                    }
                })
            }
    }, [longtitude, latitude, searchString, sortBy, maxDistance, selectedCategories])

    
    useEffect(() => {
        if(latitude && longtitude){
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longtitude}&key=AIzaSyBvRjeC4wHsf574-_J6z-I7eEy32dmNCkQ`)
            .then((response) => response.json())
            .then((data) => setAddress(data.results[0].formatted_address));
        }
    }, [latitude, longtitude])
    

    return (
        <>
            <div className="pages__explore">
                <Location
                    longtitude={longtitude}
                    latitude={latitude}
                    setLongtitude={setLongtitude}
                    setLatitude={setLatitude} 
                    address={address}
                />
                <div className='line'></div>
                <Filter
                    searchString={searchString}
                    sortBy={sortBy}
                    maxDistance={maxDistance}
                    setSearchString={setSearchString}
                    setSortBy={setSortBy}
                    setMaxDistance={setMaxDistance} 
                />

                <Categories 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelctedCategories}
                />
                <div className='line'></div>
                {resturants.map((resturant, index) => (
                    <div key={index}>{resturant.name}</div>
                ))}
            </div>
            <Nav />
        </>
    )
}
