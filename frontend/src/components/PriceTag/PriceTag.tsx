import React from 'react'
import './style.scss';

type Props = {
    priceScore: number
}

export const PriceTag = ({priceScore}: Props) => {

    const dollarSigns = []
    for (let i = 0; i < 4; i++){
        if(i + 1 < priceScore ){
            dollarSigns.push(
                <b key={i}>$</b>
            )
        } else {
            dollarSigns.push(
                <span key={i}>$</span>
            )
        }
    }
    return (
        <div className='components__priceTag'>
            {dollarSigns}
        </div>
    )
}
