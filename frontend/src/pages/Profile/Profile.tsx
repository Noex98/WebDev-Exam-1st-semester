import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction, useState } from 'react';
import { CtaButton, Nav, Popup } from '../../components';
import { Setting } from './components/Setting';
import { Link } from "react-router-dom"



type Props = {
    user: IUser,
    setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const Profile = ({ user, setUser }: Props) => {

    const [popupOpen, setPopupOpen] = useState(false);

    const logoutHandler = () => {
        apiService.logout()
        setUser(null);

    }

    const deleteUser = () => {
        apiService.deleteUser().then(succes => {
            if (succes) {
                setUser(null);
            }
        });
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
                        <Setting label='Name' value={user.name} />
                    </Link>
                    <Link to="/editUser" state="email">
                        <Setting label='Email' value={user.email} />
                    </Link>
                    <Link to="/editUser" state="phoneNumber">
                        <Setting label='Phone Number' value={user.phoneNumber} />
                    </Link>
                    <div onClick={() => setPopupOpen(true)}>
                        <Setting label='Delete account' value="" />
                    </div>
                    <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                        <div className='popupContent'>
                            <p> Are you sure you want to delete your account? <br /><br />
                                Once this is done, it can't be undone again.</p>
                            <div className='flex'>
                                <CtaButton color='negative' onClick={() => deleteUser()}>Confirm</CtaButton>
                                <CtaButton color='neutral' onClick={() => setPopupOpen(false)}>Cancel</CtaButton>
                            </div>
                        </div>
                    </Popup>
                    <Setting label='Reset Password' value="" />
                    <Setting label='Notifications' value="" />
                </div>
                <div className='flex'>
                    <CtaButton color='negative' onClick={logoutHandler}>Log out</CtaButton>
                </div>
            </div>
            <Nav />

        </>
    )
}
