import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { movieDetail } from '../Api';
import css from '../index.module.css';
import Loader from '../components/Loader';
import defaultImg from '../img/no image available.jpg';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();
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
    return () => {
      source.cancel();
    };
  }, [movieId]);

  const { title, overview, poster_path, release_date, vote_average, genres } =
    movieDetails;
  const year = release_date ? release_date.split('-')[0] : '-';
  const userScore = vote_average ? Math.round(vote_average * 10) : '-';
  const genresAll = genres ? genres.map(genre => genre.name).join(' | ') : '-';

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
          <div>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : defaultImg
              }
              width={250}
              alt="poster"
            />
            <div>
              <p>
                {title} ({year})
              </p>
              <p>User score: {userScore}%</p>

              <p>{'Overview'}</p>
              <p>{overview}</p>

              <div>
                <p>{'Genres:'}</p>
                <p>{genresAll}</p>
              </div>
            </div>{' '}
          </div>

          <div>
            <p>Additional information:</p>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
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
