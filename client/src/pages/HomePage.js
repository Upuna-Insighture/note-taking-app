import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // onLogin();
    navigate('/login');
  };

  return (
    <div>
      <Navbar user={user} onLogin={handleLogin} onLogout={onLogout} />
      <div className="home-content">
        <h2>Welcome to the Note App</h2>
        <p>Please log in to manage your notes.</p>
      </div>
    </div>
  );
};

export default HomePage;
