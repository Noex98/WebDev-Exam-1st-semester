import React, { SetStateAction, useEffect, useState } from 'react';
import { Nav, Spinner } from '../../components';
import { Reservation } from './components/Reservation';
import { apiService } from '../../service/apiService';
import { IReservation } from '../../types';
import './style.scss'

export const Reservations = () => {

    const [reservations, setReservations] = useState<IReservation[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getReservations()
            .then(res => setReservations(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [setReservations, setLoading])

    if (loading) {
        return (
            <>
                <Spinner />
                <Nav />
            </>
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
            <div className='pages__reservations'>
                <h2>Your Reservations</h2>
                {reservations && reservations.map((reservation, index) => (

                    <Reservation reservation={reservation} key={index} setReservations={setReservations} />

                ))}

                <Nav />
            </div>
        </>
    )
}
