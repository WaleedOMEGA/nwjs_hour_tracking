import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  router,
  store,

  render: function (hyperscript) {
    return hyperscript(App);
  }
}).$mount('#app');
