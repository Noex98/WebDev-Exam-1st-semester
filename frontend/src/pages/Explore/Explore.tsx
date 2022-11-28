import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { apiService } from '../../service/apiService';
import { Location, Filter } from './components'
import './style.scss';

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [categories, setCategories] = useState<number[]>([]);

    useEffect(() => {
        console.log(latitude);
        console.log(longtitude);
        if(latitude && longtitude){
            
            apiService.getResturantList(
                latitude,
                longtitude,
                maxDistance,
                categories,
                searchString,
                sortBy
                ).then(res => {
                    console.log(res.data);
                })
            }
    }, [longtitude, latitude, searchString, sortBy, maxDistance, categories])


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
