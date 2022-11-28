import React, { useEffect, useState } from 'react'
import { Nav } from '../../components'
import { IFilter } from '../../types';
import { Location, Filter } from './components'

export const Explore = () => {

    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latutide, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(10);
    const [categories, setCategories] = useState<number[]>([]);

    useEffect(() => {
        const filter = {
            longtitude: longtitude,
            latutide: latutide,
            searchString: searchString,
            sortBy: sortBy,
            maxDistance: maxDistance,
            categories: categories
        }

        

    }, [longtitude, latutide, searchString, sortBy, maxDistance, categories])
    

    return (
        <>
            <Location />
            <Filter />
            <Nav />
        </>
    )
}
