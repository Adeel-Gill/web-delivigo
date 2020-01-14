<template>
    <div class="col-md-4 padding-top-botom">
        <div class="restaurant" >
            <router-link to="/">
                <div>
                    <img :src="`${getImage('')}`" @error="`${getImage('')}`" />
                    <div class="restaurants-details">
                        <div class="row">
                            <div class="col-8 padding-top-botom">
                                <h6 style="display: block;" class="text-truncate">City Name</h6>
                            </div>
                            <div class="col-4 padding-top-botom">
                                <p class="padding-top font-size-9"><i class="fas fa-star"></i> 0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-5 padding-top-botom">
                                <p style="display: block;" class="font-light text-truncate">Address</p>
                            </div>
                            <div class="col-3 padding-top-botom">
                                <i class="fas fa-euro-sign"></i>
                                <i class="fas fa-euro-sign"></i>
                                <i class="fas fa-euro-sign"></i>
                            </div>
                            <div class="col-4 padding-top-botom">
                                <p class="font-size-9"><i class="far fa-clock"></i> 11:00</p>
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
    import {defaultRestaurantPic} from "../../main";
    export default {
        name: "City",

        methods: {
            getImage(img) {
                if(img === '' || img === 'null' || img == null) {
                    this.image = defaultRestaurantPic;
                    // console.log('imageinsideIf',this.image,'param',img);
                    return this.image;
                } else {
                    this.image = baseAddress + img;
                    // console.log('imageinsideelse',this.image,'param',img);
                    return this.image;
                }
            }
        }
    }
</script>

<style scoped>

</style>
