<template>
    <div>
        <div class="container">
            <div v-if="notEmpty">
                <banner />
                <select-filter></select-filter>
                <popular />
                <catagories />
                <div class="restaurants-list" v-if="newNotEmpty">
                    <h2>{{titleHeading}}</h2>
                    <div class="show-more" v-if="newRestaurantsMore">
                        <router-link to="/newRestaurants">Show More</router-link>
                    </div>
                    <div class="clear"></div>
                    <div class="row">
                        <new-delivigo v-for= "newRestaurant in newRestaurants.slice(0,3)" :key="newRestaurant.Id" :newRestaurant='newRestaurant'></new-delivigo>
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
                        <new-delivigo v-for= "newRestaurant in allRestaurants.slice(0,3)" :key="newRestaurant.Id" :newRestaurant='newRestaurant'></new-delivigo>
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
import newDelivigo from './new/newdelivigo.vue';
import selectFilter from './select-options/filterSelect';
import popular from './popular'
import emptyError from "../error/emptyError";
import {fetchAllData} from "../api/Home";

export default {
    components:{
        Banner,
        Catagories,
        newDelivigo,
        selectFilter,
        popular,
        appEmptyError: emptyError
    },
    data(){
        return{
            newRestaurants : [],
            fetchedData: {},
            titleHeading:'NEW ON DELIVIGO',
            allRestaurants: [],
            newRestaurantsMore: false,
            allRestaurantsMore: false,
            notEmpty: true,
            newNotEmpty: true,
            allNotEmoty: true,
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
                fetchAllData().then(response => {
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
        margin: 10px 0 20px;
        font-family: "Panton";
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
.restaurants-list{
    margin-bottom: 40px;
}
.restaurants-list h2 {
    margin-bottom: 40px;
}
.title h2 {
    text-align: left !important;
}
</style>
