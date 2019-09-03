/* eslint-disable prefer-template */
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '60980de6390b5e12229c406b32596655';

const config = {
  version: 'v1.2',
  url: {
    search: BASE_URL + '/search/movie',
    now: BASE_URL + '/movie/now_playing',
    popular: BASE_URL + '/movie/popular',
    top: BASE_URL + '/movie/top_rated',
    upcoming: BASE_URL + '/movie/upcoming',
    recommendations: BASE_URL + '/movie/{movie_id}/recommendations',
    movie: BASE_URL + '/movie/{movie_id}',
    videos: BASE_URL + '/movie/{movie_id}/videos',
    poster: 'https://image.tmdb.org/t/p/w200/',
    backdrop: 'https://image.tmdb.org/t/p/w500/',
  },
  params: {
    api_key: API_KEY,
    language: 'en-US',
    page: 1,
    include_adult: false,
    region: 'DE',
  },
  labels: {
    query: 'My Search',
    now: 'Now Playing',
    popular: 'Popular',
    top: 'Top Rated',
    upcoming: 'Upcoming',
    watchlist: 'My List',
    recommendations: 'Recommendations',
  },
  watchListKey: 'moviespot-watchlist',
};

export default config;
