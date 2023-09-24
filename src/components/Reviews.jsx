import { useEffect, useState } from 'react';
import { fetchById } from 'api';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [data, setData] = useState();
  const [status, setStatus] = useState('idle');

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const optionsForId = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        params: { language: 'en-US', page: '1' },
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZGMyZmM3OWE5Njc5NTQ5MTJjYTVhYWQ0NWI5NTU3NCIsInN1YiI6IjY1MDA0YzQzMWJmMjY2MDBmZmI1YWI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zirrhOIT7yqxW1n0pdlMVLkB4-AicQWjZCs5JhftH6Q',
        },
      };
      try {
        const movieById = await fetchById(optionsForId);
        setData(movieById.data.results);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        console.log(error);
      }
    }
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
                <div>We don`t have any reviews for this movie</div>
              ) : (
                <>
                  <ul className="reviews-items">
                    {data.map(({ author, content }) => {
                      return (
                        <li className="reviews-item" key={author}>
                          <p className="reviews-author">{author}</p>
                          <p className="reviews-text">{content}</p>
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

export default Reviews;
