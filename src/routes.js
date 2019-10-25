import Home from './landing/index.vue';
import Login from './components/login/login.vue';
import Register from './components/register/register.vue';
import Filter from './components/filter/filter.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/filter', component: Filter },
]