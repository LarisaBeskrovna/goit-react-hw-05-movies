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
        <ul className={css.cast_list}>
          {cast &&
            cast.map(({ id, name, character, profile_path }) => (
              <li className={css.cast_info} key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : defaultImg
                  }
                  width={180}
                  height={270}
                  alt="poster"
                />
                <div className={css.cast_text}>
                  <p className={css.cast_name}>{name}</p>
                  <p>{character}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
      {error && <p>Error...</p>}
    </div>
  );
};

export default Cast;
