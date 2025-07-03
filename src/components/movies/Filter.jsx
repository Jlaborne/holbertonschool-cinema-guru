import React from 'react';
import './movies.css';
import Tag from './Tag';
import SearchBar from '../general/SearchBar';
import SelectInput from '../general/SelectInput';

const Filter = ({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) => {
  const allGenres = [
    'action',
    'drama',
    'comedy',
    'biography',
    'romance',
    'thriller',
    'war',
    'history',
    'sport',
    'sci-fi',
    'documentary',
    'crime',
    'fantasy',
  ];

  return (
    <div className="filter-container">
      <div className="filter-left">
        <SearchBar title={title} setTitle={setTitle} />

        <div className="year-sort-row">
          <div className="input-group">
            <label>Min Date:</label>
            <input
              type="number"
              placeholder="Min Year"
              value={minYear}
              onChange={(e) => setMinYear(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Max Date:</label>
            <input
              type="number"
              placeholder="Max Year"
              value={maxYear}
              onChange={(e) => setMaxYear(Number(e.target.value))}
            />
          </div>

          <div className="input-group">
            <label>Sort by:</label>
            <SelectInput
              value={sort}
              setValue={setSort}
              options={[
                { label: 'Latest', value: 'latest' },
                { label: 'Oldest', value: 'oldest' },
                { label: 'Highest Rated', value: 'highestrated' },
                { label: 'Lowest Rated', value: 'lowestrated' },
              ]}
            />
          </div>
        </div>
      </div>

      <ul className="genre-tags">
        {allGenres.map((genre) => (
          <Tag
            key={genre}
            genre={genre}
            filter={true}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
};

export default Filter;
