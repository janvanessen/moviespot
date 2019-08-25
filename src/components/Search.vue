<template>
  <div>
    <h1 @click="showNowPlaying" class="brand">{{ title }}</h1>

    <div class="container">

      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-6">

          <div class="form-group search-group">
            <input v-model="query" @keyup="search"
                   class="form-control form-control-lg search-input"
                   autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                   placeholder="Search for a movie" type="search">
          </div>
          {{$store.searchQuery}}
          <div>
            <span @click="showNowPlaying" class="link">
              {{ labels.now }}
            </span>&nbsp;&nbsp;
            <span @click="showUpcoming" class="link">
              {{ labels.upcoming }}
            </span>&nbsp;&nbsp;
            <span @click="showTopRated" class="link">
              {{ labels.top }}
            </span>&nbsp;&nbsp;
            <span @click="showPopular" class="link">
              {{ labels.popular }}
            </span>&nbsp;&nbsp;
            <span @click="showWatchlist" class="link" v-if="watchlist.length > 0" >
              {{ labels.watchlist }}
              <span class="badge badge-watchlist">{{ watchlist.length }}</span>
            </span>

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
  props: {
    title: String,
  },
  computed: {
    query: {
      get() {
        return this.$store.state.searchQuery;
      },
      set(query) {
        this.$store.commit('updateSearchQuery', { query });
      },
    },
    watchlist() {
      return this.$store.state.watchlist;
    },
    labels() {
      return config.labels;
    },
    results() {
      return this.$store.state.results.filter(x => x.poster_path);
    },
  },
  methods: {
    setSearchType(type) {
      this.$store.commit('updateSearchType', { type });
    },
    search() {
      this.setSearchType('search');
      tmdb.search(this.$store.state.searchQuery, this.$store.state);
    },
    showNowPlaying() {
      this.setSearchType('now');
      tmdb.getNowPlaying(this.$store.state);
    },
    showPopular() {
      this.setSearchType('popular');
      tmdb.getPopular(this.$store.state);
    },
    showTopRated() {
      this.setSearchType('top');
      tmdb.getTopRated(this.$store.state);
    },
    showUpcoming() {
      this.setSearchType('upcoming');
      tmdb.getUpcoming(this.$store.state);
    },
    showWatchlist() {
      this.setSearchType('watchlist');
    },
  },
  created() {
    if (this.results.length === 0) {
      this.showNowPlaying();
    }
  },
};
</script>
