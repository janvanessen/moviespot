/* eslint-disable no-console */
import axios from 'axios';
import config from './config';

function requestTmdb(url, params, state, stateField = 'results', responseField = 'results') {
  axios.get(url, { params })
    .then((response) => {
      console.log(response);
      if (responseField.length > 0) {
        state[stateField] = response.data[responseField];
      } else {
        state[stateField] = response.data;
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
  state.details = {};
  state.videos = [];
  const url = config.url.movie.replace('{movie_id}', id);
  requestTmdb(url, config.params, state, 'details', '');
  this.getVideos(id, state);
}

function getVideos(id, state) {
  const url = config.url.videos.replace('{movie_id}', id);
  requestTmdb(url, config.params, state, 'videos', 'results');
}

export default {
  search,
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  getRecommendations,
  getMovie,
  getVideos,
};
