import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
})
export const baseAddress = 'https://www.foodizza.com/';
export const EventBus = new Vue();
Vue.use(BootstrapVue);
Vue.prototype.$eventBus = new Vue() // add this line of code

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
