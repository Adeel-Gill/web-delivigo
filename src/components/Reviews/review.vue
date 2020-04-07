<template>
    <div class="card mb-2">
        <div class="card-body py-0">
            <div class="row">
                <div class="col-md-2 px-1">
                    <div class="text-center">
                        <img :src="baseURL + review.UrlImage" class="img image-size card-img rounded-circle img-fluid"/>
                        <p class="text-secondary ">15 Minutes Ago</p>
                    </div>
                </div>
                <div class="col-md-10 px-1 text-justify">
                    <p class="stars">
                        <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{{review.FullName}}</strong></a>
                        <span v-for="index in review.Rates" :key="index" class="float-right"><i class="text-warning fa fa-star"></i></span>
                    </p>
                    <div class="clearfix"></div>
                    <p class="card-text">{{review.Comments}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {baseAddress} from "../../main";

    export default {
        name: "review",
        props: ['review'],
        data() {
            return {
                baseURL: baseAddress
            }
        }
    }
</script>

<style scoped>
    .details-restaurant {
        position: relative;
    }
    /*[data-v-6db8e78f]*/
    .description-about {
        background: #f2f2f2;
        padding: 30px;
        position: absolute;
        width: 100%;
        top: -132px;
        right: -80px;
    }
    .name-desc {
        float: left;
    }
    .name-desc h4 {
        color: #8ba939;
        /*font-family: "pantonBold";*/
        font-size: 40px;
        font-weight: 600;
        margin: 0;
    }
    .name-desc p {
        color: #8f8f90;
        font-size: 23px;
        /*font-family: "pantonSemi";*/
        font-weight: 500;
        text-align: left;
        margin: 0;
    }
    .restaurnt-address p {
        text-align: left;
        margin: 0;
        /*font-family: "pantonSemi";*/
        font-size: 18px;
        font-weight: 500;
    }
    .reviews {
        float: right;
        padding: 25px 0;
    }
    .reviews a {
        color: #8ba939 !important;
        font-family: "pantonSemi";
        /*font-weight: 600;*/
        font-size: 20px;
        cursor: pointer;
    }
    .reviews a:hover{
        text-decoration: underline !important;
        color: #6A8623 !important;
    }
    .restaurnt-address{
        margin: 30px 0;
    }
    i.fas.fa-map-marker-alt {
        padding: 0 7px 0 0px;
    }
    .rating p {
        margin: 0;
        text-align: left;
        font-family: "pantonSemi";
        font-size: 22px;
        /*font-weight: 600;*/
    }
    i.fas.fa-star {
        color: #8ba939;
    }
    .light{
        color: #8f8f90;
        font-weight: normal;
    }
    .delivery p {
        margin: 0;
        text-align: left;
        font-family: "pantonSemi";
        font-size: 20px;
        font-weight: 600;
    }
    i.fas.fa-euro-sign {
        color: #8ba939;
    }
    .mints p {
        margin: 0;
        text-align: right;
        font-family: "pantonSemi";
        font-size: 20px;
        /*font-weight: 600;*/
    }
    i.far.fa-clock {
        color: #8ba939;
    }
    .stars i{
        font-size: 22px;
        padding-left: 5px;
    }
    .image-size{
        width: 70%;
        height: 70%;
    }
    .card-text{
        font-size: 15px;
    }
    .card{
        box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.4);
    }
    @media screen and (max-width: 960px) and (min-width: 768px){
        .description-about{
            padding: 20px;
        }

        .name-desc h4{
            font-size: 37px;
        }
        .name-desc p{
            font-size: 21px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 18px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 19px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:19px ;
        }
        .delivery p{
            font-size: 19px;
        }
        .rating p{
            font-size: 19px;
        }
    }
    @media screen and (max-width: 767px) and (min-width: 561px){
        .description-about{
            top: -390px;
            right: 0px;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 36px;
        }
        .name-desc p{
            font-size: 21px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 19px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:19px ;
        }
        .delivery p{
            font-size: 19px;
        }
        .rating p{
            font-size: 19px;
        }
    }
    @media screen and (max-width: 560px) and (min-width: 401px){
        .description-about{
            top: -390px;
            right: 0px;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 34px;
        }
        .name-desc p{
            font-size: 20px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 18px;
            padding: 0;
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:18px ;
        }
        .delivery p{
            font-size: 18px;
        }
        .rating p{
            font-size: 18px;
        }

    }
    @media screen and (max-width: 400px){
        .description-about{
            top: -390px;
            right: 0px;
            padding: 20px;
        }
        .name-desc h4{
            font-size: 31px;
        }
        .name-desc p{
            font-size: 19px;
        }
        .restaurnt-address{
            margin: 20px 0;
        }
        .restaurnt-address p{
            font-size: 17px;
            /*margin: 10px 0;*/
        }
        .reviews a{
            font-size: 17px;
            /*padding: 0;*/
        }
        .reviews{
            padding: 10px 0 0 0;
        }
        .mints p{
            font-size:17px ;
        }
        .delivery p{
            font-size: 17px;
        }
        .rating p{
            font-size: 17px;
        }


    }
</style>
