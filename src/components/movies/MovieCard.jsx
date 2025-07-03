import React, { useState, useEffect } from 'react';
import './movies.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const imdbId = movie.imdbId;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) return;

    const fetchLists = async () => {
      try {
        const [favoritesRes, watchLaterRes] = await Promise.all([
          axios.get('http://localhost:8000/api/titles/favorite/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:8000/api/titles/watchlater/', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setIsFavorite(favoritesRes.data.some((fav) => fav.imdbId === imdbId));
        setIsWatchLater(watchLaterRes.data.some((wl) => wl.imdbId === imdbId));
      } catch (err) {
        console.error('Error fetching user movie lists:', err);
      }
    };

    fetchLists();
  }, [imdbId, token]);

  const handleClick = async (type) => {
    const stateSetter = type === 'favorite' ? setIsFavorite : setIsWatchLater;
    const currentState = type === 'favorite' ? isFavorite : isWatchLater;
    const url = `http://localhost:8000/api/titles/${type}/${imdbId}`;

    try {
      if (currentState) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        stateSetter(false);
      } else {
        await axios.post(
          url,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        stateSetter(true);
      }
    } catch (err) {
      console.error(`Failed to update ${type} list:`, err);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-actions">
        <FontAwesomeIcon
          icon={faStar}
          className={`icon favorite ${isFavorite ? 'active' : ''}`}
          onClick={() => handleClick('favorite')}
        />
        <FontAwesomeIcon
          icon={faClock}
          className={`icon watch-later ${isWatchLater ? 'active' : ''}`}
          onClick={() => handleClick('watchlater')}
        />
      </div>

      <div className="poster-wrapper">
        <img
          src={movie.imageurls?.[0] || '/default-poster.jpg'}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-poster.jpg';
          }}
        />
        <h3 className="movie-title">{movie.title}</h3>
      </div>
      <p className="movie-synopsis">
        {movie.synopsis && movie.synopsis.length > 190
          ? movie.synopsis.slice(0, 190) + '...'
          : movie.synopsis || 'No synopsis available.'}
      </p>

      <ul className="movie-genres">
        {movie.genres.map((genre, index) => (
          <li key={index} className="movie-genre">
            {genre}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default MovieCard;
