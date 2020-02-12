<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{foodCategoryName + titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list" v-if="notEmpty">
                <div class="row">
                    <restaurantsData v-for= "restaurant in restaurantsData" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
        </div>
    </div>
</template>

<script>
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import {fetchRestaurantsByCategory} from "../api/FilterRestaurants";
    import {EventBus} from "../../main";
    import emptyError from "../error/emptyError";

    export default {
        name: "SelectedFoodRestaurants",
        data(){
            return{
                titleHeading: ' Food Restaurants',
                subHeading: 'The easiest way to your favourite food',
                restaurantsData: [],
                foodCategoryName: '',
                notEmpty: true,

            }
        },
        components: {
            restaurantsData: Restaurant,
            appEmptyError: emptyError
        },
        methods: {
            async fetchRestaurantsByCategoryName(name) {
                console.log('name1 : '+name);
                fetchRestaurantsByCategory(name).then(response => {
                    console.log('name2 : '+name);
                    if(response.Restaurants.length>0) {
                        this.restaurantsData = response.Restaurants;
                    } else {
                        this.notEmpty = false;
                        this.showNotification('error','Error','No restaurants available for that food category!');
                    }

                }, error => {
                    console.log(error);
                    this.notEmpty = false;
                    this.showNotification('error','Error','Error occurred please try later!');
                })
            },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
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
        /*font-family: "Roboto";*/
        color: #080808;
    }
    .title h2{
        font-size: 35px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .title p{
        font-size: 23px;
    }
</style>
