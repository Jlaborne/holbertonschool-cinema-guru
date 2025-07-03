import './navigation.css';
import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ userUsername, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="dashboard-header">
      <div className="dashboard-left">Cinema Guru</div>
      <div className="dashboard-right">
        <img
          src="https://picsum.photos/100/100"
          alt="avatar"
          className="dashboard-avatar"
        />
        <p className="dashboard-welcome">Welcome, {userUsername} !</p>
        <span className="dashboard-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </span>
      </div>
    </nav>
  );
};

export default Header;
