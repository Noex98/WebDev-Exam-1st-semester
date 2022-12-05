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
}

export const CreateBookingBtn = ({restaurantId}: Props) => {
    
    const d = new Date();
    const [popupOpen, setPopupOpen] = useState(false);
    const [peopleNum, setPeopleNum] = useState(1);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [comment, setComment] = useState("");

    const submitHandler = () => {
        apiService.createReservation(
            restaurantId,
            date,
            time,
            comment,
            peopleNum
        )
    }

    return (
        <div className='components__createBookingBtn'>
            <CtaButton onClick={() => setPopupOpen(true)} color="positive">Make reservation</CtaButton>
            <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                <div className='popupContent'>
                    <div className='formItem'>
                        <PeopleSvg />
                        <label>
                            <div>Number of people</div>
                            <input type="number" />
                        </label>
                    </div>
                    <div className='formItem'>
                        <CalenderSvg />
                        <label>
                            <div>Date</div>
                            <input 
                                type="date" 
                            />
                        </label>
                    </div>
                    <div className='formItem'>
                        <ClockSvg />
                        <label>
                            <div>Time</div>
                            <input 
                                type="time"
                            />
                        </label>
                    </div>
                    <div className='formItem'>
                        <TextBoxSvg />
                        <label>
                            <div>Comment</div>
                            <input type="text" />
                        </label>
                    </div>
                    <CtaButton onClick={submitHandler} color='positive'>Confirm</CtaButton>
                </div>
            </Popup>
        </div>
    )
}
