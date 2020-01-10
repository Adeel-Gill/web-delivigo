<template>
    <div class="popular">
      <div class="title">
        <h2>{{popularHeading}}</h2>
      </div>
      <div class="show-more">
        <router-link to="/populars">Show More</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list">
        <div class="row">
          <restaurantsData v-for= "restaurant in restaurants.slice(0,3)" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
        </div>
      </div>
    </div>
</template>
<script>
import restaurant from '../restaurant/restaurant';

export default {
    components: {
        restaurantsData: restaurant
    },
    data(){
        return{
            popularHeading:'POPULAR RESTAURANT',
            restaurants: []
        }
    },
  methods: {
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
  mounted() {
    this.$root.$on('popularData', popularRestaurants => {
      console.log('inFilterPopularOn'+popularRestaurants);
      if(popularRestaurants.length>0) {
        this.restaurants = popularRestaurants
      } else {
        this.showNotification('error','Error','No popular restaurants available to show!');
      }
    })
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
