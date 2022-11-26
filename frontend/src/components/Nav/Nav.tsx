import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Reservations } from '../../assets/icons/reservations.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

export const Nav = () => {
    return (
        <nav className='components__nav'>
            <Link to="/profile">
                <Profile height="36px" width="36px" />
            </Link>
            <Link to="/">
                <Logo height="50px" stroke="rgb(7, 22, 63)" fill='rgb(7, 22, 63)'/>
            </Link>
            <Link to="/reservations">
                <Reservations height="36px" width="36px" />
            </Link>
        </nav>
    )
}
