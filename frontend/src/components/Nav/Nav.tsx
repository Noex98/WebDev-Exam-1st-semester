import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Reservations } from '../../assets/icons/reservations.svg';
import { Logo } from '../../components';

export const Nav = () => {
    return (
        <nav className='components__nav'>
            <Link to="/profile">
                <Profile />
            </Link>
            <Link to="/">
                <Logo color="dark"/>
            </Link>
            <Link to="/reservations">
                <Reservations />
            </Link>
        </nav>
    )
}
