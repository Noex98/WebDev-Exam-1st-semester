import './CtaButton.scss'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "positive" | "negative" | "neutral",
    children?: JSX.Element
}

export const CtaButton = ({ color = 'neutral' ,children, ...rest}: Props) => {
    return (
        <div className='components__CtaButton'>
            <button {...rest} className={color + ' ' + rest.className}>{children}</button>
        </div>
    )
}
