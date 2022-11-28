import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction, useState } from 'react';
import { CtaButton, Nav, Popup } from '../../components';


type Props = {
    user: IUser,
    setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const Profile = ({user, setUser}: Props) => {

    const [popupOpen, setPopupOpen] = useState(false);

    const logoutHandler = () => {
        apiService.logout();
        setUser(null);
    }

    return (
        <>
            <div>  
                <h3>Profile</h3>
                <CtaButton color='negative' onClick={logoutHandler}>Log out</CtaButton>
                <CtaButton onClick={() => setPopupOpen(true)}>Open popup</CtaButton>
            </div>
            <Nav />
            <Popup open={popupOpen} closePopup={() => setPopupOpen(false)}>
                Some content
            </Popup>
        </>
    )
}
