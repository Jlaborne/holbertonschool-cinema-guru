import React, { useState } from 'react';
import './auth.css';
import Login from './Login';
import Register from './Register';
import axios from 'axios';

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
  const [_switch, setSwitch] = useState(true); // true = login, false = register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (_switch === true) {
      axios
        .post('http://localhost:8000/api/auth/login', { username, password })
        .then((res) => {
          const token = res.data.accessToken;
          localStorage.setItem('accessToken', token);
          setUserUsername(username);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          alert('Login failed');
        });
    } else {
      axios
        .post('http://localhost:8000/api/auth/register', { username, password })
        .then((res) => {
          const token = res.data.accessToken;
          localStorage.setItem('accessToken', token);
          setUserUsername(username);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          alert('Registration failed');
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <button
          className={`auth-toggle-btn ${_switch ? 'active' : ''}`}
          onClick={() => setSwitch(true)}
        >
          Sign In
        </button>
        <button
          className={`auth-toggle-btn ${!_switch ? 'active' : ''}`}
          onClick={() => setSwitch(false)}
        >
          Sign Up
        </button>
      </div>

      <div className="auth-body">
        <form className="auth-form" onSubmit={handleSubmit}>
          {_switch ? (
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          ) : (
            <Register
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Authentication;
