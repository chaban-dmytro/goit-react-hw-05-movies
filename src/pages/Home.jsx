import { fetch } from 'api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';
import css from './Home.module.css';

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
                  <h2>Trending toray</h2>
                  {data.results.map(result => (
                    <li key={result.id} className={css.item}>
                      <Link to={`/movies/${result.id}`} className={css.link}>
                        {result.title ? result.title : result.name}
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
