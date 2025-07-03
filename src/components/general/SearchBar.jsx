import React from 'react';
import './general.css';

const SearchBar = ({ title, setTitle }) => {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        value={title}
        onChange={handleInput}
        placeholder="Search..."
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
