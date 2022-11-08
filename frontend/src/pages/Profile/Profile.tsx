import React, { useContext, useEffect, useState } from 'react'
import { Header, userContext } from '../../components';
import { Image } from './components'
import { apiModel } from '../../models/apiModel';
import './style.css';

export const Profile = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [height, setHeight] = useState(0);
    const [gender, setGender] = useState<"male" | "female">("male");
    const [birthday, setBirthday] = useState("");

    const user = useContext(userContext);

    useEffect(() => {
        if (user?.data) {
            setFirstname(user.data.firstname);
            setLastname(user.data.lastname);
            setHeight(user.data.height);
            setGender(user.data.gender);
            setBirthday(user.data.birthday);
        }
    }, [user?.data])

    if (!user?.data) {
        return <></>
    }

    const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "male" || value === "female") {
            setGender(value);
        }
    };

    function submitHandler(e: React.FormEvent){
        e.preventDefault();
        apiModel.editUser(firstname, lastname, height, gender, birthday).then(res => {
            console.log(res);

        })
    }

    return (
        <>
            <Header />

            <Image />

            <form onSubmit={e => submitHandler(e)}>
                <h1>Profile</h1>
                <div className="input-option">
                    <label>Firstname: </label>
                    <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />

                </div>
                <div className="input-option">
                    <label>Lastname: </label>
                    <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />

                </div>
                <div className="input-option">
                    <label>Height: </label>
                    <input type="number" min="1" max="999" value={height} onChange={e => setHeight(parseInt(e.target.value))} />

                </div>
                <div className="input-option">
                    <label>Gender:</label>
                    <select onChange={selectChange} defaultValue={gender} >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className="input-option">
                    <label>Birthday:</label>
                    <input type="date"
                        min="0000-01-01" max="9999-12-31" value={birthday} onChange={e => setBirthday(e.target.value)}>
                    </input>
                    <div className="input-option">
                        <input type="submit" value="Save Changes" className='button' />
                    </div>
                </div>
            </form>
        </>
    )
}
