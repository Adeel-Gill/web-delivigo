<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list">
                <div class="row">
                    <restaurantsData v-for= "restaurant in restaurantsData" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Restaurant from '../components/restaurant/restaurant.vue';
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import {EventBus} from "../../main";

    export default {
        name: "allRestaurants",
        data(){
            return{
                titleHeading: 'Popular Restaurants',
                subHeading: 'The easiest way to your favourite food',
                restaurantsData: [],
                type : ''
            }
        },
        components: {
            restaurantsData: Restaurant
        },
        mounted() {
            this.type = this.$route.query.type;
            if(this.type === 'popular') {
                 EventBus.$on('popularData', popularRestaurants => {
                     this.restaurantsData = popularRestaurants;
                })
            }
            else if(this.type === 'featured') {
                this.titleHeading = 'Featured Restaurants';
                EventBus.$on('featuredData', featuredRestaurants => {
                    this.restaurantsData = featuredRestaurants;
                })
            }
        }
    }
</script>

<style scoped>
    .popular {
        margin: 50px 0;
    }
    .title{
        text-align: center;
        font-family: "Roboto";
        color: #080808;
    }
    .title h2{
        font-size: 35px;
        text-transform: uppercase;
    }
    .title p{
        font-size: 23px;
    }
</style>
