<template>
    <div>
        <div class="container">
            <div class="featured-restaurants">
                <h2><span class="glyphicon glyphicon-euro"></span> {{ titleHeading }}</h2>
            </div>
            <div class="restaurants-list">
                <div class="row">
                    <restaurantsData v-for= "restaurant in restaurants" :key="restaurant.id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Restaurant from '../components/restaurant/restaurant.vue';
import Restaurants from '../components/restaurant/restaurants'
export default {
    components: {
        restaurantsData: Restaurant
    },
    data(){
        return{
            titleHeading: 'Featured Restautrants',
            restaurants: Restaurants
        }
    }
}
</script>
<style scoped>
.featured-restaurants h2{
    text-align: center;
    margin: 50px 0;
}
.restaurants-list{
    margin-bottom: 40px;
}
</style>