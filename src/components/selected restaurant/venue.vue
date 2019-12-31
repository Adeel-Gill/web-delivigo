<template>
    <div class="required-info">
        <div class="venue-info">
            <h3>{{venue.venuInfo}}</h3>
            <div class="address-info">
                <h3>{{venue.addressHeading}}</h3>
                <p>{{restaurant.FullAddress}}
                    <span >
<!--                        <app-map to="/map"></app-map>-->
                        <router-link :to="{path: '/map',
                        query: {long: restaurant.Longitude,
                        lat: restaurant.Latitude,resaddress: restaurant.FullAddress,
                        name: restaurant.Name,
                        }}">{{venue.seeMap}}</router-link>
                    </span>
                </p>
            </div>
            <div class="opening-info">
                <h3>{{venue.opening}}</h3>
                <div id="tabes-venue">
                    <b-tabs content-class="mt-3">
                        <b-tab title="Restaurant" active>
                            <div class="open-days-time">
                                <div class="open-days">
                                    <h6>{{restaurant.StartDay}} - {{restaurant.EndDay}}</h6>
                                </div>
                                <div class="open-time">
                                    <p>{{restaurant.ServiceStartTime}} - {{restaurant.ServiceEndTime}}</p>
                                </div>
                                <div class="clear"></div>
                                <div class="about-your-health">
                                    <p v-if="showAll">{{restaurant.Description}}</p>
                                    <p v-else>{{restaurant.Description | truncate}}</p>
                                </div>
                                <div class="contant-num">
                                    <p>{{restaurant.PhoneNumber}}</p>
                                    <button class="link" @click="changeShowAll">{{venue.moreInfo}}</button>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Delivery">
                            <div class="delivery-time">
                                <p>
                                    <span class="float-left">{{venue.delivery}}</span>
                                    <span class="float-right">{{restaurant.DeliveryTime}} Mins</span>
                                </p>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Map from '../Map/Map'
export default {
        components: {
          appMap: Map
        },
    data(){
        return{
            restaurant: {},
            venue:{
                venuInfo:'Venue information',
                addressHeading:'Address',
                address:'Kunaev St. 133 050000 Almaty',
                opening:'Opening times',
                openDay:'Monday-Sunday',
                openTime:'11:00-24:00',
                requests:'If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.',
                phnNum:'+77273132414',
                moreInfo:'See more information',
                seeMap:' See Map',
                delivery:'Free delivery',
                timeing:'35-45 Mins',
            },
            showAll: false
        }
    },
    mounted() {
        this.$root.$on('restaurant', response => {
            this.restaurant = response;
        })
    },
    methods: {
            navigateTo(long, lat) {
                this.$router.push({path:'/map/',query:{long:long, lat: lat}});
            },
        changeShowAll() {
                this.showAll = !this.showAll;
        },
        emitRestaurant() {
                this.$root.$emit('resDetail',this.restaurant);
        }
    },
    filters: {
            truncate(val) {
                let length = 100;
                if(val.length <= length) {
                    return val
                } else {
                    return val.substring(0, length)+ '...';
                }
            }
    }
}
</script>
<style scoped>
.required-info {
    position: relative;
}
.venue-info {
    text-align: left;
}
.venue-info h3 {
    font-family: "Roboto";
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 50px;
    color: #040404;
}
.address-info h3 {
    margin-bottom: 0 !important;
}
.address-info p[data-v-0e54dd28] {
    max-width: 145px;
    margin: 0;
    font-family: "Roboto";
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #040404;
}
.address-info p span {
    padding: 24px 0;
    display: block;
}
.opening-info h3 {
    margin-bottom: 25px !important;
}
.open-days {
    float: left;
    margin: 20px 0;
}
.open-days h6 {
    margin: 0;
    font-family: "Roboto";
    font-weight: normal;
    font-size: 18px;
    color: #040404;
}
.open-time p {
    font-family: "Roboto";
    font-weight: 100;
    font-size: 18px;
    color: #040404;
    margin: 0;
    line-height: 21px;
}
.open-time {
    float: right;
    margin: 20px 0;
}
.about-your-health p {
    color: #040404;
    font-family: "Roboto";
    font-size: 15px;
}
.contant-num p {
    font-size: 18px;
    color: #1c0095;
    font-family: "Roboto";
    margin: 5px 0 30px 0;
}
.contant-num a {
    font-size: 18px;
    color: #1c0095;
    font-family: "Roboto";
    margin: 5px 0 30px 0;
}
.delivery-time span {
    display: block;
    margin-top: 15px;
}
button.link {
    background:none;
    border:none;
    font-size: 18px;
    color: #1c0095;
    font-family: "Roboto";
    margin: 5px 0 30px 0;}
.fade-enter-active, .fade-leave-active {
    transition: opacity 2.5s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
