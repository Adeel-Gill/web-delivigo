<template>
    <div class="popular">
      <div class="title">
        <h2>{{popularHeading}}</h2>
      </div>
      <div class="show-more">
        <router-link to="/filter">Show More</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list">
        <div class="row">
          <restaurantsData v-for= "restaurant in restaurantLessThan3" :key="restaurant.id" :restaurant='restaurant'></restaurantsData>
        </div>
      </div>
    </div>
</template>
<script>
import restaurant from '../restaurant/restaurant';
import restaurants from '../restaurant/restaurants.js'
export default {
    components: {
        restaurantsData: restaurant
    },
    data(){
        return{
            popularHeading:'POPULAR RESTAURANT',
            restaurants: restaurants
        }
    },
    computed:{
        restaurantLessThan3: function() {
            return this.restaurants.filter(function(restaurant) {
                return restaurant.id <= 3;
            })
        }
    }
}
</script>
<style scoped>
.popular {
    margin: 50px 0;
}
.show-more{
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
.title{
  font-family: "Roboto";
  color: #080808;
}
.title h2{
  font-size: 35px;
  text-transform: uppercase;
}
</style>