import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: 'input',
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
