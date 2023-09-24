import { fetch } from 'api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';
import css from './Home.module.css';
import noImg from '../no_img.jpg';

const Home = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function fetchData() {
      setStatus('pending');
      try {
        const topMovies = await fetch();
        setData(topMovies.data);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
    // eslint-disable-next-line
    fetchData();
  }, []);
  return (
    <>
      <h2 className={css.title}>Trending today</h2>
      {status === 'idle' ? null : (
        <>
          {status === 'pending' && <Loader />}
          {status === 'rejected' && <div>Error! Reload page</div>}
          <ul className={css.items}>
            {status === 'resolved' &&
              (data.results.length === 0 ? (
                <div>There are no images!</div>
              ) : (
                <>
                  {data.results.map(result => (
                    <li key={result.id} className={css.item}>
                      <Link to={`/movies/${result.id}`} className={css.link}>
                        <img
                          src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
                          alt={result.title}
                          className={css.img}
                          onError={e => {
                            e.target.src = noImg;
                            e.target.alt = 'No info';
                          }}
                        />
                        <p className={css.name}>
                          {result.title ? result.title : result.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Home;
