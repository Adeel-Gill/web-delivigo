<template>
  <div class="container">
    <div class="popular">
      <div class="title">
        <h2>{{titleHeading}}</h2>
        <p>{{subHeading}}</p>
      </div>
      <div class="show-more">
        <router-link to="/all.restaurants">Show More</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list">
        <div class="row">
          <restaurantsData
            v-for="restaurant in restaurants"
            :key="restaurant._id"
            :restaurant="restaurant"
          ></restaurantsData>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Restaurant from "../components/restaurant/restaurant.vue";
import Popular from '../api.services/restaurants';
export default {
  components: {
    restaurantsData: Restaurant
  },
  data() {
    return {
      titleHeading: "Popular Restaurant",
      subHeading: "The easiest way to your favourite food",
      restaurants: []
    };
  },
  created() {
    Popular.getTopThreePopular().then((response) => {
      console.log(response.data);
      this.restaurants = response.data;
    }).catch((error) => {
      console.log(error.response.data);
    });
  }
};
</script>
<style scoped>
.popular {
  margin: 50px 0;
}
.show-more {
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
.title {
  text-align: center;
  font-family: "Roboto";
  color: #080808;
}
.title h2 {
  font-size: 35px;
  text-transform: uppercase;
}
.title p {
  font-size: 23px;
}
</style>