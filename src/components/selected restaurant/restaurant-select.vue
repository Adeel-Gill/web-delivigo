<template>
    <div class="restaurnt-selected">
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
export default {
    components:{
        Banner,
        popularFoods: Foods,
        restaurntName: Name,
        Dishes,
        Venue,

    },
    
    mounted() {
      this.changeHeader();
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
    },
    
}
</script>
<style scoped>







</style>