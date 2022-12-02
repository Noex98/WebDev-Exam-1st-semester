import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction, useState } from 'react';
import { CtaButton, Nav, Popup } from '../../components';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow_right.svg'


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
    console.log(user);
    const deleteUserHandler = () => {
        apiService.deleteUser();
        setUser(null);
    }


    return (
        <>
            <div className='pages__profile'>
                <h3>Profile</h3>
                <div className="setting">
                    <div className="right">
                        <h4>Name:</h4>
                    </div>
                    <div className="left">
                        <p>{user.name}</p>
                        <ArrowRight/>
                    </div>
                </div>
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
