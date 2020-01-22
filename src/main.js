import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VShowSlide from 'v-show-slide'
import {UserInfo} from "./components/store/UserInfo";
import Notification from 'vue-notification';
import VuejsDialog from 'vuejs-dialog';
import {DrawerLayout} from 'vue-drawer-layout'
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

new Vue({
  vuetify,
})
export const baseAddress = 'https://www.foodizza.com/';
export const defaultUserPic = 'images/userpic.png';
export const defaultRestaurantPic = 'images/restauranticon.png';
export const defaultDishPic = 'images/dish.png';
export const defaultCityPic = 'images/city.png'
export let map ;
export const EventBus = new Vue();
Vue.use(VuejsDialog);
Vue.use(VShowSlide);
Vue.use(BootstrapVue);
Vue.use(Notification);
Vue.component(DrawerLayout.name, DrawerLayout);
Vue.prototype.$eventBus = new Vue(); // add this line of code
Vue.prototype.$store = UserInfo;
Vue.use(VueRouter);
// Vue.forceUpdate();
const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition;
    }
    if(to.hash) {
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  }
});
new Vue({
  render: h => h(App),
  UserInfo,
  router
}).$mount('#app')
