/**
 * Created by SHENJO on 11/8/2017.
 */
import Vue from 'vue';
import router from './router';
import App from './App.vue';
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});