<template>
  <div>
    <div>
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="gallery">
      <div class="gallery-panel"
           v-for="movie in movies" :key="movie.id">
        <img :src="getPoster(movie.poster_path)" :alt="movie.title" class="image">

        <div v-if="isInWatchList(movie.id)" @click="removeFromWatchlist(movie.id)"
             class="bookmark bookmark-active">
          <div class="bookmark-icon">
            <i class="fas fa-bookmark fa-lg"></i>
          </div>
        </div>

        <div v-else @click="addToWatchlist(movie)"
             class="bookmark">
          <div class="bookmark-icon">
            <i class="far fa-bookmark fa-lg"></i>
          </div>
        </div>

        <div @click="showRecommendations(movie.id)"
             class="recommendations">
          <div class="recommendations-icon">
            <i class="fas fa-user fa-lg"></i>
          </div>
        </div>

        <router-link :to="{ name: 'movie', params: { id: movie.id }}" @click="openMovie(movie.id)"
                     class="open">
          <div class="open-icon">
            <i class="fas fa-list-ul fa-lg"></i>
          </div>
        </router-link>

      </div>
    </div>
  </div>

</template>

<script>
/* eslint-disable prefer-template */


import tmdb from '../tmdb';
import config from '../config';

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'search',
  computed: {
    results() {
      return this.$store.state.results.filter(x => x.poster_path);
    },
    watchlist() {
      return this.$store.state.watchlist;
    },
    isWatchlistOn() {
      return (this.searchType === 'watchlist');
    },
    isQuerySearch() {
      return (this.searchType === 'query');
    },
    isSearchListRoute() {
      return (!this.isWatchlistOn && !this.isQuerySearch);
    },
    movies() {
      return this.isWatchlistOn ? this.watchlist : this.results;
    },
    title() {
      return config.labels[this.searchType];
    },
    searchType() {
      return this.$route.params.type;
    },
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    getPoster(filename) {
      return config.url.poster + filename;
    },
    addToWatchlist(movie) {
      this.watchlist.push(movie);
      this.saveWatchList();
    },
    removeFromWatchlist(id) {
      const index = this.watchlist.findIndex(movie => movie.id === id);
      if (index > -1) {
        this.$store.state.watchlist.splice(index, 1);
        this.saveWatchList();
      }
    },
    saveWatchList() {
      const watchlistString = JSON.stringify(this.watchlist);
      localStorage.setItem(config.watchListKey, watchlistString);
    },
    isInWatchList(id) {
      return this.watchlist.find(movie => movie.id === id);
    },
    showRecommendations(id) {
      this.$router.push('/search/recommendations/' + id);
    },
  },
  watch: {
    $route(to) {
      if (this.isSearchListRoute) {
        tmdb.getSearchList(to.params.type, this.$route.params.id);
      }
    },
  },
  created() {
    tmdb.getSearchList('now');
  },
};
</script>
