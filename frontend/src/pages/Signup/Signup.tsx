import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { apiService } from '../../service/apiService';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye_open.svg';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye_closed.svg';
import { CtaButton, TextInput } from '../../components';
import './style.scss';

export const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [data, setData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        passwordRepeat: ""
    });

    useEffect(() => {
        if(
            data.name.length > 0 &&
            data.phoneNumber.length > 0 &&
            data.email.length > 0 &&
            data.password.length > 0 &&
            data.passwordRepeat.length > 0
        ) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [data])



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
                <label>
                    <div>Name:</div>
                    <TextInput  required value={data.name} onChange={e => setData(prev => {return {...prev, name: e.target.value}})} />
                </label>
                <label>
                    <div>Phone Number:</div>
                    <TextInput required type='tel' value={data.phoneNumber} onChange={e => setData(prev => {return {...prev, phoneNumber: e.target.value}})} />
                </label>
                <label>
                    <div>Email:</div>
                    <TextInput required type='email' value={data.email} onChange={e => setData(prev => {return {...prev, email: e.target.value}})} />
                </label>
                <label>
                    <div>Password:</div>
                    <TextInput 
                        required
                        value={data.password} 
                        type={showPassword ? "text" : "password"} 
                        onChange={e => setData(prev => {return {...prev, password: e.target.value}})}
                        >
                        {showPassword && <EyeClosed onClick={() => setShowPassword(prev => !prev)}/>}
                        {!showPassword && <EyeOpen onClick={() => setShowPassword(prev => !prev)}/>}
                    </TextInput>
                </label>
                <label>
                    <div>Repeat password:</div>
                    <TextInput 
                        required
                        value={data.passwordRepeat} 
                        type={showPasswordRepeat ? "text" : "password"} 
                        onChange={e => setData(prev => {return {...prev, passwordRepeat: e.target.value}})} 
                    >
                        {showPasswordRepeat && <EyeClosed onClick={() => setShowPasswordRepeat(prev => !prev)}/>}
                        {!showPasswordRepeat && <EyeOpen onClick={() => setShowPasswordRepeat(prev => !prev)}/>}
                    </TextInput>
                </label>
                <span className='btnContainer'>
                    <CtaButton disabled={btnDisabled} type='submit' color='positive'>
                        Register
                    </CtaButton>
                </span>
                {error}
            </form>
            <div className='registerText'>
                <Link to="/login">
                    Already have an account? <strong>Sign in here</strong>
                </Link>
            </div>
            
        </div>
    )
}
