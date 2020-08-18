<template>
    <div class="restaurnt-selected" >
        <banner :newLang= local :resDetail = restaurant />
        <div class="container-fluid">
            <div class="row pb-3">
                <div class="col-md-3 pr-3 popular">
                </div>
                <div class="col-md-6 pl-3">
                    <restaurnt-name :newLang= local> </restaurnt-name>
                </div>
            </div>
            <div class="row menu-sec justify-content-end">
                <div class="col-md-3">
                    <popular-foods :newLang= local ></popular-foods>
                </div>
                <div class="col-md-6 float-right">
                    <dishes :newLang= local />
                </div>
                <div class="col-md-3 float-right">
                    <venue :newLang= local />
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
    import {getCart} from "../api/Cart";
    import {EventBus} from "../../main";
    import {fetchRestaurantById} from "../api/FilterRestaurants";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import {fetchRestaurantReviews} from "../api/Reviews";
    import {lang} from "../lang/lang";
    export default {
        data() {
            return {
                resId: null,
                loader: false,
                mealID: null,
                local: lang.en,
                restaurant: null
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
             this.checkLang();
        EventBus.$on("changeLang", () => {
            this.checkLang();
        })
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
            checkLang() {
            console.log("hereItIs");
        var temp = localStorage.getItem("lang");
        if(temp == null || temp === "EN") {
          localStorage.setItem("lang", "EN");
          this.local = lang.en;
        } else if(temp === "FN" ) {
          this.local = lang.fn;
          localStorage.setItem("lang", "FN");
        } else {
          this.local = lang.sp;
          localStorage.setItem("lang", "ES");
        }
        // this.value = temp;
      },
            changeHeader() {
                localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
                this.$eventBus.$emit('checkComponent', 'selected');
            },
            unChangeHeader() {
                this.$eventBus.$emit('checkComponent', 'default');
            },
            async fetchRestaurantData(id) {
                fetchRestaurantById(id).then(response => {
                    fetchRestaurantReviews(id).then(response => {
                        this.$root.$emit('reviews',response.result);
                    })
                    getCart(localStorage.getItem('id')).then(response => {
                        if(!response.HasError) {
                            this.$root.$emit('cartItems', response.result);
                        } 
                    })
                    this.restaurant = response.result.Restaurant;
                    this.$root.$emit('mealMenu', response.result.MealMenu);
                    this.$root.$emit('popularFood', response.result.Popular);
                    this.$root.$emit('restaurant', response.result.Restaurant);
                    this.$root.$emit('tags', response.result.RestaurantTag);
                    this.$root.$emit('restaurantImages', response.result.RestaurantImagesURL);
                    this.$root.$emit('isCustomMeal', false);

                    console.log('restaurant',response.result.Restaurant);
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
        top: 145px;
        margin-bottom: 123px;
    }
    .popular{
        /*display: inline-block;*/
    }
    .container-fluid{
        padding:0 60px;
    }

    @media screen and (max-width: 1240px) and (min-width: 1150px) {
        .menu-sec{
            top: 170px;
        }
    }

    @media screen and (max-width: 1150px) and (min-width: 960px) {
        .menu-sec{
            top: 190px;
        }
    }

    @media screen and (max-width: 960px)and (min-width: 901px) {
        .menu-sec{
            top: 160px;
        }
    }

    @media screen and (max-width: 901px) and (min-width: 863px) {
        .menu-sec{
            position: relative;
            top: 150px;
        }
    }
    @media screen and (max-width: 863px) and (min-width: 768px) {
        .menu-sec{
            position: relative;
            top: 195px;
        }
    }
    @media screen and (max-width: 768px) and (min-width: 543px) {
        .menu-sec{
            position: relative;
            top: 70px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
    @media screen and (max-width: 543px) and (min-width: 402px) {
        .menu-sec{
            position: relative;
            top: 120px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
    @media screen and (max-width: 402px) and (min-width: 371px){
        .menu-sec{
            position: relative;
            top: 107px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
    @media screen and (max-width: 371px) and (min-width: 334px) {
        .menu-sec{
            position: relative;
            top: 93px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
    @media screen and (max-width: 334px) {
        .menu-sec{
            position: relative;
            top: 122px;
        }
        .container-fluid{
            padding:0 20px;
        }
    }
</style>
