import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'runner',
      component: require('@/components/Runner').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
