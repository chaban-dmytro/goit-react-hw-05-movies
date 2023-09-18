import { fetchById } from 'api';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const MovieDatails = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
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

  console.log(location);

  return (
    <>
      {status === 'idle' ? null : (
        <>
          <div className="wrapper">
            {status === 'pending' && <div>LOAD</div>}
            {status === 'rejected' && <div>Error! Reload page</div>}
            {status === 'resolved' &&
              (!data ? (
                <div>There are no movies!</div>
              ) : (
                <>
                  <Link to={backLinkLocationRef.current}>Go back</Link>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
                    alt={data.title}
                    onError={e => {
                      e.target.src =
                        'https://shosse.su/upload/iblock/01d/01da52612057b97ac22b4ad9180d0fb8.png';
                      e.target.alt = 'No info';
                    }}
                  />
                  <div className="wrap">
                    <h1 className="title">
                      {data.title} <span>{data.release_date}</span>
                    </h1>
                    <p className="score">{data.vote_average}</p>
                    <h2 className="subtitle">overview</h2>
                    <p className="text">{data.overview}</p>
                    <h2 className="subtitle">genres</h2>
                    <p className="text">
                      {data.genres.map(gener => {
                        return gener.name;
                      })}
                    </p>
                  </div>
                </>
              ))}
          </div>
          <ul>
            Additional informarion
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDatails;
