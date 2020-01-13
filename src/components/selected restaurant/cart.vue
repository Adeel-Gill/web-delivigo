<template>
    <div>
        <div class="slected-bg" :style="{'background-image': 'url('+image+')'}">
           <div class="food-type">
                <p><span>€</span><span> €</span><span> €</span><span>€</span></p>
                <button
                        v-for="foodType in foodTypes.slice(0,6)"
                        style="margin-top: 5px"
                        :key="foodType"
                        @click="navigateTo(foodType.Id)" >{{foodType.Name}}</button>
            </div>
        </div>
        <div>
            <div @click = "handleToggleDrawer" style="margin-top: 60px; margin-right: 50px">
                <fab
                        style="margin-top: 60px; margin-right: 50px"
                        position="top-right"
                        position-type="absolute"
                        ripple-show="true"
                        ripple-color="dark"
                        bg-color="#8ba939"
                        main-tooltip="Cart"
                        main-icon="shopping_cart"
                        enable-rotation="false"
                ></fab>
            </div>
            <vue-drawer-layout
                    ref="drawer"
                    drawer-position="right"
                    :reverse="false"
                    :drawer-width="400"
                    @mask-click="handleMaskClick">
                <div class="drawer" slot="drawer" style="">
                    <div class="head">
                        <h3 class="d-inline-block">Basket</h3>
<!--                        <router-link to="/checkout"></router-link>-->
                        <button class="btn btn-submit float-right" v-b-modal.checkout>Proceed to checkout</button>
                    </div>
                    <div class="drawer-body px-3">
                        <!-- card start-->
                    <div class="card mb-3" style="width: 100%;">
                        <div class="card-body py-0 pl-2">
                            <div class="row">
                            <div class="col-4 p-0 card-img">
                            <img src="../../../public/images/select-item1.png">
                            </div>
                            <div class="col-8 py-0 pr-1">
                                <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                <h4>Burger</h4>
                                <p class="text-muted m-0">Laudiatum consesus</p>
                                <p class="d-inline-block price m-0 mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                            </div>
                        </div>
                        </div>
                    </div>

                        <div class="card mb-3" style="width: 100%;">
                            <div class="card-body py-0 pl-2">
                                <div class="row">
                                    <div class="col-4 p-0 card-img">
                                        <img src="../../../public/images/select-item1.png">
                                    </div>
                                    <div class="col-8 py-0 pr-1">
                                        <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                        <h4>Burger</h4>
                                        <p class="text-muted m-0">Laudiatum consesus</p>
                                        <p class="m-0 d-inline-block price mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-3" style="width: 100%;">
                            <div class="card-body py-0 pl-2">
                                <div class="row">
                                    <div class="col-4 p-0 card-img">
                                        <img src="../../../public/images/select-item1.png">
                                    </div>
                                    <div class="col-8 py-0 pr-1">
                                        <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                        <h4>Burger</h4>
                                        <p class="text-muted m-0">Laudiatum consesus</p>
                                        <p class="m-0 d-inline-block price mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end-->
                    </div>
                </div>
                <div class="content" slot="content" >

                </div>
            </vue-drawer-layout>
        </div>
        <b-modal size="lg" hide-footer class="my-modal" body-class="p-0" id="checkout" title="Checkout">
            <div class="container--fluid">
                <div class="map-place">
                    <img src="../../../public/images/map.png">
                </div>
                <div class="row mx-0 btn-main">
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg"><h3 class="m-0">Delivery</h3><h4 class="m-0"> Around 30 Min</h4><p class="m-0"><small>total distance would be 10km</small></p></button>
                    </div>
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg active"><h3 class="m-0">Delivery</h3><h4 class="m-0"> Around 30 Min</h4></button>
                    </div>
                </div>

            </div>
            <div class="container p-4">
                <h2 class="sec-heading"><i class="far fa-calendar-check"></i> Scheduled order: Today 16:47 <a href="#"><i class="fas fa-plus"></i></a></h2>
                <p class="text-muted">Desired delivery time + 10 min</p>
                <div class="row" style="box-sizing: border-box;">
                    <div class="col-6">
                    <div class="card p-0 mb-3" style="width: 100%;">
                        <div class="card-body py-0 pl-2">
                            <div class="row">
                                <div class="col-4 p-0 card-img">
                                    <img src="../../../public/images/select-item1.png">
                                </div>
                                <div class="col-8 py-0 pr-1">
                                    <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                    <h4>Burger</h4>
                                    <p class="text-muted m-0">Laudiatum consesus</p>
                                    <p class="m-0 d-inline-block price mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div class="col-6">
                        <div class="card p-0 mb-3" style="width: 100%;">
                            <div class="card-body py-0 pl-2">
                                <div class="row">
                                    <div class="col-4 p-0 card-img">
                                        <img src="../../../public/images/select-item1.png">
                                    </div>
                                    <div class="col-8 py-0 pr-1">
                                        <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                        <h4>Burger</h4>
                                        <p class="text-muted m-0">Laudiatum consesus</p>
                                        <p class="m-0 d-inline-block price mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card p-0 mb-3" style="width: 100%;">
                            <div class="card-body py-0 pl-2">
                                <div class="row">
                                    <div class="col-4 p-0 card-img">
                                        <img src="../../../public/images/select-item1.png">
                                    </div>
                                    <div class="col-8 py-0 pr-1">
                                        <a src="#" class="float-right"><i class="fas fa-times"></i></a>
                                        <h4>Burger</h4>
                                        <p class="text-muted m-0">Laudiatum consesus</p>
                                        <p class="m-0 d-inline-block price mr-5">129232.00</p> <span><i class="fas fa-times"></i> 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <a href="#"><h2 class="sec-heading"><i class="fas fa-plus"></i> Add more items</h2></a>
                <a href="#">
                    <h2 class="sec-heading"><i class="fas fa-pepper-hot"></i> Add special cooking Intructions</h2></a>
                <h2>People Also Added</h2>

                <div class="row">
