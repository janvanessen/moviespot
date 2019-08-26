import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    watchlist: [],
    searchType: '',
    searchQuery: '',
    details: {},
    videos: [],
  },
  mutations: {
    updateSearchType(state, { type }) {
      state.searchType = type;
      if (type !== 'search') {
        state.searchQuery = '';
      }
    },
    updateSearchQuery(state, { query }) {
      state.searchQuery = query;
    },
  },
});
