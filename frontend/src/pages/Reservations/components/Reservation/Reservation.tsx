import React, { SetStateAction, useState } from 'react'
import { CtaButton, Popup, Spinner } from '../../../../components'
import { ReactComponent as People } from '../../../../assets/icons/people.svg'
import { ReactComponent as Time } from '../../../../assets/icons/clock.svg'
import { ReactComponent as Calender } from '../../../../assets/icons/calender.svg'
import { ReactComponent as Accepted } from '../../../../assets/icons/checkmark.svg'
import { ReactComponent as Cancelled } from '../../../../assets/icons/cross.svg'
import { IReservation } from '../../../../types';

import './style.scss'
import { apiService } from '../../../../service/apiService'
import { url } from 'inspector'



type Props = {
    reservation: IReservation,
    setReservations: React.Dispatch<SetStateAction<IReservation[] | null>>
}
export const Reservation = ({ reservation, setReservations }: Props) => {
    const {
        id,
        restaurantName,
        peopleNum,
        time,
        date,
        image,
        status
    } = reservation
    const [popupOpen, setPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const deleteReservation = () => {
        setLoading(true);
        apiService.deleteReservation(id)
            .then(() => {
                setReservations(prev => {
                    if(prev === null){
                        return null
                    }
                    const index = prev.indexOf(reservation)
                    const output = [...prev];
                    output.splice(index, 1)
                    return [...output];
                });
            })
            .catch(err => console.log(err))
            .finally(() => {
                setPopupOpen(false)
                setLoading(false)
            })
    }

    return (
        <div className='components__reservation'>
            <div className='reservation__header'>
                <div className="header__info">
                    <p className='title'>{restaurantName}</p>
                    <div className='flex-row'>
                        <div>
                            <People />
                            <p>{peopleNum}</p>
                        </div>
                        <div>
                            <Time />
                            <p>{time}</p>
                        </div>
                    </div>
                    <div className='align-self'>
                        <Calender />
                        <p>{date}</p>
                    </div>
                </div>
                <div className="header__status">

                    {status === "accepted" ? <Accepted /> : status === "declined" ? <Cancelled /> : status === "pending"}
                    <p>{status}</p>
                </div>
            </div>
            <div className="reservation__img" >
                <img src={image} alt="Resturant" />
                <CtaButton onClick={() => setPopupOpen(true)} color='negative'>Cancel</CtaButton>
            </div>
            <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                {loading && <Spinner />}
                {!loading && (
                    <div className='popupContent'>
                        <p> Are you sure you want to cancel your reservation? <br /><br />
                            Once this is done, it can't be undone again.</p>
                        <div className='flex'>
                            <CtaButton color='negative' onClick={() => deleteReservation()}>Confirm</CtaButton>
                            <CtaButton color='neutral' onClick={() => setPopupOpen(false)}>Cancel</CtaButton>
                        </div>
                    </div>
                )}
            </Popup>
        </div >
    )
}

