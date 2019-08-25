<template>
  <div class="home">
    <Search title="MovieSpot" class="search"/>
    <Results class="results"/>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import Results from '@/components/Results.vue';

export default {
  name: 'home',
  components: {
    Search,
    Results,
  },
};
</script>
