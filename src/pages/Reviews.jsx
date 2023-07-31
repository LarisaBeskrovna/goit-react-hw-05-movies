import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../Api';
import css from '../index.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchReviews(movieId)
      .then(res => {
        setReviews(res.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.reviews}>
      {error !== null && <p>{error.message}</p>}
      {reviews?.length > 0 ? (
        reviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>{author}</h3>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <p>There are no reviews </p>
      )}
    </div>
  );
};

export default Reviews;
