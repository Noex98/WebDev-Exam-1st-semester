import React, { useEffect, useState } from 'react'
import { Nav, Spinner } from '../../components'
import { apiService } from '../../service/apiService';
import { IRestaurant } from '../../types';
import { accesLocalStorage } from '../../utils';
import { Location, Filter, Restaurant } from './components'
import { Categories } from './components/Categories';
import { useGeolocated } from 'react-geolocated';
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import './style.scss';

export const Explore = () => {

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [isLoading, setIsloading] = useState(true);

    //Filters
    const [longtitude, setLongtitude] = useState<number | null>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [searchString, setSearchString] = useState<string>("");
    const [sortBy, setSortBy] = useState<"distance" | "price">("distance");
    const [maxDistance, setMaxDistance] = useState<number>(accesLocalStorage('maxDistance') ? accesLocalStorage('maxDistance') : 100);
    const [selectedCategories, setSelctedCategories] = useState<number[]>([]);
    //Geolocation
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    useEffect(() => {
        if (latitude && longtitude) {
            setIsloading(true);
            apiService.getRestaurantList(
                latitude,
                longtitude,
                maxDistance,
                selectedCategories,
                searchString,
                sortBy
            )
                .then(res => setRestaurants(res))
                .catch(err => console.log(err))
                .finally(() => setIsloading(false))
        }
    }, [longtitude, latitude, searchString, sortBy, maxDistance, selectedCategories])

    return !isGeolocationAvailable ? (
        <>
        <div>Your browser does not support Geolocation</div>
        <Nav />
        </>
    ) : !isGeolocationEnabled ? (
        <>
        <div>Can't acces your location, please allow location sharing on your device!</div>
        <Nav />
        </>
    ) : (
        <>
            <div className="pages__explore">
                <Location
                    longtitude={longtitude}
                    latitude={latitude}
                    setLongtitude={setLongtitude}
                    setLatitude={setLatitude}
                    coords={coords}
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
                    <Spinner type='block' />
                )}

                {!isLoading && restaurants.length === 0 && (
                    <div className='no-results'>
                        <Search />
                        <h2>No results</h2>
                        <div>
                            <p>Sorry we could not find a matching restaurant, please
                                <span style={{
                                    fontWeight: '650',
                                }}> change search criteria </span> and
                                try again!
                            </p>
                        </div>
                    </div>
                )}

                {
                    !isLoading && restaurants.length !== 0 && (
                        <div className="restaurantContainer">
                            {restaurants.map((restaurant, index) => (
                                <Restaurant key={index} restaurant={restaurant} />
                            ))}
                        </div>
                    )
                }
            </div >
            <Nav />
        </>
    )
}
