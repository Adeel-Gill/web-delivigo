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
    import {fetchResturantsData} from "../api/Landing";
    import Restaurant from '../../components/restaurant/restaurant.vue';

    export default {
        name: "allPopularRestaurants",
        data() {
            return {
                restaurantsData: [],
                titleHeading: 'All Popular Restaurants',
                subHeading: 'The easiest way to your favourite food',
            }
        },
        components: {
            restaurantsData: Restaurant
        },
        methods: {
            fetchAllData() {
                fetchResturantsData().then(response => {
                    this.restaurantsData = response.PopularNearYou;
                })
            }
        },
        mounted() {
            this.fetchAllData();
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
