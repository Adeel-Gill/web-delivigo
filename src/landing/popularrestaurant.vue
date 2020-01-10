<template>
  <div class="container">
    <div class="popular">
      <div class="title">
        <h2>{{titleHeading}}</h2>
        <p>{{subHeading}}</p>
      </div>
      <div class="show-more">
        <router-link to="/populars" >Show More</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list">
        <div class="row">
          <restaurantsData v-for= "restaurant in popularData.slice(0, 3)" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Restaurant from '../components/restaurant/restaurant.vue';
export default {
  components: {
    restaurantsData: Restaurant
  },
  data(){
    return{
      titleHeading: 'Popular Restaurant',
      subHeading: 'The easiest way to your favourite food',
      popularData: []
    }
  },
  mounted() {
    this.$root.$on('popularData', popularRestaurants => {
      if(popularRestaurants.length>0) {
        this.popularData = popularRestaurants
      } else {
        this.showNotification('error','Error','No popular restaurants available to show!');
      }
    })
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
  }
  }
</script>
<style scoped>
.popular {
    margin: 50px 0;
}
.show-more{
  text-align: right;
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
  text-align: center;
  font-family: "Roboto";
  color: #080808;
}
.title h2{
  font-size: 35px;
  text-transform: uppercase;
}
.title p{
  font-size: 23px;
}
</style>
