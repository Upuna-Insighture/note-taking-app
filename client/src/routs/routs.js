import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotesPage from '../pages/NotesPage';
import LoginPage from '../auth/pages/LoginPage';

const RouterFile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
        window.open(process.env.REACT_APP_AUTH_SERVER_URL + "/auth/logout", "_self");
    };
    
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage onLogout={handleLogout} />}
                />
                <Route
                    path="/notes"
                    element={<NotesPage user={user} onLogout={handleLogout} />}
                />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </div>
    )
}
export default RouterFile;