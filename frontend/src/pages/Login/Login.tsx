import React, { useState, useContext } from 'react'
import { apiModel } from '../../models/apiModel';
import { Header, userContext } from '../../components';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const Login = () => {

    const user = useContext(userContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    function submitHandler(e: React.FormEvent){
        e.preventDefault();
        
        apiModel.login(username, password).then(res => {
            if(res.succes && user?.set){
                    user.set(res.data);
                    navigate('/profile');
            } else {
                setErrMessage(res.errMessage);
            }
        });
    }

    return (
        <>
            <Header />
            <div className='loginPage'>
                <h1>Login</h1>
                <form onSubmit={e =>submitHandler(e)}>
                    <div>
                        <label>
                            <div>Username: </div>
                            <input type="text" onChange={e => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <div>Password: </div>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <input type="submit" value="Log in" className='button'/>
                </form>
                <div>{errMessage}</div>
            </div>
        </>
    )
}
