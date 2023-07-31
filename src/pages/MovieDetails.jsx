import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { movieDetail } from '../Api';
import css from '../index.module.css';
import Loader from '../components/Loader';
import MoviesInfo from '../components/MoviesInfo';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    const source = movieDetail(movieId);
    source
      .then(res => {
        setMovieDetails(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError(true);
        setLoading(false);
      });
    //return () => {
    //source.cancel();
    //};
  }, [movieId]);

  return (
    <div>
      <NavLink to={backLinkLocationRef.current}>
        <button type="button" className={css.back_btn}>
          Go back
        </button>
      </NavLink>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {movieDetails && <MoviesInfo movieDetails={movieDetails} />}

          <div className={css.additional}>
            <p className={css.additional_lists}>Additional information:</p>
            <ul className={css.additional_list}>
              <li>
                <NavLink to="cast" className={css.additional_link}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={css.additional_link}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
      {error && <p>Error...</p>}
    </div>
  );
};

export default MovieDetails;
