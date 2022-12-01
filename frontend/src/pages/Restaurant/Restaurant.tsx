import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CtaButton, Nav, Spinner } from '../../components'
import { apiService } from '../../service/apiService';
import { IRestaurant } from '../../types';



export const Restaurant = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
    const [name, setName] = useState("name");

    useEffect(() => {
        if (id) {
            apiService.getRestaurant(
                parseInt(id)
            ).then(res => {
                if (res.succes) {
                    setRestaurant(res.data);
                }
            })
        }
    }, [])
    if (restaurant === null) {
        return (
            <Spinner />
        )
    }
    return (
        <div className='pages__Restaurant'>
            <h2>{restaurant.name}</h2>
            <h3>Description</h3>
            <p>{restaurant.description}</p>
            <img src={restaurant.image}></img>
            <CtaButton />
            <Nav />
        </div>
    )
}