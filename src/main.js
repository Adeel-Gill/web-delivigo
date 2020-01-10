import Vue from 'vue'
import * as firebase from 'firebase'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Axios from 'axios';

new Vue({
  vuetify,
})

Axios.defaults.baseURL = process.env.API_ENDPOINT;
Vue.use(BootstrapVue);
Vue.prototype.$eventBus = new Vue() // add this line of code

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router,
  created(){
    firebase.initializeApp({
    apiKey: "AIzaSyCNRnWELpgonNk5vliGxBWl-NtXt7l6WtQ",
    authDomain: "web-delivigo.firebaseapp.com",
    databaseURL: "https://web-delivigo.firebaseio.com",
    projectId: "web-delivigo",
    storageBucket: "web-delivigo.appspot.com",
    })
  }
}).$mount('#app')
