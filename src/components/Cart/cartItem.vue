<template>
    <div class="card mb-3" style="width: 100%;">
        <div class="card-body py-0 pl-2">
            <div class="row">
                <div class="col-4 p-0 card-img">
                    <img :src="item.ImageUrl">
                </div>
                <div class="col-8 py-0 pr-1">
                    <a src="#" @click="removeItem(index)" class="float-right"><i class="fas fa-times"></i></a>
                    <h4>{{item.Name}}</h4>
                    <p class="text-muted m-0">{{item.Description}}</p>
                    <p class="d-inline-block price m-0 mr-5">{{item.Price}}</p> <span><i class="fas fa-times"></i>{{item.Quantity}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cartItem",
        props: ['itemIndex','item'],
        data() {
            return {
            }
        },
        mounted() {
            console.log('fromCart',this.$store.state.cartData.Meal);
        },
        methods: {
            removeItem(i) {
                console.log('indexSent',i);
                this.$emit('removeInCart',i);
            }
        }
    }
</script>

<style scoped>
    .slected-bg {
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 667px;
        border-radius: 0px 500px 500px 0;
        box-shadow: 37px 17px 7px 0px rgba(0, 0, 0, 0.05);
        width: 97%;
    }

    .food-type {
        position: absolute;
        bottom: 0;
        left: 100px;
        bottom: 100px;
    }
    .food-type p {
        text-align: left;
        color: white;
        font-weight: bold;
        font-size: 40px;
        margin: 0 0;
        text-shadow: 2px 2px 11px #020202;
    }
    .food-type a {
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        background: red;
        margin: 0 20px 0 5px;
        color: white;
        font-weight: bold;
        /*font-family: "Roboto";*/
        font-size: 20px;
        text-transform: uppercase;
    }
    .food-type button {
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        background: red;
        margin: 0 20px 0 5px;
        color: white;
        font-weight: bold;
        /*font-family: "Roboto";*/
        font-size: 20px;
        text-transform: uppercase;
    }
    .food-type p span {
        display: inline-block;
        margin: 0 25px 0 0;
    }
    .shoping-cart {
        background: #8ba939;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        border-radius: 50%;
        text-align: center;
        position: absolute;
        top: 10px;
        right: 15px;
    }
    .new-cart{
        top: 10px;
    }
    .shoping-cart a{
        display: inline-block;
    }
    .shoping-cart img {
        display: inline-block;
        vertical-align: middle;
        padding: 0px 12px;
        max-width: 70%;
    }
    .shoping-cart:hover .cart{
        display: none;
    }
    .cart-hover{
        display: none;
    }
    .shoping-cart:hover .cart-hover{
        display: block;
    }

    .drawer{
        background-color: #fff;
        margin-top: 155px;
        margin-right: 10px;
        border-radius: 10px;
    }

    .btn-checkout{
        background-color: #6A8623;
        color: white;
        font-weight: 500;
    }
    .btn-checkout:hover{
        background-color: #5F7E32;
        color: white;
    }
    .head{
        border-bottom: 1px solid #9C9C9C;
        margin-bottom: 15px;
        padding: 5px 10px;
    }
    .drawer-body{
        padding: 10px;
    }
    .card-img img{
        height: 100%;
        width: 100%;
    }
    .price{
        font-weight: bold;
    }
    /*.multiple i{*/
    /*    font-weight: 100;*/
    /*}*/
    .map-place{
        width: 100%;
        height:300px;
    }
    .map-place img{
        width: 100%;
        height: 100%;
    }
    .btn-main button{
        border-radius: 0;
        background-color: #363a4b;
        color: white;
    }
    .active{
        background-color: #8ba939 !important;
    }
    .invoice{
        /*margin: 10px 40px;*/
    }
    .invoice p{
        font-size: 20px;
        font-weight: 600;
        /*display: inline-block;*/
        padding-left:40px;
        margin: 0;
        padding-bottom: 0;
    }
    .invoice .price p{
        text-align: right;
        font-size: 18px;
        font-weight: 600;
        padding-right:20px;
        padding-bottom: 0;
    }
    .invoice .col-8{
        padding:0;
    }
    .invoice .col-4{
        padding: 0;
    }
    .invoice .small-text{
        font-size:12px;
        margin-top: -5px;
    }
    /*.invoice span{
        float: right;
        font-size: 18px;
        font-weight: 600;
        padding: 0 20px;
    }*/
    .sec-heading{
        color: #8ba939;
        font-size: 26px;
    }
    a.link-color h2{
        font-size: 26px;
    }
    a.link-color{
        color: #8ba939;
    }
    .card-block{
        box-shadow:0px 0px 7px 1px #E8E8E9;
        width: 90%;
        border-radius: 15px;
    }
    .card-block p{
        font-size: 18px;
        font-weight: 400;
    }
    .btn-continue{
        margin: 20px 0;
    }
    .btn-continue button{
        width: 70%;
        height: 70px;
        border-radius: 40px;
        color: white;
        font-size: 28px;
        font-weight: 600;
        background-color: #8ba939;
    }
    .btn-continue button:hover{
        background-color: #6A8623;
    }
    a.link-color:hover{
        text-decoration: none;
        color: #5F7E32;
    }

    /*.card-sec{
        display: flex;
        flex-wrap: nowrap;
        min-width: 100%;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        cursor: grab;
    }
    .card--content{
        min-width: 50%;
        display: inline-block;
        margin: 5px;
        flex: 0 0 auto;
    }
.card-sec::-webkit-scrollbar {
        display: none;
    }*/
    .demo{
        /*width: 100px;*/
        /*height: 100px;*/
        background-color: #8f8f90;
    }
</style>
