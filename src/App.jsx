import { Suspense, lazy } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import css from './index.module.css';
import Loader from './components/Loader';

const Home = lazy(() => import('pages/Home'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Search = lazy(() => import('pages/Movies'));
const Cast = lazy(() => import('pages/Cast'));
const Reviews = lazy(() => import('pages/Reviews'));

export const App = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.header_list}>
          <nav>
            <NavLink className={css.header_link} to="/">
              Home
            </NavLink>
            <NavLink className={css.header_link} to="/movies">
              Movies
            </NavLink>
          </nav>
        </div>
      </header>
      <main>
        <section>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Search />} />
              <Route path="/movies/:movieId/*" element={<MovieDetails />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default App;
