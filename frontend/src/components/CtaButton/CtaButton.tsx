import { type } from '@testing-library/user-event/dist/type'
import './CtaButton.scss'
import React from 'react'

type Props = {
    text: string,
    type: "positive" | "negative" | "neutral",
    onclick: () => void
}

const CtaButton = ({ text, type, onclick }: Props) => {
    return (
        <span className='components__CtaButton'>
            <button className={type} onClick={onclick}>{text}</button>
        </span>
    )
}

export default CtaButton
