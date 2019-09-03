import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Movie from './views/Movie.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/search/now',
    },
    {
      path: '/search/:type/:id?',
      name: 'search',
      component: Home,
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: Movie,
    },
  ],
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
