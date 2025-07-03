import React from 'react';
import './general.css';

const SelectInput = ({
  label,
  options = [],
  className = '',
  value,
  setValue,
}) => {
  const handleSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`select-wrapper ${className}`}>
      {label && <label className="select-label">{label}</label>}
      <select value={value} onChange={handleSelect} className="select-field">
        {options.map((option, index) => (
          <option key={index} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
