import React from 'react'
import { Link } from 'react-router-dom';
import { PriceTag } from '../../../../components';
import { IRestaurant } from '../../../../types';
import './style.scss';

type Props = {
    restaurant: IRestaurant
}

export const Restaurant = ({restaurant}: Props) => {

    const { 
        id, 
        name,
        distance,
        image,
        price
    } = restaurant

    return (
        <Link 
            to={'/restaurant/' + id} 
            className='components__Restaurant' style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 90.00%), url(${image})`,                        
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
                        <PriceTag priceScore={price} />
                    </div>
                </div>
            </div>
        </Link>
    )
}