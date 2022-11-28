import { click } from '@testing-library/user-event/dist/click';
import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { apiService } from '../../service/apiService';
import { IFilter } from '../../types';
import { Location, Filter } from './components'

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [categories, setCategories] = useState<number[]>([]);

    useEffect(() => {
        if(!!latitude && !!longtitude){
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
        <>
            <Location />
            <Filter
                searchString={searchString}
                sortBy={sortBy}
                maxDistance={maxDistance}
                setSearchString={setSearchString}
                setSortBy={setSortBy}
                setMaxDistance={setMaxDistance}
            />
            <Nav />
        </>
    )
}
