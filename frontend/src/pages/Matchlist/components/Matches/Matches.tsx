import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../../../components'
import { apiModel } from '../../../../models/apiModel';
import { IUser } from '../../../../types';
import './style.css';

export const Matches = () => {

    const [matches, setMatches] = useState<IUser[]>([]);
    const user = useContext(userContext);

    useEffect(() => {
        apiModel.getMatches().then(res => {
            setMatches(res.data)
        })
    }, [user?.data?.preferences])


    return (
        <>
            <div>Matches</div>
            <div className='wrapper'>
                {matches.map(user => (
                    <div className="card">
                        <img src="img_avatar.png" alt="Avatar" ></img>
                        <div className="container">
                            <h4><b>{user.firstname} {user.lastname}</b></h4>
                            <p>Height: {user.height} Age: {user.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
