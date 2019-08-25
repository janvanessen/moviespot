/* eslint-disable no-console */
import axios from 'axios';
import config from './config';

function requestTmdb(url, params, state, isDetailsRequest = false) {
  axios.get(url, { params })
    .then((response) => {
      console.log(response);
      if (isDetailsRequest) {
        state.details = response.data;
      } else {
        state.results = response.data.results;
      }
    })
    .catch((error) => {
      console.error(error);
      state.results = [];
    });
}

function getNowPlaying(state) {
  requestTmdb(config.url.now, config.params, state);
}

function getPopular(state) {
  requestTmdb(config.url.popular, config.params, state);
}

function getTopRated(state) {
  requestTmdb(config.url.top, config.params, state);
}

function getUpcoming(state) {
  requestTmdb(config.url.upcoming, config.params, state);
}

function search(query, state) {
  if (query.length === 0) {
    getNowPlaying(state);
    return;
  }
  const param = config.params;
  param.query = query;
  requestTmdb(config.url.search, param, state);
}

function getRecommendations(id, state) {
  const url = config.url.recommendations.replace('{movie_id}', id);
  requestTmdb(url, config.params, state);
}

function getMovie(id, state) {
  const url = config.url.movie.replace('{movie_id}', id);
  requestTmdb(url, config.params, state, true);
}

export default {
  search,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  getRecommendations,
  getMovie,
};
