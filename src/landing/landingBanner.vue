
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

      </b-carousel-slide>
        <div class="banner-caption">
            <h1>{{newLang.orderDelivery}}</h1>
            <p>{{newLang.findRestaurants}}</p>
            <div class="row overlay">
            <div id="map" style="display: none;"></div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-12 py-0">
                            <div class="row">
                                <div class="col-11 p-0">
                                    <div id="geocoder" class="geocoder d-inline-block" style="width: 100%;"
                                         @select="showValues"></div>
                                </div>
                                <div class="col-1 p-0">
                                    <button class="btn-location" @click="getAddress">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"
                                             id="ic-locate-round">
                                            <g fill="none" fill-rule="evenodd">
                                                <path stroke-width="2" stroke="#fff"
                                                      d="M11.5 22.5v-2.986l.471-.028a8.001 8.001 0 0 0 7.515-7.515l.028-.471H22.5h-2.986l-.028-.471a8.001 8.001 0 0 0-7.515-7.515l-.471-.028V.5v2.986l-.471.028a8.001 8.001 0 0 0-7.515 7.515l-.028.471H.5h2.986l.028.471a8.001 8.001 0 0 0 7.515 7.515l.471.028V22.5z"></path>
                                                <circle cx="11.5" cy="11.5" r="4" stroke-width="2"
                                                        stroke="#fff"></circle>
                                                <circle cx="11.5" cy="11.5" r="1" stroke-width="2" fill="#fff"></circle>
                                                //#999898
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

<!--            <b-form-input v-model="text" placeholder="I Would like to eat...."></b-form-input>-->
            <div class="col-lg-2 col-12 p-0 btn-overlay">

            <b-button class="btn-search" @click="navigateTo">{{newLang.searchButton}}</b-button>
            </div>
                </div>
                </div>
            </div>
        </div>
    </b-carousel>

  </div>
  
</template>

