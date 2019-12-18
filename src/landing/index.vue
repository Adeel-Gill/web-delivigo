<template>
    <div>
        <landing-banner></landing-banner>
        <popular-Restaurant  ></popular-Restaurant>
        <delivery-process></delivery-process>
        <featured-restaurants></featured-restaurants>
        <app-download></app-download>
    </div>
</template>
<script>

import Banner from './landingBanner.vue';
import Popular from './popularrestaurant.vue';
import Process from './delivery.vue';
import Featured from './featuredRestaurants.vue';
import Download from './appdownload.vue';
import {fetchResturantsData} from "../components/api/Landing";


export default {
    components:{
    landingBanner: Banner,
    popularRestaurant: Popular,
    deliveryProcess: Process,
    featuredRestaurants: Featured,
    appDownload: Download
    },
    data(){
        return {
            fearturedRestaurants: null,
            popularRestaurants: null
        }
    },
    methods: {
        async fetchResturantsData() {
            fetchResturantsData().then(response => {
                this.popularRestaurants = response.PopularNearYou;
                console.log('popularData'+ this.popularRestaurants);
                this.$root.$emit('popularData',this.popularRestaurants);
                this.featuredRestaurants = response.FeaturedRestaurants;
                this.$root.$emit('featuredData', this.featuredRestaurants);
            }, error =>{
                console.log(error);
            })
        }
    },
    created() {
        this.fetchResturantsData();
    }
}
</script>
