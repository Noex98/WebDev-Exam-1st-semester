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
  const thisSetting = location.state;
  const [newValue, setNewValue] = useState<string | number>("")
  const [key, setKey] = useState<string>(thisSetting)


  useEffect(() => {
    setKey(thisSetting)
  }, [thisSetting])

  const setNewUserData = () => {
    apiService.editUser(key, newValue)
  }
  let placeholder = ""
  switch (thisSetting) {
    case "name":
      placeholder = user.name
      break;
    case "email":
      placeholder = user.email
      break;
    case "phoneNumber":
      placeholder = "" + user.phoneNumber
      break;
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
        <h3>{thisSetting}</h3>
        <TextInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setNewValue (e.target.value)}} placeholder={placeholder}></TextInput>
        <CtaButton onClick={setNewUserData} color="positive">Save Changes</CtaButton>
      </div>
      <Nav />
    </div>
  )
}