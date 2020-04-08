<template>
    <div class="popular">
      <div class="title">
        <h2>{{popularHeading}}</h2>
      </div>
      <div class="show-more" v-if="popularMore">
        <router-link to="/populars">Show More</router-link>
      </div>
      <div class="clear"></div>
      <div class="restaurants-list" v-if="popularNotEmpty">
<!--        <div class="row">-->
<!--        <carousel :autoplay="true" :nav="false" :responsive="{0:{items:1,nav:false},600:{items:2,nav:true},1000:{items:3,nav:false}}">-->
          <div class="owl-carousel owl-theme">
            <restaurantsData v-for= "restaurant in restaurants" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
          </div>
<!--        </carousel>-->
<!--        </div>-->
      </div>
      <div class="row" v-else>
        <app-empty-error></app-empty-error>
      </div>
    </div>
</template>
<script>
import restaurant from '../restaurant/resturant-slider';
import carousel from 'vue-owl-carousel2';
import emptyError from "../error/emptyError";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import 'jquery';
export default {
    components: {
        restaurantsData: restaurant,
      appEmptyError: emptyError,
      carousel
    },
    data(){
        return{
            popularHeading:'POPULAR RESTAURANT',
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
    }
  },
  mounted() {
    this.$root.$on('popularData', popularRestaurants => {
      console.log('inFilterPopularOn'+popularRestaurants);
      if(popularRestaurants.length>0) {
        this.restaurants = popularRestaurants;
        if(popularRestaurants.length > 3) {
          this.popularMore = true;
          $(document).ready(function(){
              $('.owl-carousel').owlCarousel({
                  loop:true,
                  dots: false,
                  autoplay:true,
                  autoplayTimeout:2000,
                  autoplayHoverPause:true,
                  responsiveClass:false,
                  margin:10,
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
        }
      } else {
        this.popularNotEmpty = false;
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
    /*font-family: "Panton";*/
    font-weight: bold;
    font-size: 17px;
}
.title{
  /*font-family: "Roboto";*/
  color: #080808;
}
.title h2{
  font-size: 35px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>

