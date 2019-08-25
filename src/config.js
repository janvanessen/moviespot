/* eslint-disable prefer-template */
const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = '60980de6390b5e12229c406b32596655';

const config = {
  version: 'v0.2',
  url: {
    search: BASE_URL + '/search/movie',
    now: BASE_URL + '/movie/now_playing',
    popular: BASE_URL + '/movie/popular',
    top: BASE_URL + '/movie/top_rated',
    upcoming: BASE_URL + '/movie/upcoming',
    recommendations: BASE_URL + '/movie/{movie_id}/recommendations',
    movie: BASE_URL + '/movie/{movie_id}',
    poster: 'https://image.tmdb.org/t/p/w200/',
    backdrop: 'https://image.tmdb.org/t/p/w500/',
  },
  params: {
    api_key: '60980de6390b5e12229c406b32596655',
    language: 'en-US',
    page: 1,
    include_adult: false,
    region: 'DE',
  },
  labels: {
    search: 'Suche',
    now: 'Now Playing',
    popular: 'Popular',
    top: 'Top Rated',
    upcoming: 'Upcoming',
    watchlist: 'My List',
    recommendations: 'Recommendations',
  },
};

export default config;
