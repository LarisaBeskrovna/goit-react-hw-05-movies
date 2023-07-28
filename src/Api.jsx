import axios from 'axios';

const API_KEY = 'b736543dbc75e71c808e6920558bf547';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchCast = movieId => {
  return axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
};

export const fetchTrendingMovies = async () => {
  return await axios.get(`/trending/movie/week?api_key=${API_KEY}`);
};

export const fetchReviews = movieId => {
  return axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
};

export const movieDetail = movieId => {
  return axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
};

export const fetchOnSearchParams = async (query, page = 1) => {
  return await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&per_page=20`
  );
};
