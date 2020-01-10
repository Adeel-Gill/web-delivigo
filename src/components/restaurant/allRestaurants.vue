<template>
  <div>
    <div class="container">
      <div class="popular">
        <div class="title">
          <h2>{{titlePopular}}</h2>
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
      <div class="featured-restaurant">
        <div class="featured-restaurants">
          <h2>{{ titleFeature }}</h2>
        </div>
        <div class="restaurants-list">
          <div class="row">
            <restaurantsData
              v-for="restaurant in restaurants"
              :key="restaurant.id"
              :restaurant="restaurant"
            ></restaurantsData>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Restaurant from "./restaurant.vue";
import Restaurants from "../../api.services/restaurants";
export default {
  components: {
    restaurantsData: Restaurant
  },
  data() {
    return {
      titlePopular: "Popular Restautrants",
      titleFeature: "Featured Restautrants",
      restaurants: []
    };
  },
  created() {
    Restaurants.getAllPopularRest()
      .then(response => {
        console.log(response.data);
        this.restaurants = response.data;
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
};
</script>
<style scoped>
.featured-restaurants h2 {
  text-align: center;
  margin: 50px 0;
}
.restaurants-list {
  margin-bottom: 40px;
}
</style>