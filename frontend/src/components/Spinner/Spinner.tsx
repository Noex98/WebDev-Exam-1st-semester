import React from 'react'
import './style.scss';

type Props = {
    type?: "overlay" | "block"
}

export const Spinner = ({type = 'overlay'}: Props) => {
  return (
    <div className={`components__spinner components__spinner--${type}`}>
        <div></div>
    </div>
  )
}
