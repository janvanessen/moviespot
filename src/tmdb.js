/* eslint-disable no-console,prefer-destructuring */
import axios from 'axios';
import config from './config';
import store from './store';

const CancelToken = axios.CancelToken;
let source;

function requestTmdb(url, params, responseHandler) {
  const state = store.state;
  const options = { params };

  if (url === config.url.search) {
    if (source) {
      source.cancel('Cancel request');
    } else {
      source = CancelToken.source();
      options.cancelToken = source.token;
    }
  }

  axios.get(url, options)
    .then((response) => {
      console.log(response);
      source = false;
      responseHandler(response);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log(error.message);
        source = false;
      } else {
        console.error(error);
        state.results = [];
      }
    });
}

function searchResponseHandler(response) {
  const state = store.state;
  state.results = response.data.results;
}

// Search by text query
function search(query) {
  const param = config.params;
  param.query = query;
  requestTmdb(config.url.search, param, searchResponseHandler);
}

// Now Playing, Upcoming, Top Rated, ...
function getSearchList(type, id) {
  let url = config.url[type];
  if (id) {
    url = url.replace('{movie_id}', id);
  }
  if (url) {
    requestTmdb(url, config.params, searchResponseHandler);
  }
}

function getMovieResponseHandler(response) {
  const state = store.state;
  state.isLoadingMovie = false;
  state.details = response.data;
}

function getMovie(id) {
  const state = store.state;
  state.details = {};
  state.videos = [];
  const url = config.url.movie.replace('{movie_id}', id);
  requestTmdb(url, config.params, getMovieResponseHandler);
  state.isLoadingMovie = true;
  this.getVideos(id);
}

function getVideosResponseHandler(response) {
  const state = store.state;
  state.videos = response.data.results;
}

function getVideos(id) {
  const url = config.url.videos.replace('{movie_id}', id);
  requestTmdb(url, config.params, getVideosResponseHandler);
}

export default {
  search,
  getMovie,
  getVideos,
  getSearchList,
};
