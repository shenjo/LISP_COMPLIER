/**
 * Created by SHENJO on 11/8/2017.
 */
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App },
  render: h => h(App)
});