import React, { useState, useEffect } from 'react';
import './movies.css';

const Tag = ({ genre, filter, genres, setGenres }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Keep tag state in sync when parent resets filters
    setSelected(genres.includes(genre));
  }, [genres, genre]);

  const handleTag = () => {
    if (selected) {
      // Remove genre from the selected genres
      setGenres(genres.filter((g) => g !== genre));
      setSelected(false);
    } else {
      // Add genre to the selected genres
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag ${selected ? 'selected' : ''} ${
        filter ? 'filter-tag' : ''
      }`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
};

export default Tag;
