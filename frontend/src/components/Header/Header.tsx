import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { apiModel } from '../../models/apiModel';
import { userContext } from '../UserContextProvider';
import './style.css';

export const Header = () => {

    const user = useContext(userContext);
    const loggedIn = !!user?.data;

    function logOutHandler(){
        apiModel.logout();
        
        if (user?.set){
            user.set(null);
        }
    }

    return (
        <header>
            <div>
                <h1 className='header-h1'>Dating App</h1>
                <nav>
                    {loggedIn && (
                        <ul>
                            <li>
                                <Link to={'/profile'}>Profile</Link>
                            </li>
                            <li>
                                <Link to={'/matchlist'}>Matches</Link>
                            </li>
                        </ul>
                    )}
                    {!loggedIn && (
                        <ul>
                            <li>
                                <Link to={'/login'}>Login</Link>
                            </li>
                            <li>
                                <Link to={'/signup'}>Signup</Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
            {loggedIn && (
                <button onClick={logOutHandler} className='header__logoutBtn'>Log out</button>
            )}
        </header>
    )
}