<!--                    <section class="card-sec">-->
<!--                        <div class="card&#45;&#45;content">-->
<!--                        <div class="card card-block">-->
<!--                        <div class="card-body">-->
<!--                            <p class="m-0">Murphy</p>-->
<!--                            <p class="m-0">$ 33</p>-->
<!--                            <a class="card-link"><i class="fas fa-plus"></i> Add more</a>-->
<!--                        </div>-->
<!--                        </div>-->
<!--                        </div>-->

<!--                            <div class="card&#45;&#45;content">-->
<!--                            <div class="card card-block">-->
<!--                        <div class="card-body">-->
<!--                            <p class="m-0">Murphy</p>-->
<!--                            <p class="m-0">$ 33</p>-->
<!--                            <a class="card-link"><i class="fas fa-plus"></i> Add more</a>-->
<!--                        </div>-->
<!--                        </div>-->
<!--                        </div>-->

<!--                        <div class="card&#45;&#45;content">-->
<!--                            <div class="card card-block">-->
<!--                            <div class="card-body">-->
<!--                            <p class="m-0">Murphy</p>-->
<!--                            <p class="m-0">$ 33</p>-->
<!--                            <a class="card-link"><i class="fas fa-plus"></i> Add more</a>-->
<!--                        </div>-->
<!--                        </div>-->
<!--                        </div>-->
<!--                    </section>-->

                    <div class="col-12">
                    <VueSlickCarousel v-bind="settings">
                        <div>
                        <div class="card card-block">
                            <div class="card-body">
                                <p class="m-0">Murphy</p>
                                <p class="m-0">$ 33</p>
                            </div>
                        </div>
                        </div>

                        <div>
                        <div class="card card-block">
                            <div class="card-body">
                                <p class="m-0">Murphy</p>
                                <p class="m-0">$ 33</p>
                            </div>
                        </div>
                        </div>

                        <div>
                        <div class="card card-block">
                            <div class="card-body">
                                <p class="m-0">Murphy</p>
                                <p class="m-0">$ 33</p>
                            </div>
                        </div>
                        </div>
                    </VueSlickCarousel>
                </div>
                </div>
                <div class="row">
                    <div class="col-8">
                <h2 class="d-inline-block sec-heading">Shipping Address</h2>
                <p class="float-right mt-2"><a href="#">Add New</a></p>
                    </div>

                    <div class="col-12">
                        <VueSlickCarousel v-bind="settings">
                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </div>


                <div class="row">
                    <div class="col-8">
                        <h2 class="d-inline-block sec-heading">Contact Info</h2>
                        <p class="float-right mt-2"><a href="#">Add New</a></p>
                    </div>

                    <div class="col-12">
                        <VueSlickCarousel v-bind="settings">
                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </div>


                <div class="row">
                    <div class="col-8">
                        <h2 class="d-inline-block sec-heading">Payment Method</h2>
                        <p class="float-right mt-2"><a href="#">Add New</a></p>
                    </div>

                    <div class="col-12">
                        <VueSlickCarousel v-bind="settings">
                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">Murphy</p>
                                        <p class="m-0">$ 33</p>
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </div>

                <div class="row">
                    <h2 class="sec-heading p-3">Prices in EUR, Incl. taxes</h2>
                    <div class="w-100 invoice">
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Small Delivery Order more</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    <p>Item Subtotal</p><span>20</span><br>
                    </div>
                </div>

                <div class="row w-100 btn-continue">
                    <button type="button" class="btn mx-auto">Place the Order</button>
                </div>
            </div>
        </b-modal>

    </div>

