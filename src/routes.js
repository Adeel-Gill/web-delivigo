import Home from './landing/index.vue';
import Filter from './components/filter/filter.vue';
import Selected from './components/selected restaurant/restaurant-select.vue'
import allRestaurants from "./components/All Restaurants/Restaurants";
import allPopularRestaurants from "./components/All Restaurants/PopularRestaurants";
import allFeaturedRestaurants from "./components/All Restaurants/FeaturedRestaurants";
import allNewRestaurants from "./components/All Restaurants/NewRestaurants";
import allFoodCategories from "./components/All Restaurants/FoodCategories";
import SelectedFoodRestaurants from "./components/All Restaurants/SelectedFoodRestaurants";
import User from "./components/User/User";
import {UserInfo} from "./components/store/UserInfo";
import DeliveryAddress from "./components/User/DeliveryAddress";
import OrderHistory from "./components/User/Order History";
import Support from "./components/User/Support";
import Profile from "./components/User/Profile";
import Map from "./components/Map/Map";
import checkout from "./components/selected restaurant/checkout";
import BillingAndPayments from "./components/User/BillingAndPayments";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import Login from "./components/LoginAndRegister/Login";
import Register from "./components/LoginAndRegister/Register";
import OrderTracking from "./components/Order/OrderTracking";
import DiamondAward from "./components/User/DiamondAward";
import AllCities from "./components/All Cities/AllCities";
export const routes = [
    { path: '/', component: Home },
    { path: '/loginandreg', component: LoginAndRegister, children: [
            { path: '/signin', component: Login, beforeEnter(to, from, next) {
                    console.log('signin',localStorage.getItem('token'));
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
                        next('/');
                    } else {
                        next()
                    }
                } },
            { path: '/signup', component: Register, beforeEnter(to, from, next) {
                    console.log('signup',localStorage.getItem('token'));
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
                        next('/');
                    } else {
                        next();
                    }
                }},
        ], beforeEnter(to, from, next) {
            console.log('loginandreg',localStorage.getItem('token'));
            if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
                next('/');
            } else {
                next()
            }
        }},
    { path: '/filter', component: Filter },
    { path: '/user', component: User, children: [
            { path: '/profile', component: Profile,
                beforeEnter(to, from, next) {
                console.log('routeResult', localStorage.getItem('token'));
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                } },
            { path: '/delivery', component: DeliveryAddress ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
            { path: '/orderHistory', component: OrderHistory ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
            { path: '/diamond', component: DiamondAward ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
            { path: '/billing', component: BillingAndPayments ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
            { path: '/support', component: Support ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
        ], beforeEnter(to, from, next) {
            if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                next();
            } else {
                next('/');
            }
        }},
    { path : '/track', component: OrderTracking},
    { path: '/map/', component: Map},
    { path: '/restaurant/:id', component: Selected },
    {path: '/populars', component: allPopularRestaurants},
    {path: '/featured', component: allFeaturedRestaurants},
    {path: '/allCities', component: AllCities},
    {path: '/newRestaurants', component: allNewRestaurants},
    {path: '/restaurants', component: allRestaurants},
    {path: '/foodCategories', component: allFoodCategories},
    {path: '/foodFilter', component: SelectedFoodRestaurants},
    {path: '/checkout', component: checkout}
]
function checkLoginRoute() {
    if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== '') {
        return true;
    } else {
       return false;
    }
}
function checkLogoutRoute() {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        return true;
    } else {
       return false;
    }
}

