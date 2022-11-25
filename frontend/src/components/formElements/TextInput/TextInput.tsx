import React from 'react'
import './style.scss'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">{
    type?: "text" | "email" |"tel" | "password"
    children?: React.ReactNode
}

export const TextInput = ({type = "text", children, ...rest }: Props) => {
    return (
        <div className='components__TextInput'>
            <input type={type} {...rest}  />
            <div>
                {children}
            </div>
        </div>
    )
}
