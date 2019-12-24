<template>
     <div class="col-md-4 padding-top-botom">
         <div class="restaurant" @click="emitId">
            <router-link :to="'/restaurant/'+restaurant.Id">
                <div>
                    <img :src="baseUrl + restaurant.ImageUrl" />
                    <div class="restaurants-details">
                        <div class="row">
                            <div class="col-8 padding-top-botom">
                                <h6 style="display: block;" class="text-truncate">{{restaurant.Name}}</h6>
                            </div>
                            <div class="col-4 padding-top-botom">
                                <p class="padding-top font-size-9"><i class="fas fa-star"></i> {{restaurant.Rating}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 padding-top-botom">
                                <p style="display: block;" class="font-light text-truncate">{{restaurant.FullAddress}}</p>
                            </div>
                            <div class="col-3 padding-top-botom">
                                <i class="fas fa-euro-sign"></i>
                                <i class="fas fa-euro-sign"></i>
                                <i class="fas fa-euro-sign"></i>
                            </div>
                            <div class="col-4 padding-top-botom">
                                <p class="font-size-9"><i class="far fa-clock"></i> {{restaurant.Time}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import {baseAddress} from "../../main";
import {EventBus} from "../../main";

export default {
    props: ['restaurant'],
    data() {
        return {
            baseUrl: baseAddress,
        }
    },
    methods: {
        emitId() {
            console.log('IdFromREs'+this.restaurant.Id);
            EventBus.$emit('resId', this.restaurant.Id)
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
    height: 260px;
    border-radius: 7px;
}
.restaurant{
    background: #d9d9d9;
    border-radius: 8px;
    margin-bottom: 25px;
}
.restaurants-details{
    padding: 5px 0 3px 0;
    /*height: 90px;*/
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
</style>
