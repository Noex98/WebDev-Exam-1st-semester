import React from 'react'
import './style.scss'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">{
    type?: "text" | "email" |"tel" | "password"
    children?: React.ReactNode

}

/**
 * Can be used for these input types
 * * Text
 * * Email
 * * Tel
 * * Password
 * 
 * Default type is "text"
 */

export const TextInput = React.forwardRef(({type = "text", children, ...rest }: Props, ref) => {
    return (
        <div className='components__TextInput'>
            <input  type={type} {...rest}  />
            <div>
                {children}
            </div>
        </div>
    )
})
