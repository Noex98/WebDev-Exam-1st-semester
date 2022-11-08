import React, { ReactNode, useContext, createContext, useState, useEffect } from 'react'
import { apiModel } from '../../models/apiModel'
import { ICurrentUser } from '../../types'
import { Spinner } from '../Spinner/Spinner'

type Props = {
    children: ReactNode
}

type IUserContext = {
    data: ICurrentUser | null,
    set: null | React.Dispatch<React.SetStateAction<ICurrentUser | null>>
}

export const userContext = createContext<null | IUserContext>(null);

export const UserContextProvider = ({children} : Props) => {

    const userState = useState<ICurrentUser| null>(null);
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => {
        apiModel.continueSession().then(res =>{
            if(res.succes){
                userState[1](res.data);
            }
            setLoading(false);
        })
    }, [])
    
    if(loading){
        return <Spinner/>
    }

    return (
        <userContext.Provider value={{data: userState[0], set: userState[1]}}>
            {children}
        </userContext.Provider>
    )
}
