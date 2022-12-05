import React from 'react'
import { Nav } from '../../components'
import { Reservation } from './components/Reservation'
export const Reservations = () => {
    return (
        <>
            <div>Reservations</div>
            <Reservation restaurantName={"McDonalds"} date="24-05-1999" time="17:30" 
            peopleNum={5} status="accepted" />
            <Nav />
        </>
    )
}
