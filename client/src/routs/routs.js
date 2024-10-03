import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotesPage from '../pages/NotesPage';
import LoginPage from '../pages/LoginPage';

const RouterFile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

//   const handleLogin = () => {
//       // Simulate SSO login
//       console.log("Login")
//       console.log(user)
//     const mockUser = {
//       username: 'JohnDoe',
//       profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
//     };
//     setUser(mockUser);
//   };

  const handleLogout = () => {
      setUser(null);
      navigate('/');
      window.open(process.env.REACT_APP_API_URL + "/auth/logout", "_self");
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