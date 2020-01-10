import Home from './landing/index.vue';
import Login from './components/login/login.vue';
import Register from './components/register/register.vue';
import Filter from './components/filter/filter.vue';
import Restaurants from './components/restaurant/allRestaurants';
import Selected from './components/selected restaurant/restaurant-select.vue'

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/filter', component: Filter },
    { path: '/all.restaurants', component: Restaurants },
    { path: '/selected', component: Selected },
]