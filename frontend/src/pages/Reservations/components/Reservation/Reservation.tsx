import React from 'react'
import { CtaButton } from '../../../../components'
import { ReactComponent as People } from '../../../../assets/icons/people.svg'
import { ReactComponent as Time } from '../../../../assets/icons/clock.svg'
import { ReactComponent as Calender } from '../../../../assets/icons/calender.svg'
import { ReactComponent as Accepted } from '../../../../assets/icons/checkmark.svg'
import { ReactComponent as Cancelled } from '../../../../assets/icons/cross.svg'
import './style.scss'



type Props = {
    restaurantName: string,
    status: "pending" | "accepted" | "declined",
    peopleNum: number,
    time: string,
    date: string
}
export const Reservation = ({ restaurantName, status, peopleNum, time, date }: Props) => {
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
            <CtaButton color='negative'>Cancel</CtaButton>
        </div>
    </div >
  )
}
