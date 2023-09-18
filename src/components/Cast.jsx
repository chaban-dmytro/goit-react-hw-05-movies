import { Link, useParams } from 'react-router-dom';
import { fetchById } from 'api';
import { useEffect, useState } from 'react';

export const Cast = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const optionsForId = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q',
        },
      };
      try {
        const movieById = await fetchById(optionsForId);
        setData(movieById.data.cast);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
    // if (context.name) {
    //   fetchData();
    // }
    // eslint-disable-next-line
    fetchData();
  }, [movieId]);
  return (
    <>
      {status === 'idle' ? null : (
        <>
          <div className="wrapper">
            {status === 'pending' && <div>LOAD</div>}
            {status === 'rejected' && <div>Error! Reload page</div>}
            {status === 'resolved' &&
              (data.length === 0 ? (
                <div>There are no info!</div>
              ) : (
                <>
                  <ul>
                    {data.map(({ name, character, profile_path }) => {
                      return (
                        <li key={name}>
                          <img
                            src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                            alt={name}
                            onError={e => {
                              e.target.src =
                                'https://shosse.su/upload/iblock/01d/01da52612057b97ac22b4ad9180d0fb8.png';
                              e.target.alt = 'No info';
                            }}
                          />
                          <p>{name}</p>
                          <p>{character}</p>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ))}
          </div>
        </>
      )}
    </>
  );
};
