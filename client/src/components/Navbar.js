import React, { useContext } from 'react';
import '../styles/Navbar.css';

import { AuthContext } from "../auth/context/AuthProvider";

const Navbar = ({ onLogin, onLogout }) => {
    const { user } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Note App</h1>
      </div>
      <div className="navbar-actions">
        {user ? (
          <div className="user-info">
            <img src={user.photos[0].value} alt="profile" className="profile-pic" />
            <span>{user.username}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <button onClick={onLogin} className="login-btn">Login with SSO</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
