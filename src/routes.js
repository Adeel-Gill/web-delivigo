import Home from './components/home.vue';
import Login from './components/login/login.vue';
import Register from './components/register/register.vue';


export const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    
]