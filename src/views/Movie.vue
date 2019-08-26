<template>
  <div class="movie">
    <div v-if="details" class="container">

      <div class="row details-header">
        <div class="col-9">
          <router-link to="/" class="back-link">
            <small><i class="fas fa-chevron-left"></i> zurück</small>
          </router-link>
          <h1>{{details.title}}</h1>
          <h5>{{year}}</h5>
          <h5 v-if="details.runtime">{{details.runtime}}&nbsp;min</h5>
          <h5>
            <i class="fas fa-star"></i> {{details.vote_average}}
            <small>({{details.vote_count}})</small></h5>

          <h5><small>{{genres}}</small></h5>

        </div>
      </div>

      <div class="row">
        <div class="col-9">
          <img v-if="details.poster_path" :src="getPoster(details.poster_path)"
               :alt="details.title" class="poster-img">

          <img v-if="details.backdrop_path" :src="getBackdrop(details.backdrop_path)"
               :alt="details.title" class="backdrop-img">
        </div>
      </div>

      <div class="row">
        <div class="col-8 col-sm-12 overview">
          <h4 v-if="details.tagline" class="tagline">{{ details.tagline }}</h4>
          {{ details.overview }}
        </div>
      </div>

      <div class="row">
        <div class="col-9">
          <div v-for="video in videos" :key="video.key">
            <h6 class="video">{{video.name}}</h6>
            <!--suppress HtmlDeprecatedAttribute -->
            <iframe width="560" height="315" :src="getYoutubeLink(video.key)"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media;
          gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  name: 'movie',
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    details() {
      return this.$store.state.details;
    },
    videos() {
      const video = this.$store.state.videos;
      return video ? video.filter(x => x.site === 'YouTube') : [];
    },
    watchlist() {
      return this.$store.state.watchlist;
    },
    isWatchlistOn() {
      return (this.searchType === 'watchlist');
    },
    year() {
      const release = this.details.release_date;
      return release ? release.substring(0, 4) : '';
    },
    genres() {
      const genre = this.details.genres;
      if (!genre) {
        return '';
      }
      const list = genre.map(x => x.name);
      return list.join(', ');
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
    getBackdrop(filename) {
      return config.url.backdrop + filename;
    },
    getYoutubeLink(key) {
      // eslint-disable-next-line prefer-template
      return 'https://www.youtube.com/embed/' + key;
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
  created() {
    tmdb.getMovie(this.movieId, this.$store.state);
  },
};
</script>
