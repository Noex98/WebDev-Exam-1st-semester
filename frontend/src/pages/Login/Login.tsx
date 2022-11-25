import React, { useState } from 'react'
import { apiService } from '../../service/apiService';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { IUser } from '../../types';
import { CtaButton, TextInput } from '../../components';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye_open.svg';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye_closed.svg';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const Login = ({setUser}: Props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function submitHandler(e: React.FormEvent){
        e.preventDefault();
        
        apiService.login(email, password).then(res => {
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
                <label>
                    <h3>Email</h3>
                    <TextInput type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <h3>Password</h3>
                    <TextInput type={showPassword ? "text" : "password"}  onChange={e => setPassword(e.target.value)} >
                        {showPassword && <EyeClosed onClick={() => setShowPassword(prev => !prev)}/>}
                        {!showPassword && <EyeOpen onClick={() => setShowPassword(prev => !prev)}/>}
                    </TextInput>
                </label>
                <span className='btnContainer'>
                    <CtaButton color='positive' type="submit" >
                        Log in
                    </CtaButton>
                </span>
                {errMessage}
            </form>
            <div className="registerText">
                <Link to="/signup">
                    New to this app? <strong>Register here</strong>
                </Link>
            </div>
        </div>
    )
}
