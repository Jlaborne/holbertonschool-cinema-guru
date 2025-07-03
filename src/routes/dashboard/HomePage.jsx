import React, { useEffect, useState } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import axios from 'axios';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  const token = localStorage.getItem('accessToken');

  const loadMovies = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/titles/advancedsearch',
        {
          params: {
            minYear,
            maxYear,
            genres: genres.join(','),
            title,
            sort,
            page: pageNum,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newMovies = res.data.titles;

      if (pageNum === 1) {
        setMovies(newMovies);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  useEffect(() => {
    setPage(1);
    loadMovies(1);
  }, [minYear, maxYear, genres, sort, title]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />

      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>

      <div className="load-more-btn">
        <Button label="Load More.." onClick={handleLoadMore} />
      </div>
    </div>
  );
};

export default HomePage;
