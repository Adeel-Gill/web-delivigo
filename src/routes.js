import Home from './landing/index.vue';
import Filter from './components/filter/filter.vue';
import Selected from './components/SelectedRestaurant/RestaurantSelect'
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
// import Profile from "./components/User/Profile";
import profile2 from "./components/User/profile2";
import Map from "./components/Map/Map";
import checkout from "./components/SelectedRestaurant/Checkout";
import BillingAndPayments from "./components/User/BillingAndPayments";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import Login from "./components/LoginAndRegister/Login";
import SearchPhone from "./components/SearchAndReset/SearchPhone.vue";
import ResetPassword from "./components/SearchAndReset/ResetPassword.vue";
import OtpConfirm from "./components/SearchAndReset/OtpConfirm.vue";
import Register from "./components/LoginAndRegister/Register";
import OrderTracking from "./components/Order/OrderTracking";
import DiamondAward from "./components/User/DiamondAward";
import AllCities from "./components/All Cities/AllCities";
import Discount from "./components/User/Discount";
import LegalDoc from "./Legal/Legal"
// import CurrentOrder from "./components/Order/CurrentOrder";
// import PreviousOrder from "./components/Order/PreviousOrder";
import currentOrder from "./components/User/currentOrder";
import previousOrder from "./components/User/previousOrder";
import Policy from "./components/Documents/Policy";
import TermsAndConditions from "./components/Documents/TermsAndConditions";
import Cookies from "./components/Documents/Cookies";
import Legal from "./components/User/Legal";
import newPolicy from "./components/Documents/newDocuments/Policy";
import newTermsAndConditions from "./components/Documents/newDocuments/TermsAndConditions";
import newCookies from "./components/Documents/newDocuments/Cookies";
import MobilePolicy from "./Documents/Policy";
import MobileTermsAndConditions from "./Documents/TermsAndConditions";
import MobileCookies from "./Documents/Cookies";
import newError from "./components/error/newErrorPage";
export const routes = [
    { path: '/', component: Home },
    { path: '/loginandreg', component: LoginAndRegister, children: [
            { path: '/signin', component: Login, beforeEnter(to, from, next) {
                    console.log('signin',localStorage.getItem('token'));
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
                        next('/');
                    } else {
                        next();
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
        { path: '/searchPhone', component: SearchPhone, beforeEnter(to, from, next) {
            console.log('searchPhone',localStorage.getItem('token'));
            if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
                next('/');
            } else {
                next();
            }
        }},
        { path: '/confirmOtp', component: OtpConfirm, beforeEnter(to, from, next) {
            console.log('confirmOtp',localStorage.getItem('token'));
            if(localStorage.getItem('isRegOtp') && localStorage.getItem('isRegOtp') !== 'null') {
                next();
            } else {
                next('/');
            }
        }},
        { path: '/resetPassword', component: ResetPassword, beforeEnter(to, from, next) {
            console.log('confirmOtp',localStorage.getItem('token'));
            if(localStorage.getItem('isRegOtp') && localStorage.getItem('isRegOtp') !== 'null') {
                next();
            } else {
                next('/');
            }
        }},
    { path: '/filter', component: Filter },
    {path : '/filter/{id}', component: Filter},

    { path: '/user', component: User, children: [
            { path: '/profile', component: profile2,
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
            { path: '/orderHistory', component: OrderHistory, children: [
                    {path : '/currentOrder', component: currentOrder},
                    {path: '/previousOrder', component: previousOrder}
                ] ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
            { path: '/discount', component: Discount ,
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
            { path: '/legal', component: Legal, children: [
                    {path: '/privacy', component: Policy, query: {docType: 'p'}},
                    {path: '/terms', component: TermsAndConditions, query: {docType: 't'}},
                    {path: '/cookies', component: Cookies, query: {docType: 'c'}},

                ] ,
                beforeEnter(to, from, next) {
                    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                        next();
                    } else {
                        next('/');
                    }
                }},
        ]},
    { path : '/track', component: OrderTracking,
        beforeEnter(to, from, next) {
            if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
                next();
            } else {
                next('/');
            }
        }},
    { path: '/map/', component: Map},
    { path: '/restaurant/:id', component: Selected },
    {path: '/populars', component: allPopularRestaurants},
    {path: '/featured', component: allFeaturedRestaurants},
    {path: '/allCities', component: AllCities},
    {path: '/newRestaurants', component: allNewRestaurants},
    {path: '/restaurants', component: allRestaurants},
    {path: '/foodCategories', component: allFoodCategories},
    {path: '/foodFilter', component: SelectedFoodRestaurants},
    {path: '/orderTracking', component: checkout,
    beforeEnter(to, from, next) {
        if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
            next();
        } else {
            next('/');
        }
    }},
    { path: '/documents', component: LegalDoc, children: [
            {path: '/privacyPolicy', component: MobilePolicy, query: {docType: 'p'}},
            {path: '/termsAndConditions', component: MobileTermsAndConditions, query: {docType: 't'}},
            {path: '/cookiesDoc', component: MobileCookies, query: {docType: 'c'}},

        ]},
        {path: '/newPolicy', component: newPolicy, query: {docType: 'p'}},
        {path: '/newTerms', component: newTermsAndConditions, query: {docType: 't'}},
        {path: '/newCookies', component: newCookies, query: {docType: 'c'}},
        {path: '/newError', component: newError}

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

