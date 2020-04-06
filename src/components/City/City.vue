<template>
    <div class="col-md-4 col-sm-6 padding-top-botom">
        <div class="restaurant">
            <router-link :to="{path: '/filter',query: {city: city.Name}}">
                <div>
<!--                    <img :src="`${getImage('')}`" @error="`${getImage('')}`" />-->
                    <img :src="`${getImage(city.ImageUrl)}`" @error="getImage('')">
                    <div class="restaurants-details">
                        <div class="row">
                            <div class="col-8 padding-top-botom">
                                <h6 style="display: block;" class="text-truncate">{{city.Name}}</h6>
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
    import {defaultCityPic} from "../../main";
    export default {
        name: "City",
        props: ['city'],
        methods: {
            getImage(img) {
                if(img === '' || img === 'null' || img == null) {
                    this.image = defaultCityPic;
                    // console.log('imageinsideIf',this.image,'param',img);
                    return this.image;
                } else {
                    this.image = baseAddress + img;
                    // console.log('imageinsideelse',this.image,'param',img);
                    return this.image;
                }
            },
            navigateTo(name) {
                this.$router.push({path: '/filter',query: {city: name}});
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
        padding: 15px 3px;
        /*height: 90px;*/
    }
    .restaurants-details h6{
        /*font-family: "Roboto";*/
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        text-transform: capitalize;
        display: inline-block;
        padding: 0 10px;
    }
    .restaurants-details p{
        margin: 0;
        /*font-family: "Roboto";*/
        font-size: 9px;
    }
    @media screen and (max-width: 960px) {
        .restaurants-list img{
            height: 160px;
        }
    }
</style>
