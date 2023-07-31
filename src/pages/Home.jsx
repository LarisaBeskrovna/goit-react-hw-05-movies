import MoviesList from 'components/MoviesList';
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../Api';
import css from '../index.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(movies => setTrendingMovies(movies))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={css.home}>
      <h1 className={css.home_title}>Trending today</h1>
      {trendingMovies.length > 0 && <MoviesList movies={trendingMovies} />}
    </div>
  );
};

export default Home;
