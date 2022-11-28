import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as Reservations } from '../../assets/icons/reservations.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';


export const Nav = () => {
    let activeClassName = "underline";

    return (
        <nav className='components__nav'>
            <NavLink to="/profile"
                className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                }
            >
                <Profile height="36px" width="36px" />
            </NavLink>
            <NavLink to="/" end
                className={({ isActive }) =>
                isActive ? activeClassName : undefined
            }>
                <Logo height="50px" width="50px" stroke="rgb(7, 22, 63)" fill='rgb(7, 22, 63)' />
            </NavLink>
            <NavLink to="/reservations"
                 className={({ isActive }) =>
                 isActive ? activeClassName : undefined
             }>
                <Reservations height="36px" width="36px" />
            </NavLink>

        </nav>
    )
}
