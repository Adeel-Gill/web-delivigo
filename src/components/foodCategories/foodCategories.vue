<template>
    <div class="catagory col-7 col-sm-3 col-md-2" @click = "emitName()">
        <router-link to="/foodFilter" >
            <div  class="card-image">
                <img :src="baseUrl + foodCategories.ImageUrl"/>
            </div>
            <div :class="bgClass" class="catagory-desc">
                <div class="catagory-text">
                    <h5>{{foodCategories.Name}}</h5>
                    <h6>{{foodCategories.Count}} Restaurants</h6>
                    <p><i class="fas fa-star"></i> {{foodCategories.StatusCode}}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {baseAddress} from "../../main";
    import {EventBus} from "../../main";

    export default {
        name: "foodCategories",
        props: ['foodCategories'],
        data() {
          return {
              baseUrl: baseAddress,
              bgClass: 'bg-green',
          }
        },
        created() {
            console.log('categories',this.foodCategories);
        },
        methods: {
            emitName() {
                EventBus.$emit('foodCategoryName',this.foodCategories.Name);
            }
        }
    }
</script>

<style scoped>
    .catagories{
        margin-bottom: 50px;
    }
    .catagory{
        display: inline-block;
        margin: 25px 18px;
    }
    .catagory a {
        text-decoration: none;
        display: inline-block;
        width: 100%;
    }
    .catagory:hover a {
        opacity: 0.5;
    }
    .catagory-desc{
        border-radius: 0px 0px 110px 110px;
        width: 100%;
    }
    .bg-green{
        background-color: #8ba939;

    }
    .bg-red{
        background-color: #df6767;
    }
    .bg-blue{
        background-color: #729da4;
    }
    .bg-grey{
        background-color: #c0bbb2;
    }
    .bg-brown{
        background-color: #a07f4c;
    }
    .card-image{
        height: 242px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        border-radius: 110px 110px 0 0;
    }
    .card-image img{
        width: 100%;
        height: 100%;
    }
    .catagory-text {
        margin: 0 30px;
        min-height: 165px;
        color: white;
    }
    .catagory-text h5 {
        font-family: "Panton";
        font-weight: bold;
        font-size: 22px;
        padding-top: 15px;
        margin: 0;
        word-break: break-all;
    }
    .catagory-text h6 {
        font-family: "Panton";
        font-weight: normal;
        font-size: 13px;
        margin-bottom: 25px;
    }
    .catagory-text p {
        font-family: "Roboto";
        font-size: 17px;
        font-weight: normal;
    }
    .bg-grey .catagory-text {
        color: black;
    }
</style>
