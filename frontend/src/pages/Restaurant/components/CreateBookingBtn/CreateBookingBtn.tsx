import React, { useState } from 'react'
import { CtaButton, Popup } from '../../../../components'
import { ReactComponent as PeopleSvg } from '../../../../assets/icons/people.svg'
import { ReactComponent as CalenderSvg} from '../../../../assets/icons/calender.svg'
import { ReactComponent as TextBoxSvg } from '../../../../assets/icons/textBox.svg'
import './style.scss'

export const CreateBookingBtn = () => {

    const [popupOpen, setPopupOpen] = useState(false);

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
                            <div>Time & date</div>
                            <input 
                                type="datetime-local" 
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
                    <CtaButton color='positive'>Confirm</CtaButton>
                </div>
            </Popup>
        </div>
    )
}
