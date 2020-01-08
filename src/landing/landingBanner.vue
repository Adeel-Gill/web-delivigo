
<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      :visible-slides="3"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="(slide) in slides" :key="slide.imageURL" :img-src="slide.imageURL" >
        <div class="caption-change">
            <h1>{{slide.heading}}</h1>
            <p>{{slide.description}}</p>
            <div id="map" style="display: none;"></div>
            <div id="geocoder" class="geocoder" @select="showValues"></div>
            <b-form-input v-model="text" placeholder="I Would like to eat...."></b-form-input>
            <b-button @click="navigateTo">Search Food</b-button>
        </div>
      </b-carousel-slide>
    </b-carousel>
  </div>
  
</template>

<script>
  import {EventBus} from "../main";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl";
  import 'mapbox-gl/dist/mapbox-gl.css'
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
  export default {
    data() {
      return {
        text:'',
        slide: 0,
        sliding: null,
          map: null,
          geocoder: null,
        slides:[
            {
                heading:'ORDER DELIVERY & TAKE OUT',
                description:'Find restaurants, specials, and coupons for free',
                imageURL:'/images/slide1.png'
            },
            {
                heading:'ORDER DELIVERY & TAKE OUT',
                description:'Find restaurants, specials, and coupons for free',
                imageURL:'/images/slide2.png'
            }
        ]
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      },
        showValues() {
            console.log('query',this.geocoder.inputString,'lastSelected',this.geocoder.lastSelected);
        },
        navigateTo() {
          this.$router.push('filter');
            this.$root.$on('popularData', popularRestaurants => {
                console.log('inLandingBannerOn'+popularRestaurants);
                EventBus.$emit('popularData',popularRestaurants);
            })
        }
    },
      mounted() {
          mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
          this.map =  new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              zoom: 9
          });
          let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
          this.geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          });
          document.getElementById("geocoder").appendChild(this.geocoder.onAdd(this.map));
          console.log('map',this.map,'geo',this.geocoder,'Map',MapboxGeocoder);
      },
      updated() {
        console.log('query',this.geocoder.inputString,'lastSelected',this.geocoder.lastSelected);
      }
  }
</script>
<style scoped>
#carousel-1.carousel-caption {
    top: 0 !important;
    font-size: 10px !important;
}

.caption-change h1 {
    font-size: 85px;
    letter-spacing: 1px;
    font-family: "H.H. Samuel";
    display: inline-block;
}
.caption-change p {
    font-family: "Roboto";
    font-size: 30px;
    line-height: 32px;
    font-weight: normal;
    display: inline-block;
    margin-bottom: 28px;
}
.form-control{
    line-height: 32px;
    font-size: 27px;
    display: inline-block;
    width: 360px;
    height: 50px;
    font-family: "Roboto";
    font-weight: normal;
}
button.btn {
    font-family: "Roboto";
    font-weight: normal;
    font-size: 28px;
    line-height: 32px;
    padding: 8px 28px;
    margin: 0 0 0 12px;
    vertical-align: unset;
    color: #ffffff;
    background: #df3e03;
}
.geocoder {
    position: absolute;
    z-index: 1;
    width: 360px;
    left: 50%;
    margin-left: -25%;
    top: 200px;
}
.mapboxgl-ctrl-geocoder {
    min-width: 100%;
}
</style>
