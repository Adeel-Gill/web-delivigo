import Home from './landing/index.vue';
import Login from './components/login/login.vue';
import Register from './components/register/register.vue';
import Filter from './components/filter/filter.vue';
import Selected from './components/selected restaurant/restaurant-select.vue'
import allRestaurants from "./components/All Restaurants/Restaurants";
import allPopularRestaurants from "./components/All Restaurants/PopularRestaurants";
import allFeaturedRestaurants from "./components/All Restaurants/FeaturedRestaurants";
import allNewRestaurants from "./components/All Restaurants/NewRestaurants";
import allFoodCategories from "./components/All Restaurants/FoodCategories";
import SelectedFoodRestaurants from "./components/All Restaurants/SelectedFoodRestaurants";
import Profile from "./components/User/Profile";
import Map from "./components/Map/Map"
export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/filter', component: Filter },
    { path: '/profile', component: Profile},
    { path: '/map/', component: Map},
    { path: '/restaurant/:id', component: Selected },
    {path: '/populars', component: allPopularRestaurants},
    {path: '/featured', component: allFeaturedRestaurants},
    {path: '/newRestaurants', component: allNewRestaurants},
    {path: '/restaurants', component: allRestaurants},
    {path: '/foodCategories', component: allFoodCategories},
    {path: '/foodFilter', component: SelectedFoodRestaurants}
]
