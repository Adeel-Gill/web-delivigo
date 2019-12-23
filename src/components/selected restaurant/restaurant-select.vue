<template>
    <div class="restaurnt-selected" v-if="!loader">
        <banner />
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3">
                    <popular-foods></popular-foods>
                </div>
                <div class="col-lg-6 col-md-6">
                    <restaurnt-name></restaurnt-name>
                </div>
                <div class="col-lg-3 col-md-3"></div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-3"></div>
                <div class="col-lg-6">
                    <dishes />
                </div>
                <div class="col-lg-3 col-md-3">
                    <venue />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Banner from "./cart";
import Foods from "./popular-food.vue";
import Name from "./restaurant-details";
import Dishes from "./dishes.vue";
import Venue from "./venue.vue";
import {EventBus} from "../../main";
import {fetchRestaurantById} from "../api/FilterRestaurants";

export default {
    data() {
      return {
          resId: null,
          loader: false
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
        EventBus.$on('StartOverlay', response => {
            this.loader = response;
            console.log('StartOverlay'+this.loader);
        })
    },
    mounted() {
      this.changeHeader();
      // EventBus.$on('resId', response => {
      //     this.resId = response;
      //     console.log('id'+response+this.resId);
      //     this.fetchRestaurantData(this.resId);
      // })

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
                    this.$root.$emit('mealMenu', response.MealMenu);
                    this.$root.$emit('popularFood', response.Popular);
                    this.$root.$emit('restaurant', response.Restaurant);

                })
        }
    },
    
}
</script>
<style scoped>

</style>
