import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TextInput } from '../../components/formElements';
import { apiService } from '../../service/apiService';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye_open.svg'
import { ReactComponent as EyeClosed } from '../../assets/icons/eye_closed.svg'
import './style.scss';

export const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [data, setData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordRepeat: ""
    })



    function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        if(data.password !== data.passwordRepeat){
            setError('Password dont match');
            return;
        }

        apiService.signup(data.name, data.phoneNumber, data.email, data.password)
            .then((res) => {
                if (res.succes === false) {
                    setError(res.errMessage);
                } else {
                    navigate('/login');
                }
            })
    }

    return (
        <div className='pages__signup'>
            <h1>Register new user</h1>
            <form onSubmit={e => submitHandler(e)}>
                <div>
                    <label>Name:</label>
                    <TextInput  value={data.name} onChange={e => setData(prev => {return {...prev, name: e.target.value}})} />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <TextInput value={data.phoneNumber} onChange={e => setData(prev => {return {...prev, phoneNumber: e.target.value}})} />
                </div>

                <div>
                    <label>Email:</label>
                    <TextInput value={data.email} onChange={e => setData(prev => {return {...prev, email: e.target.value}})} />
                </div>

                <div>
                    <label>Password:</label>
                    <TextInput 
                        value={data.password} 
                        type={showPassword ? "text" : "password"} 
                        onChange={e => setData(prev => {return {...prev, password: e.target.value}})}
                    >
                        {showPassword && <EyeClosed onClick={() => setShowPassword(prev => !prev)}/>}
                        {!showPassword && <EyeOpen onClick={() => setShowPassword(prev => !prev)}/>}
                    </TextInput>
                </div>

                <div>
                    <label>Repeat password:</label>
                    <TextInput 
                        value={data.passwordRepeat} 
                        type={showPasswordRepeat ? "text" : "password"} 
                        onChange={e => setData(prev => {return {...prev, passwordRepeat: e.target.value}})} 
                    >
                        {showPasswordRepeat && <EyeClosed onClick={() => setShowPasswordRepeat(prev => !prev)}/>}
                        {!showPasswordRepeat && <EyeOpen onClick={() => setShowPasswordRepeat(prev => !prev)}/>}
                    </TextInput>
                </div>

                <input type="submit" value="Sign Up" className='button' />
            </form>
            {error}
        </div>
    )
}
