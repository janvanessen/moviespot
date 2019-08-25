<template>
  <div id="app">

      <router-view/>

      <div class="footer">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
        <div class="version">{{version}}</div>
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
    };
  },
};
</script>
