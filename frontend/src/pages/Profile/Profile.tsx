import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction, useState, useEffect } from 'react';
import { CtaButton, Nav } from '../../components';
import { Setting } from './components/Setting';
import { Link } from "react-router-dom"



type Props = {
    user: IUser,
    setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const Profile = ({ user, setUser }: Props) => {

    const [popupOpen, setPopupOpen] = useState(false);

    const logoutHandler = () => {
        apiService.logout();
        setUser(null);
    }

    const deleteUserHandler = () => {
        apiService.deleteUser();
        setUser(null);
    }

    useEffect(() => {
        console.log(user);
        
    }, [])
    
    return (
        <>
            <div className='pages__profile'>
                <div className="settings">
                    <h2>Profile</h2>
                    <Link to="/editUser" state="name">
                        <Setting label='name' value={user.name} />
                    </Link>
                    <Link to="/editUser" state="email">
                        <Setting label='email' value={user.email}  />
                    </Link>
                    <Link to="/editUser" state="phoneNumber">
                        <Setting label='Phone Number' value={user.phoneNumber} />
                    </Link>
                    <Setting label='Delete account' value="" />
                    <Setting label='Reset Password' value="" />
                    <Setting label='Notifications' value="" />
                </div>
                <div>
                    <CtaButton color='negative' onClick={logoutHandler}>Log out</CtaButton>
                    <CtaButton onClick={() => setPopupOpen(true)}>Open popup</CtaButton>
                </div>
            </div>
            <Nav />

        </>
    )
}
