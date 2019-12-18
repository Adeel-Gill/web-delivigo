<template>
    <div>
        <div class="container">
            <banner />
            <select-filter></select-filter>
            <popular />
            <catagories />
            <div class="restaurants-list">
                <h2>{{titleHeading}}</h2>
                <div class="row">
                    <new-delivigo v-for= "newRestaurant in newRestaurants" :key="newRestaurant.Id" :newRestaurant='newRestaurant'></new-delivigo>
                </div>
            </div>
            <div class="restaurants-list">
                <h2>{{titleHeading}}</h2>
                <div class="row">
                    <new-delivigo v-for= "newRestaurant in newRestaurants.slice(0,3)" :key="newRestaurant.Id" :newRestaurant='newRestaurant'></new-delivigo>
                </div>
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
import {fetchAllData} from "../api/Home";

export default {
    components:{
        Banner,
        Catagories,
        newDelivigo,
        selectFilter,
        popular
    },
    data(){
        return{
            newRestaurants : [],
            fetchedData: {},
            titleHeading:'NEW ON DELIVIGO'

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
                    this.fetchedData = response;
                    this.newRestaurants = this.fetchedData.NewOpen;
                    this.$root.$emit('popularData', this.fetchedData.PopularNearYou);
                    this.$root.$emit('foodCategoriesData', this.fetchedData.FoodCategories);
                })
        }
    },
    created() {
        this.fetchAllData();
    }
}
</script>
<style scoped>
.container{
    max-width: 1045px;
}
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
