import React from 'react';
import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons';

const Login = ({ username, password, setUsername, setPassword }) => {
  return (
    <>
      <Input
        label="Username:"
        type="text"
        value={username}
        setValue={setUsername}
        icon={<FontAwesomeIcon icon={faUser} />}
        variant="light"
      />
      <Input
        label="Password:"
        type="password"
        value={password}
        setValue={setPassword}
        icon={<FontAwesomeIcon icon={faLock} />}
        variant="light"
      />
      <div className="submit-container">
        <Button
          label="Sign In"
          icon={<FontAwesomeIcon icon={faKey} />}
          type="submit"
        />
      </div>
    </>
  );
};

export default Login;
