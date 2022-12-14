import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { apiService } from './service/apiService';
import './global.scss';

import { 
    Login,
    Profile,
    Explore,
    Reservations,
    Restaurant,
    Signup,
    EditUser
} from './pages';
import { useEffect, useState } from 'react';
import { IUser } from './types';
import { Spinner } from './components';

function App() {
    const [csrfTokenInitialized, setCsrfTokenInitialized] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.getCsrfToken().then(() => setCsrfTokenInitialized(true));
    }, [])

    useEffect(() => {
        if(csrfTokenInitialized){
            apiService.continueSession()
                .then(res => {
                    setUser(res);
                })
                .catch(res=> console.log(res))
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [csrfTokenInitialized])
    
    if (loading){
        return (<Spinner/>)
    }

    return (
        <BrowserRouter>
            {!user && (
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setUser={setUser}/>} />
                    <Route path="/*" element={<Navigate to={'/login'}/>} />
                </Routes>
            )}

            {user && (
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/restaurant/:id" element={<Restaurant  />} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
                    <Route path="/editUser" element= {<EditUser user={user} setUser={setUser}/>} />
                    <Route path="/*" element={<Navigate to={'/'}/>} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
