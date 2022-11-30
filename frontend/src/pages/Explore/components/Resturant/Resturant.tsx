import React from 'react'
import { Link } from 'react-router-dom';
import { IRestaurant } from '../../../../types';
import './style.scss';

type Props = {
    restaurant: IRestaurant
}

export const Restaurant = ({restaurant}: Props) => {

    const { 
        id, 
        name,
        closeTime,
        description,
        distance,
        email,
        image,
        openTime,
        phoneNumber,
        price
    } = restaurant

    const getPriceTag = () => {
        const dollarSigns = []
        for (let i = 0; i < 4; i++){
            if(i + 1 < price ){
                dollarSigns.push(
                    <b>$</b>
                )
            } else {
                dollarSigns.push(
                    <span className='smallDollarSign'>$</span>
                )
            }
        }
        return dollarSigns;
    }

    return (
        <Link 
            to={'/restaurant/' + id} 
            className='components__Restaurant' style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%), url(${image})`,                        
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div>
                <div>{name}</div>
                <div className='split'>
                    <span>
                        {Math.round(distance) + ' km'}
                    </span> 
                    <div>
                        {getPriceTag()}
                    </div>
                </div>
            </div>
        </Link>
    )
}