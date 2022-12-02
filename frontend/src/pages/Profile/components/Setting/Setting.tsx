import './style.scss';
import React from 'react'
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow_right.svg';


interface Props {
    label: string,
    value: string | number
}

export const Setting = ({ label, value }: Props) => {
    return (
        <div className="setting">
            <div className="left">
                <h4>{label}</h4>
            </div>
            <div className="right">
                <p>{value}</p>
                <ArrowRight />
            </div>
        </div>
    )
}
