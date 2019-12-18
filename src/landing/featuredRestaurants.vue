<template>
    <div>
        <div class="container">
            <div class="featured-restaurants">
                <h2><span class="glyphicon glyphicon-euro"></span> {{ titleHeading }}</h2>
                <div class="show-more">
                    <router-link to="/featured" >Show More</router-link>
                </div>
            </div>
            <div class="restaurants-list">
                <div class="row">
                    <restaurantsData v-for= "restaurant in featureData.slice(0,9)" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Restaurant from '../components/restaurant/restaurant.vue';

export default {
    components: {
        restaurantsData: Restaurant
    },
    data(){
        return{
            titleHeading: 'Featured Restaurants',
            featureData: []
        }
    },
    mounted() {
        this.$root.$on('featuredData', featuredRestaurants => {
            this.featureData = featuredRestaurants
        })
    }
}
</script>
<style scoped>
.featured-restaurants h2{
    text-align: center;
    margin: 50px 0;
}
.show-more{
    float: right;
}
.show-more a {
    color: #0030b4;
    display: inline-block;
    margin: 10px 0 20px;
    font-family: "Panton";
    font-weight: bold;
    font-size: 17px;
}
.restaurants-list{
    margin-bottom: 40px;
}
</style>
