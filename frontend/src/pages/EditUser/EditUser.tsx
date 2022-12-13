import './style.scss'
import React from 'react'
import { IUser } from '../../types';
import { SetStateAction, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, TextInput, CtaButton, Spinner } from '../../components';
import { apiService } from '../../service/apiService';
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow_left.svg'


type Props = {
  user: IUser,
  setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const EditUser = ({ user, setUser }: Props) => {
    const location = useLocation();
    const key = location.state;
    const [newValue, setNewValue] = useState<string | number>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState("")

    let currentValue = ""
    let label = ""
    switch (key) {
        case "name":
            currentValue = user.name
            label = "Name"
            break;
        case "email":
            currentValue = user.email
            label = "Email"
            break;
        case "phoneNumber":
            currentValue = "" + user.phoneNumber
            label = "Phone Number"
            break;
        default:
            return <></>
    }

    const setNewUserData = () => {
        setLoading(true)
        apiService.editUser(key, newValue)
            .then(() => {
                setUser(prev => prev ? {...prev, [key]: newValue} : null)
                navigate('/profile')
            })
            .catch(err => setErrMessage(err))
            .finally(() => setLoading(false))
    }

    return (
        loading ? <div><Spinner /> <Nav /></div> :
        <div>
            <div className='pages__editUser'>
                <div className='editUser__header'>
                    <Link to="/profile">
                    <ArrowSvg />
                    </Link>
                    <h2>Profile</h2>
                </div>
                <h3>{label}</h3>
                <TextInput onChange={(e: React.FormEvent<HTMLInputElement>) => {setNewValue(e.currentTarget.value)}} defaultValue={currentValue} placeholder={currentValue}></TextInput>
                <p>{errMessage}</p>
                <CtaButton onClick={setNewUserData} color="positive">Save Changes</CtaButton>
            </div>
            <Nav />
        </div>
    )
}