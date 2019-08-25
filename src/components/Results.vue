<template>
  <div>
    <div>
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="gallery">
      <div class="gallery-panel"
           v-for="movie in movies" :key="movie.id">
        <img :src="getPosterImg(movie.poster_path)" :alt="movie.title" class="poster-img image">

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

      </div>
    </div>
  </div>

</template>

<script>

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
    searchType() {
      return this.$store.state.searchType;
    },
    isWatchlistOn() {
      return (this.searchType === 'watchlist');
    },
    movies() {
      return this.isWatchlistOn ? this.watchlist : this.results;
    },
    title() {
      return config.labels[this.searchType];
    },
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    setSearchType(type) {
      this.$store.commit('updateSearchType', { type });
    },
    getPosterImg(filename) {
      return config.url.img + filename;
    },
    addToWatchlist(movie) {
      this.$store.state.watchlist.push(movie);
    },
    removeFromWatchlist(id) {
      const index = this.$store.state.watchlist.findIndex(movie => movie.id === id);
      if (index > -1) {
        this.$store.state.watchlist.splice(index, 1);
      }
    },
    showRecommendations(id) {
      this.setSearchType('recommendations');
      tmdb.getRecommendations(id, this.$store.state);
    },
    isInWatchList(id) {
      return this.$store.state.watchlist.find(movie => movie.id === id);
    },
  },
};
</script>
