import React, { useEffect, useState } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import axios from 'axios';

const WatchLater = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    axios
      .get('http://localhost:8000/api/titles/watchlater/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setMovies(res.data))
      .catch((err) => console.error('Failed to fetch watch later list:', err));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Movies you like</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default WatchLater;
