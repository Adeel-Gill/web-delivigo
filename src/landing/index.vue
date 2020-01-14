<template>
    <div v-if="">
        <landing-banner></landing-banner>
        <app-available-cities></app-available-cities>
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
import availableCities from "./availableCities";


export default {
    components:{
    landingBanner: Banner,
    popularRestaurant: Popular,
    deliveryProcess: Process,
    featuredRestaurants: Featured,
    appAvailableCities: availableCities,
    appDownload: Download,
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
        this.fetchResturantsData();
    }
}
</script>
