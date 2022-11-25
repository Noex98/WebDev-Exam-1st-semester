import './CtaButton.scss'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "positive" | "negative" | "neutral",
    children?: JSX.Element
}

const CtaButton = ({ color = 'neutral' ,children, ...rest}: Props) => {
    return (
        <div className='components__CtaButton'>
            <button className={color} {...rest}>{children}</button>
        </div>
    )
}

export default CtaButton
