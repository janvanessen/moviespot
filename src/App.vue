<template>
  <div id="app">

      <router-view/>

      <div class="footer" v-if="!isLoadingMovie">
        <div>
          <a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank">
            <img :src="`${publicPath}tmdb.png`" alt="TMDb Logo" class="tmdb-logo">
          </a>
        </div>
        <div class="version">
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </div>
        <div class="version">{{version}}&nbsp;&nbsp;Jan van Essen</div>
        <div>
          <a href="https://github.com/janvanessen/moviespot" target="_blank"><i class="fab fa-github fa-lg"></i></a>
        </div>
      </div>

  </div>
</template>

<script>

import config from './config';

export default {
  name: 'app',
  data() {
    return {
      version: config.version,
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    isLoadingMovie() {
      return this.$store.state.isLoadingMovie;
    },
  },
  methods: {
    loadWatchlist() {
      const savedWatchlist = localStorage.getItem(config.watchListKey);
      if (savedWatchlist) {
        try {
          this.$store.state.watchlist = JSON.parse(savedWatchlist);
        } catch (e) {
          localStorage.clear();
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    },
  },
  mounted() {
    this.loadWatchlist();
  },
};
</script>