</template>
<script>
    import {baseAddress} from "../../main";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import fab from 'vue-fab';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    import VueSlickCarousel from 'vue-slick-carousel'

    export default {
    data(){
        return{
            foodTypes:[],
            cartImg:'../images/cart.png',
            cartHover:'../images/cart-hover.png',
            baseUrl: baseAddress,
            restaurant: {},
            image: '',
            fabActions: [{
                name: 'cache',
                icon: 'cached'
            }],
            allImages: [],
            restaurantImages: [],
            resID: null,
            mealID: null,
            settings: {
                "edgeFriction": 0.35,
                "slidesToScroll": 1,
                "centerMode": true,
                "arrows":false,
                "centerPadding": "20px",
                "focusOnSelect": true,
                "infinite": true,
                "slidesToShow": 2,
                "speed": 500,
                "swipeToSlide":true,
                "touchMove":true
            },
        }
    },
        components: {
        fab,
            VueSlickCarousel ,
        },
    mounted() {
        this.$root.$on('mealMenu', response => {
            this.foodTypes = response;
        });
        this.$root.$on('restaurantImages', response => {
            this.restaurantImages = response;
            this.restaurantImages.forEach(image => {
                this.allImages.push(this.baseUrl+image.ImageUrl);
                console.log('allImages',this.allImages);
            })
        });
        this.$root.$on('restaurant', response => {
            this.restaurant = response;
            this.image = this.baseUrl+this.restaurant.ImageUrl;
        })
    },
    methods: {
        handleToggleDrawer() {
            console.log('insideToggle',this.$refs.drawer);
            this.$refs.drawer.toggle();
        },
        handleMaskClick() {
            console.info('mask-click');
            this.$refs.drawer.toggle(false);
        },
            navigateTo(id) {
                console.log('insideNavigateMethod', id);
                if(id) {
                    this.$router.push({path:'/restaurant/'+this.$route.params.id,query:{mealID:id}});
                    this.fetchRestaurantMealById(this.$route.params.id,id);
                } else {
                    alert('Please select menu other than popular!');
                }
            },
        showNotification(type, title, message) {
            this.$notify({
                group: 'foo',
                type: type,
                title: title,
                text: message,
                duration: 2000
            })
        },
        async fetchRestaurantMealById(resId, mealId) {
                console.log('bothIDs'+resId+mealId);
            fetchRestaurantMealsById(resId, mealId).then(response => {
                this.$root.$emit('popularFood',response.Meals);
                this.$root.$emit('isCustomMeal', true);
            }, error => {
                console.log(error);
                this.showNotification('error','Error','Error occurred please try later');
            })
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
    font-family: "Roboto";
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
    font-family: "Roboto";
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
    margin-top: 80px;
    border-radius: 10px;
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
        margin: 10px 40px;
    }
    .invoice p{
        font-size: 20px;
        font-weight: 600;
        display: inline-block;
        padding: 0 20px;
        margin: 0;
    }
    .invoice span{
        float: right;
        font-size: 18px;
        font-weight: 600;
        padding: 0 20px;
    }
    .sec-heading{
        color: #8ba939;
        font-size: 26px;
    }
    .card-block{
        box-shadow:2px 0px 5px 0px #8f8f90;
        width: 90%;
        /*margin-left: 30px;*/
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
