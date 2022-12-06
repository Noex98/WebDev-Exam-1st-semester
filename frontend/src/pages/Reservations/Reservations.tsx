import React, { SetStateAction, useEffect, useState } from 'react';
import { Nav, Spinner } from '../../components';
import { Reservation } from './components/Reservation';
import { apiService } from '../../service/apiService';
import { IReservation } from '../../types';


export const Reservations = () => {

    const [reservations, setReservations] = useState<IReservation[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getReservations().then(res => {
            if (res.succes) {
                setReservations(res.data);   
                console.log(res.data);
                             
            }
            setLoading(false);
        })
    }, [setReservations, setLoading])

    if(loading){
        return ( 
            <Spinner />
        )
    }

    if (!reservations) {
        return (
            <>
                <div>No reservations</div>
                <Nav />
            </>
        )
    }

    return (
        <>
            <div>Reservations</div>
            {reservations && reservations.map((reservation, index) => (
                <Reservation reservation={reservation} key={index} setReservations={setReservations}/>
            ))}
           
            <Nav />
        </>
    )
}
