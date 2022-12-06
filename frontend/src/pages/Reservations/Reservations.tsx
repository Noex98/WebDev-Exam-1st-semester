import React, { SetStateAction } from 'react'
import { Nav } from '../../components'
import { Reservation } from './components/Reservation'
import { apiService } from '../../service/apiService';
import { IReservation } from '../../types';


export const Reservations = () => {

    /*

    const deleteReservation = () => {
        apiService.deleteReservation().then(succes => {
            if (succes) {
                setReservation(null);
            }
        });
    }
    return (
        <>
            <div>Reservations</div>
            <Reservation reservation={reservation} />
            <Nav />
        </>
    )*/
    return <></>
}
