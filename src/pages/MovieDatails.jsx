import { Suspense } from 'react';
import { fetchById } from 'api';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import noImg from '../no_img.jpg';

const MovieDatails = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      setStatus('pending');
      const optionsForId = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q',
        },
      };
      try {
        const movieById = await fetchById(optionsForId);
        setData(movieById.data);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <>
      {status === 'idle' ? null : (
        <>
          {status === 'pending' && <Loader />}
          {status === 'rejected' && <div>Error! Reload page</div>}
          <div className="wrapper">
            {status === 'resolved' &&
              (!data ? (
                <div>There are no movies!</div>
              ) : (
                <>
                  <Link to={backLinkLocationRef.current} className="go-back">
                    Go back
                  </Link>
                  <div className="movie-wrapper">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                      alt={data.title}
                      className="movie-img"
                      onError={e => {
                        e.target.src = noImg;
                        e.target.alt = 'No info';
                      }}
                    />
                    <div className="movie-wrap">
                      <h1 className="movie-title">
                        {data.title}{' '}
                        <span>
                          ({data.release_date?.slice(0, 4) ?? '0000'})
                        </span>
                        {/* <span>({data.release_date.slice(0, 4)})</span> */}
                      </h1>
                      <p className="movie-score">
                        User Score: <span>{data.vote_average}</span>
                      </p>
                      <h2 className="movie-subtitle">Overview</h2>
                      <p className="movie-text">{data.overview}</p>
                      <h2 className="movie-subtitle">Genres</h2>
                      <p className="movie-text">
                        {data.genres.map(({ name, id }) => {
                          return <span key={id}>{name}</span>;
                        })}
                      </p>
                    </div>
                  </div>
                </>
              ))}
          </div>
          <ul className="movie-more-info-items">
            <h3>Additional informarion</h3>
            <li className="movie-more-info-item">
              <Link to="cast" className="movie-more-info-link">
                Cast
              </Link>
            </li>
            <li className="movie-more-info-item">
              <Link to="reviews" className="movie-more-info-link">
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDatails;
