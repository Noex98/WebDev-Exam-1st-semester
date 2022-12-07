import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Nav, PriceTag, Spinner } from '../../components';
import { apiService } from '../../service/apiService';
import { IRestaurantFull } from '../../types';
import { ReactComponent as ClockSvg } from '../../assets/icons/clock.svg'
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow_left.svg'
import { CreateBookingBtn } from './components';
import './style.scss'

export const Restaurant = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [restaurant, setRestaurant] = useState<IRestaurantFull | null>(null);

    useEffect(() => {
        if (id) {
            apiService.getRestaurant(id).then(res => {
                if (res.succes) {
                    setRestaurant(res.data)
                }
                setLoading(false)
            })
        }
    }, [id, setRestaurant, setLoading])

    if (loading) {
        return (
            <>
                <Spinner />
                <Nav />
            </>
        );
    }

    if (!restaurant) {
        return (
            <>
                <div>No results</div>
                <Nav />
            </>
        )
    }

    return (
        <>
            <div className='pages__restaurant'>
                <div className='titleContainer'>
                    <ArrowSvg onClick={() => navigate('/explore')} />
                    <h2>{restaurant.name}</h2>
                    <ArrowSvg opacity='0' />
                </div>
                <div className='textContainer'>
                    <h3>Description</h3>
                    <p className='desc'>{restaurant.description}</p>
                    <br />
                    <p>{restaurant.address}</p>
                </div>
                <div className='infoContainer'>
                    <div className='timeContainer'>
                        <ClockSvg /> {restaurant.openTime.slice(0, -3)} - {restaurant.closeTime.slice(0, -3)}
                    </div>
                    <PriceTag priceScore={restaurant.price} />
                </div>
                <img width='100%' src={restaurant.image} alt="" />
                <div className='buttonContainer'>
                    <CreateBookingBtn 
                        restaurantId={restaurant.id}
                        restaurantName={restaurant.name}
                    />
                </div>

                {restaurant.menuItems.map((menuItem, index) => (
                    <div className='menuItems' key={index}>
                        <div className='wrapper'>
                            <h3>{menuItem.title}</h3>
                            <h3>{menuItem.price}kr</h3>
                        </div>
                        <p>{menuItem.description}</p>
                    </div>
                ))}

            </div>

            <Nav />
        </>
    )
}