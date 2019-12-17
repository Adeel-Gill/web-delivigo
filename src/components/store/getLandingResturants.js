import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const Restaurants = new Vuex.Store({
    state: {
        featured_restaurants: {},
        popular_near_restaurants: []
    },
    mutations : {

    },
    actions: {
        fetchFeaturedRestaurants() {
        }
    }
})
