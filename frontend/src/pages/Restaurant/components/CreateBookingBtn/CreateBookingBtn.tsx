import React, { useState } from 'react'
import { CtaButton, Popup } from '../../../../components'
import { ReactComponent as PeopleSvg } from '../../assets/icons/people.svg'
import { ReactComponent as CalenderSvg} from '../../assets/icons/calender.svg'
import { ReactComponent as TextBoxSvg } from '../../assets/icons/textBox.svg'

export const CreateBookingBtn = () => {

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <CtaButton onClick={() => setPopupOpen(true)} color="positive">Make reservation</CtaButton>
            <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                <div className='popupContent'>
                    <div>
                        <PeopleSvg />
                        <label>
                            <div>Number of people</div>
                            <input type="text" />
                        </label>
                    </div>
                    <div>
                        <CalenderSvg />
                        <label>
                            <div>Time & date</div>
                            <input type="datetime-local" />
                        </label>
                    </div>
                    <div>
                        <TextBoxSvg />
                        <label>
                            <div>Comment</div>
                            <input type="text" />
                        </label>
                    </div>
                </div>
                <CtaButton color='positive'>Confirm</CtaButton>
            </Popup>
        </>
    )
}
