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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
