import './style.scss'
import React, { useEffect } from 'react'
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
    const navigate = useNavigate();
    const key = location.state;
    const [value, setValue] = useState<string | number>("");
    const [label, setLabel] = useState("");
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("")

    useEffect(() => {
        switch (key) {
            case "name":
                setValue(user.name)
                setLabel('Name')
                break;
            case "email":
                setValue(user.email)
                setLabel('Email')
                break;
            case "phoneNumber":
                setValue(user.phoneNumber)
                setLabel('Phone Number')
                break;
        }
    }, [key, user])

    const setNewUserData = () => {
        setLoading(true)
        apiService.editUser(key, value)
            .then(() => {
                setUser(prev => prev ? {...prev, [key]: value} : null)
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
                <TextInput onChange={e => setValue(e.currentTarget.value)} defaultValue={value} placeholder={""+value}></TextInput>
                <p>{errMessage}</p>
                <CtaButton onClick={setNewUserData} color="positive">Save Changes</CtaButton>
            </div>
            <Nav />
        </div>
    )
}