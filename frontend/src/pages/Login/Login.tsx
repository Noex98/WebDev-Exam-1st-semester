import React, { useState, useContext } from 'react'
import { apiService } from '../../service/apiService';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { IUser } from '../../types';
import CtaButton from '../../components/CtaButton/CtaButton';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const Login = ({setUser}: Props) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");

    function submitHandler(e: React.FormEvent){
        e.preventDefault();
        
        apiService.login(username, password).then(res => {
            if(res.succes){
                    setUser(res.data);
                    navigate('/Explore');
            } else {
                setErrMessage(res.errMessage);
            }
        });
    }

    return (
        <div className='pages__login'>
            <h2>Login</h2>
            <form onSubmit={e =>submitHandler(e)}>
                <div>
                    <label>
                        <h3>Email</h3>
                        <input type="text" onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Password</h3>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <input type="submit" value="Log in" className='button'/>
            </form>
            <div>{errMessage}</div>
            <CtaButton text={'Login'} type={'positive'} onclick={function (): void {
                throw new Error('Function not implemented.');
            } } />
            <div className="registerText"><p>New to this app?</p> <a href=""> Register new user</a></div>
        </div>
    )
}
