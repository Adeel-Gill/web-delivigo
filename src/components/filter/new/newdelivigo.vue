<template>
    <div class="col-md-4 padding-top-botom">
         <div class="restaurant" @click="emitId">
             <router-link :to="'/restaurant/'+newRestaurant.Id">
            <img :src="baseUrl + newRestaurant.ImageUrl" />
            <div class="restaurants-details">
                <div class="row">
                    <div class="col-md-8 padding-top-botom">
                        <h6>{{newRestaurant.Name}}</h6>
                    </div>
                    <div class="col-md-4 padding-top-botom">
                        <p class="padding-top"><i class="fas fa-star"></i> {{newRestaurant.Rating}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 padding-top-botom">
                        <p class="font-light">{{newRestaurant.Tags}}</p>
                    </div>
                    <div class="col-md-3 padding-top-botom">
                        <i class="fas fa-euro-sign"></i>
                        <i class="fas fa-euro-sign"></i>
                        <i class="fas fa-euro-sign"></i>
                    </div>
                    <div class="col-md-4 padding-top-botom">
                        <p class="font-size-9"><i class="far fa-clock"></i> {{newRestaurant.Time}}</p>
                    </div>
                </div>
            </div>
             </router-link>
        </div>
    </div>
</template>
<script>
    import {baseAddress} from "../../../main";
    import {EventBus} from "../../../main";
    import newRestaurants from "./newRestaurants";
    export default {
    props:['newRestaurant'],
    data(){
        return{
            baseUrl: baseAddress,
            restaurants: newRestaurants
        }
    },
    methods: {
        emitId() {
            EventBus.$emit('resId', this.restaurants.Id)
        }
    }
}
</script>
<style scoped>
.restaurant a {
    text-decoration: none;
    color: black;
    display: inline-block;
}
.restaurants-list img{
    width: 100%;
    border-radius: 7px;
}
.restaurant{
    background: #d9d9d9;
    border-radius: 8px;
    margin-bottom: 25px;
}
.restaurants-details h6{
    font-family: "Roboto";
    font-size: 17px;
    font-weight: bold;
    margin: 0;
    display: inline-block;
    padding: 0 10px;
}
.restaurants-details p{
    margin: 0;
    font-family: "Roboto";
    font-size: 9px;
}
.font-light{
    color: #424242;
    font-weight: lighter;
    padding: 4px 10px 0; 
}
.padding-top{
    padding-top: 8px;
}
i.fas.fa-euro-sign{
    font-size: 15px;
    display: inline-block;
    vertical-align: top;
    padding: 1px 1px;
    color: #505050;
}
.font-size-9{
    font-size: 9px !important;
}
i.fas.fa-star{
    color: #8ba939;
}
i.far.fa-clock {
    font-size: 13px !important;
    color: #8ba939;
}
</style>
