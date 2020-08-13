<template>
    <div class="popular">
      <div class="title">
        <h2>{{newLang.popular}}</h2>
      </div>
      <div class="show-more" v-if="popularMore">
        <router-link to="/populars">{{newLang.showMore}}</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list" v-if="popularMore">
<!--        <div class="row">-->
<!--        <carousel :autoplay="true" :nav="false" :responsive="{0:{items:1,nav:false},600:{items:2,nav:true},1000:{items:3,nav:false}}">-->
          <div class="owl-carousel3 owl-theme">
            <restaurantsData v-for= "restaurant in restaurants" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
          </div>
<!--        </carousel>-->
<!--        </div>-->
      </div>
      <div class="row" v-else>
        <!-- <app-empty-error></app-empty-error> -->
      </div>
    </div>
</template>
<script>
import restaurant from '../restaurant/resturant-slider';
// import carousel from 'vue-owl-carousel2';
import emptyError from "../error/emptyError";
import 'owl.carousel/dist/assets/owl.carousel3.css';
import 'owl.carousel';
import 'jquery';
export default {
  props: ['newLang'],
    components: {
        restaurantsData: restaurant,
      appEmptyError: emptyError,
      // carousel
    },
    data(){
        return{
            popularHeading:'Popular Restaurants',
            restaurants: [],
            popularMore: false,
            popularNotEmpty: true,
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
    },
    setData(popularRestaurants) {
      console.log('popularLength', popularRestaurants.length);
      if(popularRestaurants.length>0) {
        this.restaurants = popularRestaurants;
        this.popularMore = this.popularNotEmpty =  true; 
        console.log('restaurants', this.restaurants);
          this.popularMore = true;
          console.log('here we are1');
          $(document).ready(function(){
            console.log('here we are');
              $('.owl-carousel3').owlCarousel({
                  loop:true,
                  dots: false,
                  autoplay:true,
                  autoplayTimeout:2000,
                  autoplayHoverPause:true,
                  responsiveClass:false,
                  margin:20,
                  nav:false,
                  lazyLoad:true,
                  responsive:{
                      0:{
                          items:1
                      },
                      600:{
                          items:2
                      },
                      1000:{
                          items:3
                      }
                  }
              });
          });
      } else {
        this.popularNotEmpty = this.popularMore =false;
        this.showNotification('error','Error','No popular restaurants available to show!');
      }
    }
  },
  mounted() {
    this.$root.$on('popularData', popularRestaurants => {
      console.log('inFilterPopularOn',popularRestaurants);
      this.restaurants = [];
      this.setData(popularRestaurants);
    })
  }
}
</script>
<style scoped>
.popular {
    margin: 43px 0;
}
.show-more{
  float: right;
}
.show-more a {
    color: #0030b4;
    display: inline-block;
    margin: 0 0 20px;
    /*font-family: "Panton";*/
    font-weight: 500;
    font-size: 17px;
}
.title{
  /*font-family: "Roboto";*/
}
.title h2{
  font-size: 32px;
  font-weight: 500;
   text-transform: capitalize;
    color: #000000;
}
</style>

