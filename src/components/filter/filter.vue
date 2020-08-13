<template>
    <div>
        <div class="container">
            <div v-if="notEmpty">
                <banner />
                <div class="filter-section">
                    <div v-if="isVisible" class="text-right clear-all">
                        <p @click="resetFilter">{{local.clearAll}}</p>
                    </div>
                    <div class="row">
                        <div class="col-12 col-sm-4">
                            <sort @callAPI = "callSortAPI" :key="resetCount" :newLang= local />
                        </div>
                        <div class="col-12 col-sm-4">
                            <food @callAPI = "callFoodAPI" :key="resetCount" :newLang= local />
                        </div>
                        <div class="col-12 col-sm-4">
                            <price @callAPI = "callAPI" :key="resetCount" :newLang= local />
                        </div>
                    </div>
                </div>
                <popular  :newLang= local />
                <catagories  :newLang= local />
                <div class="restaurants-list" v-if="newNotEmpty">
                    <h2>{{local.newOnDelivigo}}</h2>
                    <div class="show-more" v-if="newRestaurantsMore">
                        <router-link to="/newRestaurants">{{local.showMore}}</router-link>
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
                    <h2>{{local.allRestaurants}}</h2>
                    <div class="show-more"  v-if="allRestaurantsMore">
                        <router-link to="/restaurants">{{local.showMore}}</router-link>
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
import {EventBus} from "../../main";
import {lang} from "../lang/lang";
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
            resetCount: 0,
            foodName: '',
            isVisible: false,
            sort: null,
            local: lang.en,
            newCount: 0
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
        resetFilter() {
            this.min = 0;
            this.max = 0;
            this.foodName = '';
            this.sort = null;
            EventBus.$emit("resetFilter","");
            this.fetchAllData();
            this.checkLang();
            this.resetCount+= 1;
            this.isVisible = false;
        },
        callFoodAPI(food) {
          console.log(food);
          this.foodName = food.replace(/\s+/g, '');
          console.log("foodNameHere",this.foodName);
        //   this.foodName = this.food;
          this.fetchAllData();
          this.isVisible = true;
        },
        callSortAPI(sort) {
          console.log(sort);
          this.sort = sort;
          this.fetchAllData();
          this.isVisible = true;
        },
        callAPI(value) {
            console.log('here',value);
            this.min = value[0];
            this.max = value[1];
            console.log(this.min,this.max);
            this.fetchAllData();
            this.isVisible = true;
        },
        changeHeader() {
            localStorage.setItem("isAddress", "true");
            this.$emit("changeCounter",0);
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
                fetchAllData().then(response => {
                    if(response != null) {
                        this.fetchedData = response.result;
                        if(response.result.NewOpen.length>0) {
                            console.log('new');
                            this.newRestaurants = this.fetchedData.NewOpen;
                            if(this.newRestaurants.length > 3) {
                                this.newRestaurantsMore = true;
                            }
                        } else {
                            this.newNotEmpty = false;
                            this.showNotification('error','Error','No new restaurants are available to show');
                        }
                        if(response.result.Restaurant.length > 0) {
                            this.allRestaurants = this.fetchedData.Restaurant;
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
        },
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
        changeTheLang() {
            console.log("here InFilter");
            // this.fetchResturantsData();
            this.checkLang();
            EventBus.$emit("changeNewLang", "");
            // this.fetchAllData();
             this.newCount += 1;
            this.fetchedData = {};
            this.resetCount += 1;
            
        },
    },
    created() {
        this.fetchAllData();
        this.checkLang();
        EventBus.$on("changeLang", () => {
            this.changeTheLang();
        })
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
        font-weight: 500;
        font-size: 17px;
    }
    .clear-all p {
        color: #0030b4;
        display: inline-block;
        margin: 0 0 6px 0;
        cursor: pointer;
        /*font-family: "Panton";*/
        font-weight: 500;
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
    color: black;
}
.title h2 {
    text-align: left !important;
}
</style>
