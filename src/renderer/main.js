import Vue from 'vue';
import axios from 'axios';
import 'bulma/css/bulma.css';
import { ipcRenderer } from 'electron';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) {
  console.log('not web');
  Vue.use(require('vue-electron'));
  ipcRenderer.on('main-log', (event, arg) => {
    console.log(arg);
  });
}
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
