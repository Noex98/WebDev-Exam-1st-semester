import React from 'react'
import { IResturant } from '../../../../types';

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
        <div className='components__Resturant'>
            {name}
        </div>
    )
}