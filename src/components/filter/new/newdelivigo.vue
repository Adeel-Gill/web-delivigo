<template>
    <div class="col-md-4 col-sm-6 padding-top-botom">
    <div class="restaurant" @click="emitId">
             <router-link :to="'/restaurant/'+newRestaurant.Id">
            <img :src="`${getImage(newRestaurant.ImageUrl)}`" @error="`${getImage('')}`" />
            <div class="restaurants-details">
                <div class="row">
                    <div class="col-8 padding-top-botom">
                        <h6 style="display: block;" class="text-truncate">{{newRestaurant.Name}}</h6>
                    </div>
                    <div class="col-4 padding-top-botom">
                        <p class="padding-top font-size-9"><i class="fas fa-star"></i> {{newRestaurant.Rating}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5 padding-top-botom">
                        <p class="font-light text-truncate" style="display: block;">{{newRestaurant.Tags}}</p>
                    </div>
                    <div class="col-3 padding-top-botom">
                        <i class="fas fa-euro-sign"></i>
                        <i class="fas fa-euro-sign"></i>
                        <i class="fas fa-euro-sign"></i>
                    </div>
                    <div class="col-4 padding-top-botom">
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
    import {defaultRestaurantPic} from "../../../main";
    import newRestaurants from "./newRestaurants";
    export default {
    props:['newRestaurant'],
    data(){
        return{
            baseUrl: baseAddress,
            restaurants: newRestaurants,
            image : ''
        }
    },
    methods: {
        emitId() {
            EventBus.$emit('resId', this.restaurants.Id)
        },
        getImage(img) {
            if(img === '' || img === 'null' || img == null) {
                this.image = defaultRestaurantPic;
                return this.image;
            } else {
                this.image = baseAddress + img;
                return this.image;
            }
            console.log('imagen',this.image);
        }
    }
}
</script>
<style scoped>
    .restaurant a{
        text-decoration: none;
        color: black;
    }
    .restaurants-list img{
        width: 100%;
        height: 200px;
        border-radius: 7px;
    }
    .restaurant{
        background: #d9d9d9;
        border-radius: 8px;
        margin-bottom: 25px;
    }
    .restaurants-details{
        /*height: 60px;*/
        padding: 5px 0 3px 0;
    }
    .restaurants-details h6{
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        display: inline-block;
        padding: 0 10px;
    }
    .restaurants-details p{
        margin: 0;
        font-size: 10px;
    }
    .font-light{
        font-weight: 300;
        color: #424242;
        /*font-weight: lighter;*/
        padding: 4px 10px;
        font-size: 12px !important;
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
        font-size: 12px !important;
    }
    i.fas.fa-star{
        font-size: 14px !important;
        color: #8ba939;
    }
    i.far.fa-clock {
        font-size: 14px !important;
        color: #8ba939;
    }
    @media screen and (max-width: 960px) {
        .restaurants-list img{
            height: 160px;
        }
    }
</style>
