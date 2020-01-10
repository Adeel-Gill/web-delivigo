<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list">
                <div class="row">
                    <restaurantsData v-for= "restaurant in restaurantsData" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import {fetchAllData} from "../api/Home";

    export default {
        name: "allRestaurants",
        data(){
            return{
                titleHeading: 'All Restaurants',
                subHeading: 'The easiest way to your favourite food',
                restaurantsData: [],
            }
        },
        components: {
            restaurantsData: Restaurant
        },
        methods: {
          fetchAllData() {
              fetchAllData().then(response => {
                  if(response.Restaurants.length>0) {
                      this.restaurantsData = response.Restaurants;
                  } else {
                      this.showNotification('error','Error','No restaurants available to show!');
                  }

              }, error => {
                  console.log(error);
                  this.showNotification('error','Error','Error occurred please try later!');
              })
          },
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
            this.fetchAllData();
        }
    }
</script>

<style scoped>
    .popular {
        margin: 50px 0;
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