<script>
  import {EventBus} from "../main";
  import mapboxgl from "mapbox-gl/dist/mapbox-gl";
  import {map} from "../main";
  import {lang} from "../components/lang/lang";
  import 'mapbox-gl/dist/mapbox-gl.css';
  import {saveAddress} from "../components/api/DeliveryAddress";
  import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
  import axios from 'axios'
  export default {
      props: ['newLang'],
    data() {
      return {
        text:'',
        slide: 0,
        sliding: null,
          map: null,
          geocoder: null,
          data: {},
          longitude: 0,
          latitiude: 0,
          position: null,
          local: lang.en,
          userAddress: '',
          addressObj: {
              "AddressLine":"",
              "Longitude":0.0,
              "Latitude": 0.0,
              "CustomerId":0,
              "BludingNumber":"string",
              "Apartment":"",
              "Floor":"string",
              "IsDefault":true
          },
        slides:[
            {
                // heading:'ORDER DELIVERY & TAKE OUT',
                // description:'Find restaurants, specials, and coupons for free',
                imageURL:'/images/slide1.png'
            },
            {
                // heading:'ORDER DELIVERY & TAKE OUT',
                // description:'Find restaurants, specials, and coupons for free',
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
            this.map.locate();

            console.log('obj',JSON.parse(this.geocoder.lastSelected));
        },
        navigateTo() {
          this.data = JSON.parse(this.geocoder.lastSelected);
          console.log('data',this.data);
         
          if(this.data != null) {
              console.log("inside if");
            localStorage.setItem("localAddress", this.data.place_name);
              this.longitude = this.data.geometry.coordinates[0];
              this.latitude = this.data.geometry.coordinates[1];
              if((this.longitude != null && this.latitude != null)) {
                  this.saveAddress();
                  this.$router.push({path: '/filter',query: {longitude: this.longitude, latitude: this.latitude}});
                  this.$emit("updateTheCounter", "");
                  this.$root.$on('popularData', popularRestaurants => {
                      console.log('inLandingBannerOn'+popularRestaurants);
                      EventBus.$emit('popularData',popularRestaurants);
                  })
              } else {
                  this.showNotification('error','Error','Please select nearby location...!');
              }
          } else {
              console.log("here",this.position);
              if(this.position != null) {
                  console.log("inside condition");
                  if((this.position.coords.longitude != null && this.position.coords.latitude != null)) {
                      this.saveAddress();
                      this.$router.push({path: '/filter',query: {longitude: this.position.coords.longitude, latitude: this.position.coords.latitude}});
                      this.$root.$on('popularData', popularRestaurants => {
                          console.log('inLandingBannerOn'+popularRestaurants);
                          EventBus.$emit('popularData',popularRestaurants);
                      })
                  } else {
                      console.log("hereree");
                      this.showNotification('error','Error','Please select nearby location...!');
                  }
              } else {
                  this.showNotification('error','Error','Please select nearby location...!');
              }

          }

          
        },
        saveAddress() {
            if(localStorage.getItem("isLogin") === "true") {
              this.addressObj.CustomerId = localStorage.getItem("id");
              saveAddress(this.addressObj).then(response => {
                  console.log(response);
                  localStorage.setItem('saveAddress', 'false');
              });
          } else {
              localStorage.setItem('addressObj', JSON.stringify(this.addressObj));
              localStorage.setItem('saveAddress', 'true');
          }
        },
        isEmpty(obj) {
          console.log("object",obj)
          console.log(Object.getOwnPropertyNames(obj));
          return Object.keys(obj).length ===0;
              // for(var key in obj) {
              //     console.log("key",key);
              //     console.log("obj",obj.hasOwnProperty(key));
              //     if(obj.hasOwnProperty(key)) {
              //         console.log("hereee");
              //         return false;
              //     }
              // }
              // return true;
          },
         getUserLocation() {
          navigator.geolocation.getCurrentPosition((position) => {
              this.position = position;
              console.log('position', this.position.coords.longitude,this.position.coords.latitude);
              axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.position.coords.longitude}%2C${this.position.coords.latitude}.json?access_token=pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg`)
                  .then(response => {
                      console.log('Address :: ',response.data);
                      if(response.data.features.length > 0) {
                          this.userAddress = response.data.features[0].place_name;
                          localStorage.setItem("isAddress", true);
                          this.addressObj.AddressLine = response.data.features[0].place_name;
                          this.addressObj.Longitude = response.data.features[0].center[0];
                          this.addressObj.Latitude = response.data.features[0].center[1];
                          this.addressObj.Apartment = response.data.features[0].text;
                          
                          localStorage.setItem("localAddress", this.userAddress);
                          this.geocoder.inputString = this.userAddress;
                          document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0].value = this.userAddress;
                          console.log('Address of User',this.userAddress,this.geocoder.inputString,document.getElementsByClassName("mapboxgl-ctrl-geocoder--input"));
                      } else {
                          this.showNotification('error','Error','Location not found');
                          EventBus.$emit('StartOverlay', false);
                      }
                  },error => {
                      this.showNotification('error','Error','Location not found');
                      EventBus.$emit('StartOverlay', false);
                  })
              EventBus.$emit('StartOverlay', false);
          })
        },
        async getAddress() {
            EventBus.$emit('StartOverlay', true);
        this.getUserLocation();

        },
        showNotification(type, title, message) {
            this.$notify({
                group: 'foo',
                type: type,
                title: title,
                text: message,
                duration: 2000
            })
        },
        checkLang() {
            console.log("hereItIs");
        var temp = localStorage.getItem("lang");
        if(temp == null || temp === "EN") {
          localStorage.setItem("lang", "EN");
          this.local = lang.en;
        } else if(temp === "FN" ) {
          this.local = lang.fn;
          localStorage.setItem("lang", "FN");
        } else {
          this.local = lang.sp;
          localStorage.setItem("lang", "ES");
        }
        // this.value = temp;
      },
    },
      mounted() {
          this.checkLang();
          mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
         this.map =  new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              zoom: 9
          });
         console.log('maphere',this.map);
         EventBus.$emit('mapProperty',this.map);
          let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
          this.geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl
          });
          this.map.addControl(new mapboxgl.GeolocateControl({
              positionOptions: {
                  enableHighAccuracy: true
              },
              trackUserLocation: true
          }));
          document.getElementById("geocoder").appendChild(this.geocoder.onAdd(this.map));
          console.log('map',this.map,'geo',this.geocoder,'Map',MapboxGeocoder);

      },
      created() {
          EventBus.$emit("changeNewLang", () => {
              this.checkLang();
          })
      },
      updated() {
        //   this.checkLang();
        console.log('query',this.geocoder.inputString,'lastSelected',this.geocoder.lastSelected);
      }
  }
</script>
<style scoped>
#carousel-1.carousel-caption {
    top: 0 !important;
    font-size: 10px !important;
}

.banner-caption h1 {
    font-size: 85px;
    letter-spacing: 1px;
    /*font-family: "H.H. Samuel";*/
    font-family: "HH-Samuel",sans-serif !important;
    display: inline-block;
}
.banner-caption p {
    font-family: "HH-Samuel",sans-serif;
    font-size: 30px;
    line-height: 32px;
    font-weight:lighter;
    display: inline-block;
    margin-bottom: 28px;
}

.banner-caption{
    color: white;
    text-align: center;
    position: absolute;
    z-index: 1;
    width: 70%;
    left: 15%;
    right: 15%;
    /*margin-left: -25%;*/
    top: 35%;
}
.overlay{
    /*margin-left: 50px;*/
}
.btn-overlay{
    text-align: left;
    padding-left: 20px;
}
.btn-search {
    /*font-family: "Roboto";*/
    font-weight: normal;
    font-size: 22px;
    line-height: 32px;
    padding: 0 22px;
    /*margin: 0 0 0 12px;*/
    vertical-align: unset;
    color: #ffffff;
    background: #df3e03;
    height: 44px;
    margin-left: 4px;
}
.btn-search:hover{
    color: white;
    background: #AE3F03;
}
.btn-search:active{
    color: white !important;
    background-color: #AE3F03 !important;
}

.btn-location{
    background-color: #df3e03;
    height: 44px;
    width: 40px;
    padding-top: 4px;
    border-radius:4px;
    margin-left: 4px;
}
.btn-location:hover{
    color: white;
    background: #AE3F03;
}
.btn-location svg{
    height: 36px;
    width: 36px;
}
@media screen and (max-width: 400px) {
    .btn-search{
        font-size: 18px;
        line-height: 18px;
        margin: 5px 0 0 0;
        height: 35px;
    }
    .btn-location{
        height: 35px;
    }
    .btn-location svg{
        height: 28px;
        width: 28px;
    }
    .overlay{
        margin-left:0px;
    }
    .btn-overlay{
        text-align: center;
        padding: 0;
    }
    .banner-caption h1{
        font-size: 22px;
    }
    .banner-caption p{
        font-size: 16px;
        margin-bottom: 10px;
        line-height: 16px;
    }
    .banner-caption{
        top: 10%;
    }
}
@media screen and (max-width: 576px) and (min-width: 401px) {
    .btn-search{
        font-size: 22px;
        line-height: 25px;
        padding: 0px 21px;
        margin: 10px 0 0 0;
    }

    .overlay{
        margin-left:0px;
    }
    .btn-overlay{
        text-align: center;
        padding-left:0px;
    }

    .banner-caption h1{
        font-size: 22px;
    }
    .banner-caption p{
        font-size: 16px;
        margin-bottom: 10px;
        line-height: 16px;
    }
    .banner-caption{
        top: 20%;
    }
}

@media screen and (max-width: 768px) and (min-width: 576px) {
    .btn-search{
        font-size: 22px;
        line-height: 25px;
        padding: 0px 21px;
        margin: 10px 0 0 0;
    }

    .overlay{
        margin-left:0px;
    }
    .btn-overlay{
        text-align: center;
        padding-left:0px;
    }

    .banner-caption h1{
        font-size: 42px;
    }
    .banner-caption p{
        font-size: 22px;
        margin-bottom: 10px;
        line-height: 22px;
    }
    .banner-caption{
        top: 25%;
    }
}

@media screen and (max-width: 992px) and (min-width: 768px) {
    .banner-caption h1{
        font-size: 62px;
    }
    .banner-caption p{
        font-size: 30px;
        margin-bottom: 20px;
        line-height: 30px;
    }

    .btn-search{
        font-size: 22px;
        line-height: 25px;
        padding: 0px 21px;
        margin: 10px 0 0 0;
    }

    .overlay{
        margin-left:0px;
    }
    .btn-overlay{
        text-align: center;
        padding-left:0px;
    }
    .banner-caption{
        top: 30%;
    }
}

/*.form-control{*/
/*    line-height: 32px;*/
/*    font-size: 27px;*/
/*    display: inline-block;*/
/*    width: 360px;*/
/*    height: 50px;*/
/*    font-family: "Roboto";*/
/*    font-weight: normal;*/
/*}*/

/*.geocoder {*/
/*    position: absolute;*/
/*    z-index: 1;*/
/*    width: 360px;*/
/*    left: 50%;*/
/*    margin-left: -25%;*/
/*    top: 200px;*/
/*}*/

</style>
