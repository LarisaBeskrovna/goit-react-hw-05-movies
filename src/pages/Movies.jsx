import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { fetchOnSearchParams } from '../Api';
import Loader from 'components/Loader';
import MoviesList from 'components/MoviesList';
import SearchForm from 'components/SearchForm';
import css from '../index.module.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerms = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const location = useLocation();

  useEffect(() => {
    if (!searchTerms) return;
    setIsLoading(true);

    fetchOnSearchParams(searchTerms)
      .then(res => {
        setMovies(res.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [searchTerms]);

  const handleSubmit = e => {
    e.preventDefault();
    const enteredQuery = e.target.children.search.value.trim();
    setSearchParams({ query: enteredQuery });
  };

  return (
    <div className={css.search}>
      <SearchForm handleSubmit={handleSubmit} searchQuery={searchTerms} />
      {error && <p>{error.message}</p>}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MoviesList state={{ from: location }} movies={movies} />
      )}
    </div>
  );
};

export default Search;
