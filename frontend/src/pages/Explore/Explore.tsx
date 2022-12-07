import React, { useEffect, useState } from 'react'
import { Nav, Spinner } from '../../components'
import { apiService } from '../../service/apiService';
import { IRestaurant } from '../../types';
import { accesLocalStorage } from '../../utils';
import { Location, Filter, Restaurant } from './components'
import { Categories } from './components/Categories';
import './style.scss';

export const Explore = () => {

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [isLoading, setIsloading] = useState(true);

    //Filters
    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(accesLocalStorage('maxDistance'));
    const [selectedCategories, setSelctedCategories] = useState<number[]>([]);

    useEffect(() => {
            if(latitude && longtitude){
                setIsloading(true);
                apiService.getRestaurantList(
                    latitude,
                    longtitude,
                    maxDistance,
                    selectedCategories,
                    searchString,
                    sortBy
                ).then(res => {
                    if (res.succes){
                        setRestaurants(res.data)
                    }
                    setIsloading(false)
                })
            }
    }, [longtitude, latitude, searchString, sortBy, maxDistance, selectedCategories])

    return (
        <>
            <div className="pages__explore">
                <Location
                    longtitude={longtitude}
                    latitude={latitude}
                    setLongtitude={setLongtitude}
                    setLatitude={setLatitude} 
                />
                <div className='line'></div>
                <Filter
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

                {isLoading && (
                    <Spinner type='block'/>
                )}

                {!isLoading && restaurants.length === 0 && (
                    <div>No results</div>
                )}

                {!isLoading && restaurants.length !== 0 && (
                    <div className="restaurantContainer">
                        {restaurants.map((restaurant, index) => (
                            <Restaurant key={index} restaurant={restaurant}/>
                        ))}
                    </div>
                )}
            </div>
            <Nav />
        </>
    )
}
