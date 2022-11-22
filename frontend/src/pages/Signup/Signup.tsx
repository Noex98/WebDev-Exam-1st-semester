import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { apiService } from '../../service/apiService';
import './style.css'

export const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState<"male" | "female">("male");
    const [birthday, setBirthday] = useState("");



    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "male" || value === "female") {
            setGender(value);
        }
    };

    function submitHandler(e: React.FormEvent) {
        e.preventDefault();
        apiService.signup(username, password, firstname, lastname, height, gender, birthday)
            .then((res) => {
                if (res.succes === false) {
                    setError(res.errMessage);
                } else {
                    navigate('/login')
                }
            })
    }

    return (
        <>
            <div className='signupPage'>
                <h1>Signup</h1>
                <form onSubmit={e => submitHandler(e)}>
                    <div className="input-option">
                        <label>Username:</label>
                        <input type="text" placeholder='Username' onChange={e => setUsername(e.target.value)} />

                    </div>

                    <div className="input-option">
                        <label>Password:</label>
                        <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />

                    </div>
                    <div className="input-option">
                        <label>Firstname:</label>
                        <input type="text" placeholder='First Name' onChange={e => setFirstname(e.target.value)} />

                    </div>
                    <div className="input-option">
                        <label>Lastname:</label>
                        <input type="text" placeholder='Last Name' onChange={e => setLastname(e.target.value)} />

                    </div>
                    <div className="input-option">
                        <label>Height:</label>
                        <input type="number" min="1" max="999" placeholder='Height' onChange={e => setHeight(parseInt(e.target.value))} />

                    </div>
                    <div className="input-option">
                        <label>Gender:</label>
                        <select onChange={selectChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="input-option">
                        <label>Birthday:</label>
                        <input type="date"
                            min="0000-01-01" max="9999-12-31" onChange={e => setBirthday(e.target.value)}>
                        </input>
                    </div>
                    <input type="submit" value="Sign Up" className='button' />
                </form>
                {error}
            </div>
        </>
    )
}
