<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{foodCategoryName + titleHeading}}</h2>
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
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import {fetchRestaurantsByCategory} from "../api/FilterRestaurants";
    import {EventBus} from "../../main";

    export default {
        name: "SelectedFoodRestaurants",
        data(){
            return{
                titleHeading: ' Food Restaurants',
                subHeading: 'The easiest way to your favourite food',
                restaurantsData: [],
                foodCategoryName: ''

            }
        },
        components: {
            restaurantsData: Restaurant
        },
        methods: {
            async fetchRestaurantsByCategoryName(name) {
                console.log('name1 : '+name);
                fetchRestaurantsByCategory(name).then(response => {
                    console.log('name2 : '+name);
                    this.restaurantsData = response.Restaurants;
                })
            }
        },
        mounted() {
            EventBus.$on('foodCategoryName', data => {
                this.foodCategoryName = data;
                console.log('data '+ this.foodCategoryName);
                this.fetchRestaurantsByCategoryName(this.foodCategoryName);
            });

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
