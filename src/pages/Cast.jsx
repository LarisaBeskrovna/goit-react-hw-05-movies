import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../Api';
import css from '../index.module.css';
import defaultImg from '../img/no image available.jpg';

const Cast = () => {
  const [cast, setCast] = useState();
  const [error, setError] = useState();
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCast(movieId)
      .then(res => {
        setCast(res.data.cast);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      });
  }, [movieId]);

  return (
    <div className={css.cast}>
      {loading ? (
        <p>Loading cast....</p>
      ) : (
        <ul>
          {cast &&
            cast.map(({ id, name, character, profile_path }) => (
              <li key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : defaultImg
                  }
                  width={250}
                  alt="poster"
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
        </ul>
      )}
      {error && <p>Error...</p>}
    </div>
  );
};

export default Cast;
