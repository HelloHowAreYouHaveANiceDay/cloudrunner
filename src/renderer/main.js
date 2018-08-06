import Vue from 'vue';
import axios from 'axios';
import 'bulma/css/bulma.css';
import { ipcRenderer } from 'electron';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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

library.add(faCoffee);
library.add(faCheck);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
