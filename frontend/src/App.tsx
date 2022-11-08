import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { userContext } from './components';
import './global.css';

import { 
    Login,
    Profile,
    Matchlist,
    Signup 
} from './pages';

function App() {

    const user = useContext(userContext);

    return (
        <BrowserRouter>
            {!user?.data && (
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/*" element={<Navigate to={'/login'}/>} />
                </Routes>
            )}
            
            {user?.data && (
                <Routes>
                    <Route path="/matchlist" element={<Matchlist />} />
                    <Route path="/" element={<Profile />} />
                    <Route path="/*" element={<Navigate to={'/'}/>} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
