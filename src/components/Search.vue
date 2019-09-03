<template>
  <div>
    <router-link to="/"><h1 class="brand">{{ title }}</h1></router-link>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-6">
          <div class="form-group search-group">
            <input v-model="query" v-debounce:300ms="search"
                   class="form-control form-control-lg search-input"
                   autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                   placeholder="Search for a movie" type="search">
          </div>
          {{$store.searchQuery}}
          <div>
            <router-link to="/search/now" class="menu-link">
              {{ labels.now }}
            </router-link>&nbsp;&nbsp;
            <router-link  to="/search/upcoming" class="menu-link">
              {{ labels.upcoming }}
            </router-link>&nbsp;&nbsp;
            <router-link  to="/search/top" class="menu-link">
              {{ labels.top }}
            </router-link>&nbsp;&nbsp;
            <router-link to="/search/popular" class="menu-link">
              {{ labels.popular }}
            </router-link>&nbsp;&nbsp;
            <router-link  to="/search/watchlist" class="menu-link"
                          v-if="watchlist.length > 0" >
              {{ labels.watchlist }}
              <span class="badge badge-watchlist">{{ watchlist.length }}</span>
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import config from '../config';
import tmdb from '../tmdb';

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
        this.updateSearchQuery(query);
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
    searchQuery() {
      return this.$store.state.searchQuery;
    },
    searchType() {
      return this.$route.params.type;
    },
    isQuerySearch() {
      return (this.searchType === 'query');
    },
  },
  methods: {
    search() {
      if (this.searchType !== 'query') {
        this.$router.push('/search/query');
      }
      // if search query is empty, show 'Now Playing'
      if (this.searchQuery.length === 0) {
        this.$router.push('/search/now');
      } else {
        tmdb.search(this.searchQuery);
      }
    },
    updateSearchQuery(query) {
      this.$store.commit('updateSearchQuery', { query });
    },
  },
  watch: {
    $route() {
      // clear search input for all queries except /search/query
      if (!this.isQuerySearch) {
        this.updateSearchQuery('');
      }
    },
  },
};
</script>
