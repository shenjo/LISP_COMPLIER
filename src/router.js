/**
 * Created by SHENJO on 11/8/2017.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Hello from './hello.vue';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history'
});

const routes = [{
  path: '/',
  name: 'Hello',
  component: Hello
}];

router.addRoutes(routes);

export default router;