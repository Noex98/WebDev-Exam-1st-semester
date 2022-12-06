import React, { SetStateAction, useEffect, useState } from 'react';
import { Nav, Spinner } from '../../components';
import { Reservation } from './components/Reservation';
import { apiService } from '../../service/apiService';
import { IReservation } from '../../types';


export const Reservations = () => {

    const [reservations, setReservations] = useState<IReservation[] | null>(null);

    if(!reservations){
        return ( 
            <Spinner />
        )
    }

    return (
        <>
            <div>Reservations</div>
           
            <Nav />
        </>
    )
    return <></>
}
