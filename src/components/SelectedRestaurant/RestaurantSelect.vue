<template>
    <div class="restaurnt-selected" >
        <banner />
        <div class="container">
            <div class="row">
                <div class="col-md-3 popular">
                    <popular-foods></popular-foods>
                </div>
                <div class="col-md-6">
                    <restaurnt-name></restaurnt-name>
                </div>
                <!--                <div class="col-lg-3 col-md-3"></div>-->
            </div>
            <div class="row menu-sec">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <dishes />
                </div>
                <div class="col-md-3">
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
    .menu-sec{
        position: relative;
        top: -20px;
    }
    .popular{
        /*display: inline-block;*/
    }
    @media screen and (max-width: 767px) {
        .popular{
            visibility:hidden;
        }
        .menu-sec{
            position: relative;
            top: -120px;
        }
    }
    @media screen and (max-width: 560px){
        .menu-sec{
            position: relative;
            top: -100px;
        }
    }
</style>
