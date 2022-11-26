import React from 'react'
import './style.scss'
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';

type Props = {
    open: boolean,
    closePopup: () => void,
    children?: React.ReactNode
}

/**
 * Wraps children in a popup component
 */

export const Popup = ({open, closePopup, children}: Props) => {
    return (
        <div className='components__popup'>
            <div onClick={closePopup} className={`overlay ${open ? "overlay--visible" : ""}`}></div>
            <div className={`content ${open ? "content--visible" : ""}`}>
                <Cross width="30px" onClick={() => closePopup()} className='closeBtn'/>    
                {children}
            </div>
        </div>
    )
}
