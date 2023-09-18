import { fetch } from 'api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function fetchData() {
      try {
        const topMovies = await fetch();
        setData(topMovies.data);
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
  }, []);
  return (
    <>
      {status === 'idle' ? null : (
        <>
          <ul className="items">
            {status === 'pending' && <div>LOAD</div>}
            {status === 'rejected' && <div>Error! Reload page</div>}
            {status === 'resolved' &&
              (data.results.length === 0 ? (
                <div>There are no images!</div>
              ) : (
                data.results.map(result => (
                  <li key={result.id}>
                    <Link to={`/movies/${result.id}`}>
                      {result.title ? result.title : result.name}
                    </Link>
                  </li>
                ))
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Home;
