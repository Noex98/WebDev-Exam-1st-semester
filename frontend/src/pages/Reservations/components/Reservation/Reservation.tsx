import React, { SetStateAction } from 'react'
import { CtaButton } from '../../../../components'
import { ReactComponent as People } from '../../../../assets/icons/people.svg'
import { ReactComponent as Time } from '../../../../assets/icons/clock.svg'
import { ReactComponent as Calender } from '../../../../assets/icons/calender.svg'
import { ReactComponent as Accepted } from '../../../../assets/icons/checkmark.svg'
import { ReactComponent as Cancelled } from '../../../../assets/icons/cross.svg'
import { IReservation } from '../../../../types';

import './style.scss'
import { apiService } from '../../../../service/apiService'



type Props = {
    reservation: IReservation,
    setReservation: React.Dispatch<SetStateAction<IReservation | null>>

}
export const Reservation = ({ reservation, setReservation }: Props) => {
    const { 
        id, 
        restaurantName,
        peopleNum,
        time,
        date,
        image,
        status
    } = reservation
    
    const deleteReservation = () => {
        apiService.deleteReservation().then(succes => {
            if (succes) {
                setReservation(null);
            }
        });
    }

    return (
    <div className='components__reservation'>
        <div className='reservation__header'>
            <div className="header__info">
               <h3>{restaurantName}</h3> 
               <div className='flex-row'>
                    <People/> 
                    {peopleNum}
                    <Time />
                    {time}
                </div>    
                <div>
                    <Calender/>
                    {date}
                </div>
            </div>
            <div className="header__status">
                {status === "accepted" ? <Accepted/> : status === "declined" ? <Cancelled /> : status === "pending"}
                <h3>{status}</h3>
            </div>
        </div>
        <div className="reservation__img">
            <img src={image} alt="image of restaurant" />
            <CtaButton color='negative'>Cancel</CtaButton>
        </div>
    </div >
  )
}
