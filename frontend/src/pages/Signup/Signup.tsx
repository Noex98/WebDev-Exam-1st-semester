import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiService } from '../../service/apiService';
import './style.scss';

export const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");


    function submitHandler(e: React.FormEvent) {
        e.preventDefault();

        if(password !== passwordRepeat){
            setError('Password dont match');
            return;
        }

        apiService.signup(name, phoneNumber, email, password)
            .then((res) => {
                if (res.succes === false) {
                    setError(res.errMessage);
                } else {
                    navigate('/login');
                }
            })
    }

    return (
        <div className='pages__Signup'>
            <h1>Register new user</h1>
            <form onSubmit={e => submitHandler(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <input type="text" onChange={e => setPhoneNumber(e.target.value)} />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="text" onChange={e => setPassword(e.target.value)} />
                </div>

                <div>
                    <label>Repeat password:</label>
                    <input type="text" onChange={e => setPasswordRepeat(e.target.value)} />
                </div>

                <input type="submit" value="Sign Up" className='button' />
            </form>
            {error}
        </div>
    )
}
