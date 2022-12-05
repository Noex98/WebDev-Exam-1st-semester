import React, { SetStateAction } from 'react'
import { Nav } from '../../components'
import { Reservation } from './components/Reservation'
import { apiService } from '../../service/apiService';
import { IReservation } from '../../types';

type Props = {
    reservation: IReservation,
    setReservation: React.Dispatch<SetStateAction<IReservation | null>>
}

export const Reservations = ({ reservation, setReservation }: Props) => {

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
            <Reservation restaurantName={"McDonalds"} date="24-05-1999" time="17:30" 
            peopleNum={5} status="accepted" />
            <Nav />
        </>
    )
}
