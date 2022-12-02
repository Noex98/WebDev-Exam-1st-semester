import './style.scss';
import React from 'react'
import { ReactComponent as ArrowRight } from '../../../../assets/icons/arrow_right.svg';
import { Link } from 'react-router-dom';



interface Props {
    key: 'name' | 'email' | 'phoneNumber' | "",
    label: string,
    value: string | number,
}

export const Setting = ({ label, value, key }: Props) => {
    return (
        <Link to="/editUser" state={key}>
        <div className="setting">
            <div className="left">
                <h4>{label}</h4>
                {key}
            </div>
            <div className="right">
                <p>{value}</p>
                <ArrowRight />
            </div>
        </div>
        </Link>
    )
}
