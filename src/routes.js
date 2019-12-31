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
import DeliveryAddress from "./components/User/DeliveryAddress";
import DiamondAward from "./components/User/DiamondAward";
import Support from "./components/User/Support";
import Profile from "./components/User/Profile";
import Map from "./components/Map/Map";
import BillingAndPayments from "./components/User/BillingAndPayments";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import Login from "./components/LoginAndRegister/Login";
import Register from "./components/LoginAndRegister/Register";
export const routes = [
    { path: '/', component: Home },
    {
        path: '/loginandreg',
        component: LoginAndRegister,
        children: [
            { path: '/signin', component: Login },
            { path: '/signup', component: Register },
        ]
    },
    { path: '/filter', component: Filter },
    {
        path: '/user',
        component: User,
        children: [
            { path: '/profile', component: Profile },
            { path: '/delivery', component: DeliveryAddress },
            { path: '/diamond', component: DiamondAward },
            { path: '/billing', component: BillingAndPayments },
            { path: '/support', component: Support },
        ]
    },
    { path: '/map/', component: Map },
    { path: '/restaurant/:id', component: Selected },
    { path: '/populars', component: allPopularRestaurants },
    { path: '/featured', component: allFeaturedRestaurants },
    { path: '/newRestaurants', component: allNewRestaurants },
    { path: '/restaurants', component: allRestaurants },
    { path: '/foodCategories', component: allFoodCategories },
    { path: '/foodFilter', component: SelectedFoodRestaurants }
]