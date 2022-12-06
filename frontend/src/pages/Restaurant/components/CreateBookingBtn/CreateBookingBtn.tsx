import React, { useState, useRef } from 'react'
import { CtaButton, Popup } from '../../../../components'
import { ReactComponent as PeopleSvg } from '../../../../assets/icons/people.svg'
import { ReactComponent as CalenderSvg} from '../../../../assets/icons/calender.svg'
import { ReactComponent as ClockSvg} from '../../../../assets/icons/clock.svg'
import { ReactComponent as TextBoxSvg } from '../../../../assets/icons/textBox.svg'
import './style.scss'
import { apiService } from '../../../../service/apiService'

type Props = {
    restaurantId: number
    restaurantName: string
}

export const CreateBookingBtn = ({restaurantId, restaurantName}: Props) => {
    
    const d = new Date();
    const [popupOpen, setPopupOpen] = useState(false);
    const [peopleNum, setPeopleNum] = useState(1);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [comment, setComment] = useState("");

    const [popupPage, setPopupPage] = useState(1);

    const closePopupHandler = () => {
        setPopupOpen(false);
        setTimeout(() => {
            setPopupPage(1)
        }, 250)
    }

    const nextPageHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setPopupPage(2);
    }

    console.log({
        peopleNum: peopleNum,
        date: date,
        time: time,
        comment: comment
    });
    

    const submitHandler = () => {
        apiService.createReservation(
            restaurantId,
            peopleNum,
            date,
            time,
            comment
        )
    }

    return (
        <div className='components__createBookingBtn'>
            <CtaButton onClick={() => setPopupOpen(true)} color="positive">Make reservation</CtaButton>
            <Popup open={popupOpen} closePopup={closePopupHandler}>
                {popupPage === 1 && (
                    <form className='popupForm'>
                        <div className='formItem'>
                            <PeopleSvg />
                            <label>
                                <div>Number of people</div>
                                <input onChange={e => setPeopleNum(parseInt(e.target.value))} type="number" />
                            </label>
                        </div>
                        <div className='formItem'>
                            <CalenderSvg />
                            <label>
                                <div>Date</div>
                                <input 
                                    type="date" 
                                    onChange={e => setDate(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className='formItem'>
                            <ClockSvg width='25px' height='25px' />
                            <label>
                                <div>Time</div>
                                <input 
                                    type="time"
                                    onChange={e => setTime(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className='formItem'>
                            <TextBoxSvg />
                            <label>
                                <div>Comment</div>
                                <input onChange={e => setComment(e.target.value)} type="text" />
                            </label>
                        </div>
                        <CtaButton onClick={e => nextPageHandler(e)} color='positive'>Confirm</CtaButton>
                    </form>
                )}
                {popupPage === 2 && (
                    <div className='popupConfirm'>
                        <p>
                            Are you sure you want to send a reservation to {restaurantName}? <br />
                            <br />
                            The restaurant will need to confirm the reservation.
                            <br /><br />
                        </p>
                        <CtaButton onClick={submitHandler} color='positive'>Confirm reservation</CtaButton>
                    </div>
                )}
            </Popup>
        </div>
    )
}
