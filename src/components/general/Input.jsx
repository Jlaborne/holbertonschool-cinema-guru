import React from 'react';
import './general.css';

const Input = ({
  label,
  type = 'text',
  className = '',
  value,
  setValue,
  icon = null,
  inputAttributes = {},
}) => {
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {icon && <span className="input-icon">{icon}</span>}
          {label}
        </label>
      )}
      <div className="input-container">
        <input
          type={type}
          value={value}
          onChange={handleInput}
          className="input-field"
          {...inputAttributes}
        />
      </div>
    </div>
  );
};

export default Input;
