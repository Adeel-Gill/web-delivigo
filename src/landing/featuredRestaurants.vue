<template>
    <div>
        <div class="container">
            <div class="featured-restaurants">
                <h2><span class="glyphicon glyphicon-euro"></span> {{ titleHeading }}</h2>
                <div class="show-more" v-if="featureMore">
                    <router-link to="/featured" >Show More</router-link>
                </div>
            </div>
            <div class="restaurants-list" v-if="notEmpty">
                    <restaurantsData v-for= "restaurant in featureData.slice(0,3)" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
        </div>
    </div>
</template>
<script>
import Restaurant from '../components/restaurant/restaurant.vue';
import emptyError from "../components/error/emptyError";
export default {
    components: {
        restaurantsData: Restaurant,
        appEmptyError: emptyError,
    },
    data(){
        return{
            titleHeading: 'Featured Restaurants',
            featureData: [],
            featureMore: false,
            notEmpty: true,
            count: 0,
        }
    },
    created() {
        console.log('featureCreated');
        this.$root.$on('featuredData', featuredRestaurants => {
            if(featuredRestaurants.length>0) {
                this.featureData = featuredRestaurants;
                if(featuredRestaurants.length > 3) {
                    this.featureMore = true;
                }
            } else {
                if(this.count === 0) {
                    this.notEmpty = false;
                    console.log('insideShow');
                    this.showNotification('error','Error','No featured restaurants available to show!');
                    this.count++;
                } else {
                    this.count++;
                }

            }
        })
    },
    methods: {
        showNotification(type, title, message) {
            console.log('insideShowFunction');
            this.$notify({
                group: 'foo',
                type: type,
                title: title,
                text: message,
                duration: 2000
            })
        }
    }
}
</script>
<style scoped>
.featured-restaurants h2{
    text-align: center;
    margin: 50px 0;
}
.show-more{
    text-align: right;
}
.show-more a {
    color: #0030b4;
    display: inline-block;
    margin: 10px 0 20px;
    /*font-family: "Panton";*/
    font-weight: 500;
    font-size: 17px;
}
.restaurants-list{
    margin-bottom: 40px;
}
</style>
