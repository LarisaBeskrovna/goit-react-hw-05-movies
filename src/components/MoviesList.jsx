import { NavLink, useLocation } from 'react-router-dom';
import css from '../index.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movie_list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <NavLink
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.movie_list_link}
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
