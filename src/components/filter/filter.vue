<template>
    <div>
        <div class="container">
            <div v-if="notEmpty">
                <banner />
                <div class="filter-section">
                    <div class="row">
                        <div class="col-12 col-sm-4">
                            <sort @callAPI = "callSortAPI" />
                        </div>
                        <div class="col-12 col-sm-4">
                            <food @callAPI = "callFoodAPI" />
                        </div>
                        <div class="col-12 col-sm-4">
                            <price @callAPI = "callAPI"/>
                        </div>
                    </div>
                </div>
                <popular />
                <catagories />
                <div class="restaurants-list" v-if="newNotEmpty">
                    <h2>{{titleHeading}}</h2>
                    <div class="show-more" v-if="newRestaurantsMore">
                        <router-link to="/newRestaurants">Show More</router-link>
                    </div>
                    <div class="clear"></div>
                    <div class="row">
                        <div class="owl-carousel owl-theme">
                            <new-delivigo v-for= "newRestaurant in newRestaurants" :key="newRestaurant.Id" :restaurant='newRestaurant'></new-delivigo>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <app-empty-error></app-empty-error>
                </div>
                <div class="restaurants-list" v-if="allNotEmoty">
                    <h2>All Restaurants</h2>
                    <div class="show-more" v-if="allRestaurantsMore">
                        <router-link to="/restaurants">Show More</router-link>
                    </div>
                    <div class="clear"></div>
                    <div class="row">
                         <div class="owl-carousel owl-theme">
                            <new-delivigo v-for= "newRestaurant in allRestaurants" :key="newRestaurant.Id" :restaurant='newRestaurant'></new-delivigo>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <app-empty-error></app-empty-error>
                </div>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
        </div>
    </div>
</template>
<script>
import Banner from './filterBanner.vue';
import Catagories from './catagories.vue';
// import newDelivigo from './new/newdelivigo.vue';
import restaurant from '../restaurant/resturant-slider';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import 'jquery';
import popular from './popular';
import sort from "./select-options/sort";
import food from "./select-options/food";
import price from "./select-options/price";
import emptyError from "../error/emptyError";
import {fetchAllData} from "../api/Home";

export default {
    components:{
        Banner,
        Catagories,
        newDelivigo : restaurant,
        popular,
        sort,
        food,
        price,
        appEmptyError: emptyError
    },
    data(){
        return{
            newRestaurants : [],
            fetchedData: {},
            titleHeading:'New On Delivigo',
            allRestaurants: [],
            newRestaurantsMore: false,
            allRestaurantsMore: false,
            notEmpty: true,
            newNotEmpty: true,
            allNotEmoty: true,
            city: '',
            longitude: '',
            latitude: '',
            min: 0,
            max: 0,
            foodName: '',
            sort: null,
        }
    },
    mounted() {
      this.changeHeader();
      this.changeFooter();
      
    },
    destroyed() {
        this.unChangeHeader();
        this.unChangeFooter();
    },
    methods: {
        callFoodAPI(food) {
          console.log(food);
          this.food = food.replace(/\s+/g, '');
          this.fetchAllData();
        },
        callSortAPI(sort) {
          console.log(sort);
          this.sort = sort;
          this.fetchAllData();
        },
        callAPI(value) {
            console.log('here',value);
            this.min = value[0];
            this.max = value[1];
            console.log(this.min,this.max);
            this.fetchAllData();
        },
            changeHeader() {
      this.$eventBus.$emit('checkComponent', 'filter');
        },
            unChangeHeader() {
      this.$eventBus.$emit('checkComponent', 'default');
        },
        changeFooter(){
            this.$eventBus.$emit('checkFooter', 'footer');
        },
        unChangeFooter(){
            this.$eventBus.$emit('checkFooter', 'default');
        },
        async fetchAllData() {
                this.city = this.$route.query.city;
                this.longitude = this.$route.query.longitude;
                this.latitude = this.$route.query.latitude;
                console.log(this.min,this.max);
                fetchAllData(this.city,this.longitude,this.latitude,this.min,this.max,this.sort,this.food).then(response => {
                    if(response != null) {
                        this.fetchedData = response;
                        if(response.NewOpen.length>0) {
                            this.newRestaurants = this.fetchedData.NewOpen;
                            if(this.newRestaurants.length > 3) {
                                this.newRestaurantsMore = true;
                            }
                        } else {
                            this.newNotEmpty = false;
                            this.showNotification('error','Error','No new restaurants are available to show');
                        }
                        if(response.Restaurants.length > 0) {
                            this.allRestaurants = this.fetchedData.Restaurants;
                            if(this.allRestaurants.length > 3) {
                                this.allRestaurantsMore = true;
                                $(document).ready(function(){
                                    $('.owl-carousel').owlCarousel({
                                        loop:true,
                                        dots: false,
                                        autoplay:true,
                                        autoplayTimeout:2000,
                                        autoplayHoverPause:true,
                                        responsiveClass:false,
                                        margin:10,
                                        nav:false,
                                        lazyLoad:true,
                                        responsive:{
                                            0:{
                                                items:1
                                            },
                                            600:{
                                                items:2
                                            },
                                            1000:{
                                                items:3
                                            }
                                        }
                                    });
                                });
                            }
                        } else {
                            this.allNotEmoty = false;
                            this.showNotification('error','Error','No restaurants are available to show');
                        }
                        this.$root.$emit('popularData', this.fetchedData.PopularNearYou);
                        this.$root.$emit('foodCategoriesData', this.fetchedData.FoodCategories);
                    } else {
                        this.notEmpty = false;
                        this.showNotification('error','Error','No data of filter restaurants is available to show!')
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
    created() {
        this.fetchAllData();
    }
}
</script>
<style scoped>
    .show-more{
        float: right;
    }
    .show-more a {
        color: #0030b4;
        display: inline-block;
        margin: 0 0 20px;
        /*font-family: "Panton";*/
        font-weight: bold;
        font-size: 17px;
    }
/*.container{*/
/*    max-width: 1045px;*/
/*}*/
.featured-restaurants h2{
    text-align: center;
    margin: 50px 0;
}
    .filter-section {
        padding: 20px 0 20px 0;
        width: 90%;
        margin: auto;
    }
.restaurants-list{
    margin-bottom: 40px;
}
.restaurants-list h2 {
    font-size: 32px;
    font-weight: 500;
    text-transform: capitalize;
}
.title h2 {
    text-align: left !important;
}
</style>
