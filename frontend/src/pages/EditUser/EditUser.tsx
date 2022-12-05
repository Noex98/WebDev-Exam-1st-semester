import './style.scss'
import React from 'react'
import { IUser } from '../../types';
import { SetStateAction, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Nav, TextInput, CtaButton } from '../../components';
import { apiService } from '../../service/apiService';
import { ReactComponent as ArrowSvg } from '../../assets/icons/arrow_left.svg'


type Props = {
  user: IUser,
  setUser: React.Dispatch<SetStateAction<IUser | null>>
}

export const EditUser = ({ user, setUser }: Props) => {
  const location = useLocation();
  const key = location.state;
  const [newValue, setNewValue] = useState<string | number>("")

  let placeholder = ""
  let label = ""
  switch (key) {
    case "name":
      placeholder = user.name
      label = "Name"
      break;
    case "email":
      placeholder = user.email
      label = "Email"
      break;
    case "phoneNumber":
      placeholder = "" + user.phoneNumber
      label = "Phone Number"
      break;
      default:
    return <></>
  }

  const setNewUserData = () => {
    apiService.editUser(key, newValue).then(res => {
      if (res.succes) {
        setUser(prev => {
          return user ? {...prev, [key]: newValue} : null
        })
      }
    })
    
  }



  return (
    <div>
      <div className='pages__editUser'>
        <div className='editUser__header'>
          <Link to="/profile">
          <ArrowSvg />
          </Link>
          <h2>Profile</h2>
        </div>
        <h3>{label}</h3>
        <TextInput onChange={(e: React.FormEvent<HTMLInputElement>) => {setNewValue(e.currentTarget.value)}} placeholder={placeholder}></TextInput>
        <CtaButton onClick={setNewUserData} color="positive">Save Changes</CtaButton>
      </div>
      <Nav />
    </div>
  )
}