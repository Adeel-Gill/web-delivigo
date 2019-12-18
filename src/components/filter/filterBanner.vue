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
          <b-carousel-slide v-for="slide in restaurants" :img-src= "baseUrl + slide.ImageUrl" >
            <div class="filter-caption">
              <h6>{{slide.Name}}</h6>
              <h3>{{slide.Tags}}</h3>
              <p>{{slide.FullAddress +' '+ slide.FullAddress2}}</p>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
</template>
<script>
  import {baseAddress} from "../../main";

  export default {
    data() {
      return {
        text:'',
        sliding: null,
        baseUrl: baseAddress,
        restaurants: []
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
        this.restaurants = popularRestaurants
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
