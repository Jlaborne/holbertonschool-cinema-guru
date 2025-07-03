import React from 'react';
import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';

const Register = ({ username, password, setUsername, setPassword }) => {
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
          label="Sign Up"
          icon={<FontAwesomeIcon icon={faPlus} />}
          type="submit"
        />
      </div>
    </>
  );
};

export default Register;
