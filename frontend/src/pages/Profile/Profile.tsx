import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction, useState } from 'react';
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


    return (
        <>
            <div className='pages__profile'>
                <div className="settings">
                    <h2>Profile</h2>
                    <Setting label='Name' value={user.name} key='name' />
                    <Setting label='Email' value={user.email} key="email" />
                    <Setting label='Name' value={user.phoneNumber} key="phoneNumber"/>
                    <Setting label='Delete account' value="" key="" />
                    <Setting label='Reset Password' value="" key=""/>
                    <Setting label='Notifications' value="" key=""/>
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
