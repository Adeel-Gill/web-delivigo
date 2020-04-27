<template>
    <div v-if="">
        <landing-banner @updateTheCounter="emitCounter" :key = newCount :newLang= local></landing-banner>
        <app-available-cities :key="newCount" :newLang= local></app-available-cities>
<!--        <popular-Restaurant  ></popular-Restaurant>-->
        <delivery-process></delivery-process>
<!--        <featured-restaurants></featured-restaurants>-->
        <app-what-is-delivigo :newLang= local :key="newCount"></app-what-is-delivigo>
        <app-download :newLang= local :key="newCount"></app-download>
    </div>
</template>
<script>

import Banner from './landingBanner.vue';
// import Popular from './popularrestaurant.vue';
import Process from './delivery.vue';
// import Featured from './featuredRestaurants.vue';
import Download from './appStore.vue';
import {fetchResturantsData} from "../components/api/Landing";
import availableCities from "./availableCities";
import whatIsDelivigo from "./whatIsDelivigo";
import {EventBus} from "../main";
import {lang} from "../components/lang/lang";


export default {
    // props: ['lang'],
    components:{
    landingBanner: Banner,
    // popularRestaurant: Popular,
    deliveryProcess: Process,
    // featuredRestaurants: Featured,
    appAvailableCities: availableCities,
    appWhatIsDelivigo: whatIsDelivigo,
    appDownload: Download,
    },
    data(){
        return {
            fearturedRestaurants: null,
            popularRestaurants: null,
            newCount : 0,
            local: lang.en,
        }
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
        changeTheLang() {
            console.log("here it is");
            this.fetchResturantsData();
            this.checkLang();
            EventBus.$emit("changeNewLang", "");
            this.newCount += 1;
        },
        async fetchResturantsData() {
            localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
            fetchResturantsData().then(response => {
                // EventBus.$emit("homeChange","");
                this.popularRestaurants = response.PopularNearYou;
                this.$root.$emit('cities',response.Cities);
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
        },
        emitCounter() {
                this.$emit("changeCounter",0);
            },
            resetCounter() {
                localStorage.setItem("isAddress", "false");
                this.emitCounter();
            }
    },
    created() {
        this.fetchResturantsData();
        this.changeTheLang();
        EventBus.$on("changeLang", () => {
            this.changeTheLang();
        })
    },
    mounted() {

    }
}
</script>
