import defaultImg from '../img/no image available.jpg';
import css from '../index.module.css';

const MoviesInfo = ({ movieDetails }) => {
  const { title, overview, poster_path, release_date, vote_average, genres } =
    movieDetails;
  const year = release_date ? release_date.split('-')[0] : '-';
  const userScore = vote_average ? Math.round(vote_average * 10) : '-';
  const genresAll = genres ? genres.map(genre => genre.name).join(' | ') : '-';

  return (
    <div className={css.moviesInfo}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/original${poster_path}`
            : defaultImg
        }
        width={200}
        alt="poster"
      />
      <div className={css.moviesInfo_list}>
        <p className={css.moviesInfo_list}>
          {title} ({year})
        </p>
        <p className={css.moviesInfo_list}>User score: {userScore}%</p>

        <p className={css.moviesInfo_lists}>{'Overview'}</p>
        <p className={css.moviesInfo_list}>{overview}</p>

        <div>
          <p className={css.moviesInfo_lists}>{'Genres:'}</p>
          <p className={css.moviesInfo_list}>{genresAll}</p>
        </div>
      </div>{' '}
    </div>
  );
};
export default MoviesInfo;
