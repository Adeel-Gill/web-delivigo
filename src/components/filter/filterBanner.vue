<template>
    <div id="filtered-restaurant">
      <div class="filter-slider">
        <b-carousel
          id="carousel-2"
          fade
          :interval="3000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Text slides with image -->
          <b-carousel-slide v-for="slide in mockData" :key="slide" :img-src= "slide.imageURL" >
            <div class="filter-caption" style="right: 0;">
              <h6>slide.name</h6>
              <h3>slide.description</h3>
              <p>slide.rating</p>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
</template>
<script>
  import {baseAddress} from "../../main";
  import restaurants from "../restaurant/restaurants.js"

  export default {
    data() {
      return {
        text:'',
        sliding: null,
        baseUrl: baseAddress,
        restaurants: [],
        mockData: restaurants
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    },
    mounted() {
      this.$root.$on('popularData', popularRestaurants => {
        console.log('inFilterBannerOn'+popularRestaurants);
        this.restaurants = popularRestaurants;
        console.log('mockData'+this.mockData);
      })
    }
  }
</script>
<style scoped>

.filter-caption h6 {
    font-family: "Roboto";
    font-size: 15px;
    font-weight: 500;
    color: black;
    text-shadow: none;
    margin: 0;
}
.filter-caption h3 {
    font-family: "Roboto";
    font-weight: bold;
    font-size: 25px;
    color: black;
    text-shadow: none;
    margin: 0;
    line-height: 30px;
}
.filter-caption p {
    font-family: "Roboto";
    font-size: 25px;
    font-weight: 300;
    text-shadow: none;
    color: black;
    margin: 0;
}

.filter-slider{
    border: 3px solid #cccccc;
    margin: 50px 0;
    display: flex;
    align-items: center;
    position: relative;
}
</style>
