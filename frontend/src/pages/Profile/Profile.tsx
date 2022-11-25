import './style.scss';
import { IUser } from '../../types';
import { apiService } from '../../service/apiService';
import { SetStateAction } from 'react';


type Props = {
    user: IUser,
    setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const Profile = ({user, setUser}: Props) => {

    const logoutHandler = () => {
        apiService.logout();
        setUser(null);
    }

    return (
        <>
        <h3>Profile</h3>
        <button onClick={logoutHandler}>Log out</button>
        </>
    )
}
