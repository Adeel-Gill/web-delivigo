<template>
    <div>
        <div class="container">
            <div class="featured-restaurants">
                <h2><span class="glyphicon glyphicon-euro"></span> {{ titleHeading }}</h2>
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
            titleHeading: 'Featured Restautrants',
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
.restaurants-list{
    margin-bottom: 40px;
}
</style>
