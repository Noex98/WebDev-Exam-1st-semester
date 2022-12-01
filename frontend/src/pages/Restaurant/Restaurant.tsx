import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CtaButton, Nav, Popup, PriceTag, Spinner } from '../../components';
import { apiService } from '../../service/apiService';
import { IRestaurant } from '../../types';
import { ReactComponent as ClockSvg } from '../../assets/icons/clock.svg'
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow_left.svg'


import './style.scss'

export const Restaurant = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
    

    useEffect(() => {
        if(id){
            apiService.getRestaurant(id).then(res => {
                if(res.succes){
                    setRestaurant(res.data)
                }
                setLoading(false)
            })
        }
    }, [])

    if(loading){
        return (
            <>
                <Spinner />
                <Nav />
            </>
        );
    }

    if(!restaurant){
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
                    <ArrowSvg opacity='0'  />
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{restaurant.description}</p>
                </div>
                <div className='infoContainer'>
                    <div className='timeContainer'>
                        <ClockSvg /> {restaurant.openTime} - {restaurant.closeTime}
                    </div>
                    <PriceTag priceScore={restaurant.price}/>
                </div>
                <img width='100%' src={restaurant.image} alt="" />
                <div className='buttonContainer'>
                    
                </div>

                
                <div className='menuItems'>
                    {/* <p>{restaurant.menuItemDescription}</p> */}
                </div>
            </div>
            
            <Nav />
        </>
    )
}