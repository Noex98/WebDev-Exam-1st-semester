import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../service/apiService';
import { IUser } from '../../types';
import { CtaButton, TextInput } from '../../components';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye_open.svg';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye_closed.svg';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import './style.scss';

type Props = {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const Login = ({setUser}: Props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        if(email.length > 0 && password.length > 0){
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true)
        }
    }, [email, password])

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
            <Logo height="110px" stroke='white' fill='white'/>
            <h1>Eat<u>Out</u></h1>
            <h2>Sign in</h2>
            <form onSubmit={e =>submitHandler(e)}>
                <label>
                    <h3>Email</h3>
                    <TextInput required type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <h3>Password</h3>
                    <TextInput required type={showPassword ? "text" : "password"}  onChange={e => setPassword(e.target.value)} >
                        {showPassword && <EyeClosed onClick={() => setShowPassword(prev => !prev)}/>}
                        {!showPassword && <EyeOpen onClick={() => setShowPassword(prev => !prev)}/>}
                    </TextInput>
                </label>
                <span className='btnContainer'>
                    <CtaButton disabled={btnDisabled} color='positive' type="submit" >
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
