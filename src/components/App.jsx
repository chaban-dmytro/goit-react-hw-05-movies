import { lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom/dist';
import Home from 'pages/Home';
import MovieDatails from 'pages/MovieDatails';
import Movies from 'pages/Movies';
import NotFound from './NotFound';

const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export const App = () => {
  return (
    <div className="container">
      <nav className="nav-items">
        <NavLink to={'/'} className="nav-item">
          Home
        </NavLink>
        <NavLink to={'/movies'} className="nav-item">
          Movies
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDatails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
