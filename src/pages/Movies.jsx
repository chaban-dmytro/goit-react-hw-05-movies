import { fetchByName } from 'api';
import Loader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');
  const [name, setName] = useState('');

  const location = useLocation();
  let movieName = searchParams.get('query') ?? '';

  const updateQueryString = evt => {
    const nextParams =
      evt.target.value !== '' ? { query: evt.target.value } : {};
    setSearchParams(nextParams);
  };

  const updateName = evt => {
    evt.preventDefault();
    setName(movieName);
  };

  const cleanInput = () => {
    setSearchParams({ query: '' });
    setName('');
    setData('');
  };

  useEffect(() => {
    setName(movieName);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchData() {
      setStatus('pending');
      const optionsForName = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          query: `${movieName}`,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
        },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q',
        },
      };
      try {
        const movieByName = await fetchByName(optionsForName);
        console.log(movieByName);
        setData(movieByName.data.results);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
    if (name.length !== 0) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [name]);

  return (
    <>
      <form action="submit" onSubmit={updateName}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="name"
          type="text"
          value={movieName}
          onChange={updateQueryString}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
        <Button type="button" variant="contained" onClick={cleanInput}>
          Clean
        </Button>
      </form>

      {status === 'idle' ? null : (
        <>
          {status === 'pending' && <Loader />}
          {status === 'rejected' && <div>Error! Reload page</div>}
          <ul className="movies-items">
            {status === 'resolved' &&
              (data.length === 0 ? (
                <div>There are no movies!</div>
              ) : (
                <>
                  {data.map(({ title, id, original_title }) => {
                    return (
                      <li key={id} className="movies-item">
                        <Link
                          className="movies-link"
                          to={`/movies/${id}`}
                          state={{ from: location }}
                        >
                          {title ? title : original_title}
                        </Link>
                      </li>
                    );
                  })}
                </>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Movies;
