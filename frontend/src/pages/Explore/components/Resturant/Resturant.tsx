import React from 'react'
import { IResturant } from '../../../../types';
import './style.scss';

type Props = {
    resturant: IResturant
}

export const Resturant = ({resturant}: Props) => {

    const { 
        id, 
        name,
        closeTime,
        description,
        distance,
        email,
        image,
        openTime,
        phoneNumber
    } = resturant

    return (
        <div className='components__Resturant' style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%),linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 79.69%), url(${image})`,                        
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div>
                <div>{name}</div>
                <div>{Math.round(distance) + ' km'}</div>
            </div>
        </div>
    )
}