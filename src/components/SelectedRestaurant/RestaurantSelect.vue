<template>
    <div class="restaurnt-selected" >
        <banner />
        <div class="container-fluid">
            <div class="row pb-3">
                <div class="col-md-3 pr-3 popular">
<!--                    <popular-foods></popular-foods>-->
                </div>
                <div class="col-md-6 pl-3">
                    <restaurnt-name></restaurnt-name>
                </div>
                <!--                <div class="col-lg-3 col-md-3"></div>-->
            </div>
            <div class="row menu-sec justify-content-end">
                <div class="col-md-3">
                    <popular-foods></popular-foods>
                </div>
                <div class="col-md-6 float-right">
                    <dishes />
                </div>
                <div class="col-md-3 float-right">
                    <venue />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Banner from "./Cart";
    import Foods from "./PopularFood";
    import Name from "./RestaurantDetails";
    import Dishes from "./Dishes";
    import Venue from "./Venue";
    import {EventBus} from "../../main";
    import {fetchRestaurantById} from "../api/FilterRestaurants";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import {fetchRestaurantReviews} from "../api/Reviews";

    export default {
        data() {
            return {
                resId: null,
                loader: false,
                mealID: null,
            }
        },
        components:{
            Banner,
            popularFoods: Foods,
            restaurntName: Name,
            Dishes,
            Venue,


        },
        created() {
            // EventBus.$on('StartOverlay', response => {
            //     this.loader = response;
            //     console.log('StartOverlay'+this.loader);
            // })
        },
        mounted() {
            EventBus.$on('StartOverlay', response => {
                this.loader = response;
                console.log('StartOverlay'+this.loader);
            })
            this.changeHeader();
            this.resId = this.$route.params.id;
            console.log('queryData'+this.resId);
            this.fetchRestaurantData(this.resId);
        },
        destroyed() {
            this.unChangeHeader();
        },
        methods: {
            changeHeader() {
                this.$eventBus.$emit('checkComponent', 'selected');
            },
            unChangeHeader() {
                this.$eventBus.$emit('checkComponent', 'default');
            },
            async fetchRestaurantData(id) {
                fetchRestaurantById(id).then(response => {
                    fetchRestaurantReviews(1).then(response => {
                        this.$root.$emit('reviews',response);
                    })
                    this.$root.$emit('mealMenu', response.MealMenu);
                    this.$root.$emit('popularFood', response.Popular);
                    this.$root.$emit('restaurant', response.Restaurant);
                    this.$root.$emit('restaurantImages', response.RestaurantImagesURL);
                    this.$root.$emit('isCustomMeal', false);

                    console.log('restaurant',response.Restaurant);
                    if(localStorage.getItem('cart') === 'null' || localStorage.getItem('cart') == null) {
                        this.$store.dispatch('clearCart')
                    } else {
                        this.$store.dispatch('setCart', JSON.parse(localStorage.getItem('cart')));
                    }


                }, error => {
                    console.log(error);
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
            },
            async fetchRestaurantMealById(resId, mealId) {
                // fetchRestaurantMealsById(resId, mealId).then(response => {
                //     this.$root.$emit('mealMenuById',response.Meals);
                //     this.$root.$emit('isCustomMeal', true);
                // })
            }
        },

    }
</script>
<style scoped>
    *{
        font-family:'Roboto', sans-serif;
    }
    .clear{
        clear: both;
    }
    .menu-sec{
        position: relative;
        top: 125px;
        margin-bottom: 123px;
    }
    .popular{
        /*display: inline-block;*/
    }
    .container-fluid{
        padding:0 60px;
    }

    @media screen and (max-width: 960px)and (min-width: 901px) {
        .menu-sec{
            top: 77px;
        }
    }

    @media screen and (max-width: 901px) and (min-width: 863px) {
        .menu-sec{
            position: relative;
            top: 106px;
        }
    }
    @media screen and (max-width: 863px) and (min-width: 768px) {
        .menu-sec{
            position: relative;
            top: 141px;
        }
    }
    @media screen and (max-width: 768px) {
        .menu-sec{
            position: relative;
            top: 70px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
    @media screen and (max-width: 402px) and (min-width: 371px){
        .menu-sec{
            position: relative;
            top: 60px;
        }
    }
    @media screen and (max-width: 371px) and (min-width: 334px) {
        .menu-sec{
            position: relative;
            top: 93px;
        }
    }
    @media screen and (max-width: 334px) {
        .menu-sec{
            position: relative;
            top: 118px;
        }
    }
</style>
