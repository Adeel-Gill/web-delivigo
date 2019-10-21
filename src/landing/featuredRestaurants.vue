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
import Restaurants from '../components/restaurant/restaurant.vue';
export default {
    components: {
        restaurantsData: Restaurants
    },
    data(){
        return{
            titleHeading: 'Featured Restautrants',
            restaurants:[
                {
                    id: 1,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
                {
                    id: 2,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-2.png'
                },
                {
                    id: 3,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
                {
                    id: 4,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
                {
                    id: 5,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-2.png'
                },
                {
                    id: 6,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
                {
                    id: 7,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
                {
                    id: 8,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-2.png'
                },
                {
                    id: 9,
                    name:'Jean-Georges',
                    description:'French/New American',
                    rating: '4.8 (127)',
                    waiting:'35-45 Mins',
                    imageURL:'./images/fr-1.png'
                },
            ]
            
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