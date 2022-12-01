import React, { SetStateAction, useEffect, useState } from 'react'
import { apiService } from '../../service/apiService'
import { IRestaurant } from '../../types'

type Props = {
    restaurant: IRestaurant[],
    setRestaurant: React.Dispatch<SetStateAction<IRestaurant[] | null>>
}

export const Categories = ({ restaurant, setRestaurant }: Props) => {
    const [restaurant, setRestaurant] = useState<IRestaurant[] | null>(null)
    useEffect(() => {
        apiService.getRestaurant(restaurant).then(res => {
            if (res.succes) {
                setRestaurant(res.data)
            }
        })
    }, [restaurant])

export const Restaurant = () => {
    return (
        <div>Restaurant</div>
    )
}
