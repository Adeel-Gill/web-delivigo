import Home from './landing/index.vue';
import Login from './components/login/login.vue';
import Register from './components/register/register.vue';
import Filter from './components/filter/filter.vue';
import Selected from './components/selected restaurant/restaurant-select.vue'
import allRestaurants from "./components/All Restaurants/allRestaurants";
export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/filter', component: Filter },
    { path: '/selected', component: Selected },
    { path: '/showAll', component: allRestaurants },

]
