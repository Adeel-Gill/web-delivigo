<template>
    <div>
        <!-- <div class="slected-bg" :style="{'background-image': 'url('+`${getImage()}`+')'}"> -->
        <div class="slected-bg" :style="{'background-image': 'url('+`${getImage(resDetail.ImageUrl)}`+')'}">
            <div class="food-type">
                <p><span>{{resDetail.ApproximateCostPerPerson}}</span></p>
                <button
                        v-for="foodType in foodTypes"
                        style="margin-top: 5px"
                        :key="foodType.Id"
                         >{{foodType.Name}}</button>
            </div>
        </div>
        <div class="cart-btn">
            <div @click = "handleToggleDrawer" style="margin-top: 60px;">
                <!--<v-badge
                color="green"
                left
                overlap
                >
                <v-icon large>fas fa-shopping-cart</v-icon>
            </v-badge>-->
                <fab
                        style="margin-top: 80px;"
                        position="top-right"
                        position-type="fixed"
                        ripple-show="true"
                        ripple-color="dark"
                        bg-color="#8ba939"
                        main-tooltip="Cart"
                        fixed-tooltip="true"
                        main-icon="shopping_cart"
                        enable-rotation="false"

                >
                </fab>

            </div>
            <vue-drawer-layout
                    ref="drawer"
                    drawer-position="right"
                    :reverse="false"
                    :drawer-width="400"
                    @mask-click="handleMaskClick">
                <div class="drawer" slot="drawer" style="">
                    <div class="head">
                        <h3 class="d-inline-block">{{newLang.basket}}</h3>
                        <!--                        <router-link to="/checkout"></router-link>-->
                        <button type="button" class="btn btn-checkout float-right" :disabled="doProceed" @click="startCheckout" >{{newLang.proceedToCheckout}}</button>
                    </div>
                    <div class="drawer-body px-3">
                        <!-- card start-->
                        <div v-if="cartItems.length">
                            <app-cart-items v-for="(item,index) in cartItems"
                                            :key="item.Id"
                                            :itemIndex="index"
                                            :item="item"
                                            @removeInCart="removeItem(item.Id,item.CartId)"></app-cart-items>
                        </div>
                        <div v-else>
                            <h3 class="drwer-else">{{newLang.addItems}}</h3>
                        </div>
                        <!-- end-->
                    </div>
                </div>
                <div class="content" slot="content" >

                </div>
            </vue-drawer-layout>
        </div>
        <b-modal id="instruction" ref="modal"
                 @ok="handleOk"
                 :title="newLang.enterInstructions">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                        :state="nameState"
                        :label="newLang.instruction"
                        label-for="name-input"
                        :invalid-feedback="newLang.instructionRequired"
                >
                    <b-form-input
                            id="name-input"
                            v-model="instruction"
                            :state="nameState"
                            required
                    ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-modal size="lg" scrollable hide-footer class="my-modal" body-class="p-0" id="checkout" :title="newLang.checkout">
            <div class="container--fluid">
                <div class="map-place">
                    <img src="../../../public/images/map.png">
                </div>
                <div class="row mx-0 btn-main">
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg" @click="forDelivery" :class="[isDelivery ? 'active' : 'notActive']" ><h3 class="m-0">{{newLang.delivery}}</h3><h3 class="m-0"> {{newLang.around}}</h3><p class="m-0"><small>total distance would be 10km</small></p></button>
                    </div>
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg " @click="forPickup" :class="[!isDelivery ? 'active' : 'notActive']"><h3 class="m-0">{{newLang.pickup}}</h3><h4 class="m-0"></h4></button>
                    </div>
                </div>

            </div>
            <div class="container p-4">
                <h2 class="sec-heading mb-2"><i class="far fa-calendar-check"></i> {{newLang.scheduleOrder}}&nbsp;<i class="fas fa-plus"></i></h2>
                <VueCtkDateTimePicker
                        v-model="time"
                        :only-time="true"
                        :label="newLang.selectTime"
                        output-format="hh:mm:ss"
                        format="hh:mm a"></VueCtkDateTimePicker>
                <p class="text-muted mt-1">{{newLang.desiredDeliveryTime}}</p>
                <div class="row" style="box-sizing: border-box;">
                    <app-checkout-cart-item v-for="(item, index) in cartItems" :key="item.Id"
                                            :itemIndex="index"
                                            @removeItemInCart="itemRemoveInOrder(item.Id,item.CartId)"
                                            :item="item"></app-checkout-cart-item>
                </div>
                <div class="pl-4">
                <a href="#" class="link-color"><h2><i class="fas fa-plus"></i> {{newLang.addMoreItems}}</h2></a>
                <div v-if="emptyInstruction">
                    <h2><p @click="showInstruction" class="link-color" >
                        <i class="fas fa-pepper-hot"></i> {{newLang.addSpecial}}</p></h2>
                </div>
                <div v-else>
                    <a @click="showInstruction" class="link-color" >
                        <h2><i class="fas fa-pepper-hot"></i>{{this.instruction | truncate}}</h2></a>
                </div>
                </div>
                <div class="row mt-4">
                <h2 class="sec-heading">{{newLang.peopleAlsoAdded}}</h2>
                    <div class="col-12">
                        <VueSlickCarousel v-bind="settings">

                        </VueSlickCarousel>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-12 col-12 pb-2">
                        <h2 class="d-inline-block sec-heading">{{newLang.shippingAddress}}</h2>
                        <p class="float-right d-inline p-0"><router-link to="/delivery">{{newLang.addNew}}</router-link></p>
                    </div>
                    <div class="col-12 p-0">
                        <div class="owl-carousel owl-theme">
                            <div v-for="address in allAddresses" :class="['card-width']" :key="address.Id">
                                <div>
                                    <div class="card card-block">
                                        <div class="card-body">
                                            <p class="m-0 text-truncate">{{address.Apartment}}</p>
                                            <p class="m-0 text-truncate">{{address.AddressLine}}</p>
                                            <div v-if="!address.IsDefault" class="default-btn">
                                                <button class="btn btn-primary" @click="newDefaultAddress(address.Id, address.IsDefault)" :checked="address.IsDefault">{{newLang.setDefault}}</button>
                                            </div>
                                            <div v-else class="default-btn">
                                                <button class="btn btn-dark" disabled>{{newLang.default}}</button>
                                                {{setAddressID(address)}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mt-4">
                    <div class="col-8 pb-2">
                        <h2 class="d-inline-block sec-heading">{{newLang.contactInfo}}</h2>
                    </div>

                    <div class="col-12 py-0 px-4">
                        <div class="card card-block w-100">
                            <div class="card-body">
                                <p class="m-0">{{userData.FirstName + ' ' + userData.LastName }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-12 col-12 pb-2">
                        <h2 class="d-inline-block sec-heading">{{newLang.paymentMethod}}</h2>
                        <p class="float-right p-0"><router-link to="/billing">{{newLang.addNew}}</router-link></p>
                    </div>

                    <div class="col-12 p-0">
                        <div class="owl-carousel2 owl-theme">
                            <div v-for="card in allCards" :class="['card-width']" :key="card.Id">
                                <div id="a123" >
                                    <div class="card card-block">
                                        <div class="card-body">
                                            <p class="m-0">{{card.Brand}} .... .... {{card.CardNumber}}</p>
                                            <p class="m-0">{{newLang.expiresIn}} {{card.Month}}/{{card.Year}}</p>

                                            <div v-if="!card.IsDefault" class="default-btn">
                                                <button class="btn btn-primary"  @click="newDefaultCard(card,card.IsDefault)" :checked="(card.IsDefault)">{{newLang.setDefault}}</button>
                                                <!--                                            <label class="d-inline-block">Default</label>-->
                                            </div>
                                            <div v-else class="default-btn">
                                                <button class="btn btn-dark" disabled>{{newLang.default}}</button>
                                                {{setCardID(card.Id)}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12 pb-2">
                        <h2 class="sec-heading">{{newLang.pricesIn}}</h2>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.itemSubtotal}}</p>
                    </div>
                    <div class="col-4 price">
                        <p>{{subTotal}}</p>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.smallDelivery}} </p>
                    </div>
                    <div class="col-4 price">
                        <p>{{smallDeliveryOrderExtra}}</p>
                    </div>
                </div>

                <!-- <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.delivery}}</p>
                        <p class="small-text">Address lorem ipsum</p>
                    </div>
                    <div class="col-4 price">
                        <p>3.56</p>
                    </div>
                </div> -->
                <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.basicDeliveryFee}}</p>
                    </div>
                    <div class="col-4 price">
                        <p>{{basicDeliveryFee}}</p>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.extraKmDeliveryFee}}</p>
                        <p class="small-text">{{newLang.orderDeliver10KM}}</p>
                    </div>
                    <div class="col-4 price">

                        <p>{{extraKmDeliveryFee.toFixed(2)}}</p>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>{{newLang.total}}</p>
                    </div>
                    <div class="col-4 price">
                        <p>{{totalPrice.toFixed(2)}}</p>
                    </div>
                </div>

                <div class="row w-100 btn-continue">

                    <button type="button" :disabled="disablePlaceOrder" @click="placeOrder()" class="btn mx-auto" >{{newLang.placeOrder}}</button>
                </div>
            </div>
        </b-modal>

    </div>

</template>
<script>
    import {baseAddress} from "../../main";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import {deliveryCharges} from "./Charges";
    import fab from 'vue-fab';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    import VueSlickCarousel from 'vue-slick-carousel';
    import {BBadge} from 'bootstrap-vue';
    import {defaultRestaurantPic} from "../../main";
    import cartItem from "../Cart/cartItem";
    import {getCart} from "../api/Cart";
    import {deleteCartItem} from "../api/Cart";
    import {retrieveCustomerAllCards} from "../api/CardAndPayments";
    import {getAllCustomerAddresses} from "../api/DeliveryAddress";
    import {fetchUserProfile} from "../api/Profile";
    import {setDefaultAddress} from "../api/DeliveryAddress";
    import {markDefaultCard} from "../api/CardAndPayments";
    import checkoutCartItem from "../Cart/checkoutCartItem";
    import {placeOrder} from "../api/PlaceOrder";
    import {calculateDistance} from "../api/CalculateDistance";
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
    import {fetchRestaurantById} from "../api/FilterRestaurants";
    import 'vuetify/dist/vuetify.min.css'
    import 'owl.carousel/dist/assets/owl.carousel.css';
    import 'owl.carousel/dist/assets/owl.carousel2.css';
    import 'owl.carousel';
    import 'jquery';

    export default {
        props: ['newLang', 'resDetail'],
        data(){
            return{
                foodTypes:[],
                allAddresses: [],
                allCards: [],
                doProceed: false,
                disablePlaceOrder: true,
                cartImg:'../images/cart.png',
                cartHover:'../images/cart-hover.png',
                baseUrl: baseAddress,
                instruction: '',
                nameState: null,
                restaurant: {},
                emptyInstruction: true,
                time: '',
                scheduleTime: '',
                notEmpty: true,
                subTotal: 0,
                addID: null,
                cardID: null,
                lon1: 0,
                lat1: 0,
                lon2: 0,
                lat2: 0,
                km: 0,
                cartItems: [],
                smallDeliveryOrderExtra: 0,
                basicDeliveryFee: 0,
                extraKmDeliveryFee: 0,
                isDelivery: true,
                isSchedule: false,
                totalPrice: 0,
                image: '',
                fabActions: [{
                    name: 'cache',
                    icon: 'cached'
                }],
                allImages: [],
                paramID: null,
                userData: {},
                resData: {},
                newResData: {},
                cartData: [],
                restaurantImages: [],
                resID: null,
                isOpen: false,
                mealID: null,
                settings: {
                    "edgeFriction": 0.35,
                    "slidesToScroll": 1,
                    "centerMode": true,
                    "arrows":false,
                    "centerPadding": "20px",
                    "focusOnSelect": true,
                    "infinite": false,
                    "slidesToShow": 2,
                    "speed": 500,
                    "swipeToSlide":true,
                    "touchMove":true
                },
                orderObject: {},
                card: {
                    CustomerId: null,
                    SourceId: "",
                    CardId: null,
                },
            }
        },
        components: {
            bBage: BBadge,
            appCartItems: cartItem,
            appCheckoutCartItem: checkoutCartItem,
            VueCtkDateTimePicker,
            fab,
            VueSlickCarousel ,
        },
        filters: {
            truncate(val) {
                let total = 26;
                if(val.length <= total) {
                    return val
                } else {
                    return val.substring(0, total)+ '...';
                }
            }
        },
        updated() {
            console.log('time',this.time);
            if(this.time === '' || this.time == null) {
                this.isSchedule = false;
            } else {
                this.isSchedule = true;
            }

            if(this.instruction === '' || this.instruction == null) {
                this.emptyInstruction = true;
            } else {
                this.emptyInstruction = false;
            }
        },
        created() {
            this.$root.$on('tags', response => {
                this.foodTypes = response;
                console.log('tags', this.foodTypes);
            });
            console.log('inCreated');
            this.$root.$on('restaurantImages', response => {
                this.restaurantImages = response;
                console.log('hereInImages');
                this.restaurantImages.forEach(image => {
                    this.allImages.push(this.baseUrl+image.ImageUrl);
                    // console.log('allImages',this.allImages);
                })
            });
            this.$root.$on("cartItems", response => {
                this.cartItems = response;
                console.log('cartItems', this.cartItems);
            })
            this.$root.$on("itemAddedToCart", response => {
                console.log("here received");
                this.setCount();
                // graphElem.addEventListener('click', function (event) {
                //     event.target.setAttribute('data-before', 'anything');
                // });
            })
            console.log('redID',this.resID,this.$store.state.cartData);
            console.log('redID',this.resID == null);
            console.log('insideTimeOUT',this.$store.state.cartData.length ,this.resID == null);
            if(this.$store.state.cartData.length > 0) {
                console.log('hereInCondition')
                this.resID = this.$store.state.cartData[0].Meal.RestroId;
                this.fetchRestaurant(this.resID);
                this.paramID = this.$route.params.id;
                this.fetchRestaurantByParam(this.paramID);
                // this.$root.$on('restaurant', response => {
                //
                //     console.log('insideCartRestaurant',response.ImageUrl);
                //     // this.resID = this.$store.state.cartData[0].Meals.RestroId;
                //     this.resID = response.Id;
                //     this.resData = response;
                //     console.log('UrlIs',response);
                //     // this.fetchRestaurant(this.resID);
                // })
            } else {
                console.log('here inside else');
                this.paramID = this.$route.params.id;
                this.fetchRestaurantByParam(this.paramID);
            }
           
        },
        mounted() {
             this.setCount();
             this.hideToggle();
        },
        methods: {
            setCount() {
                console.log('items',localStorage.getItem('items'));
                console.log('element',document.getElementsByClassName('fab-wrapper'));
                console.log(document.getElementsByClassName('fab-wrapper'));
                let root = document.documentElement;
                if(this.cartItems.length> 0) {
                    root.style.setProperty('--cart-count', "'"+(Number(this.cartItems.length))+"'");
                    // document.documentElement.style.setProperty('cart-count', '');
                    // document.documentElement.style.setProperty('cart-count', localStorage.getItem('items'));
                // document.getElementsByClassName('fab-wrapper')[0].setAttribute('cart-count','6');
                } else {
                    root.style.setProperty('--cart-count', "'0'");
                    // document.getElementsByClassName('fab-wrapper')[0].attributes[5].value = '0';
                    // document.getElementsByClassName('fab-wrapper')[0].setAttribute('cart-count','0');
                }
                console.log('element',document.getElementsByClassName('fab-wrapper'));
            },
            itemRemoveInOrder(Id,CartId) {
                this.$dialog.confirm('Item will be removed from order. Continue?', {
                    loader: true
                }).then(dialog => {
                    // dialog.loading(false);
                    deleteCartItem(localStorage.getItem('id'),CartId,Id).then(response => {
                        if(!response.HasError) {
                            this.cartItems = response.result;
                            this.checkCartAfterOrderItemDeletion(this.cartItems);
                            this.setCount();
                            // dialog.close();
                            this.showNotification('success','Success','Item removed from cart');
                            dialog.close();
                            dialog.loading(false);
                        } else {
                            this.showNotification('error','Error','Item removing failed');
                            dialog.close();  
                            dialog.loading(false); 
                        }
                    },error=> {
                        this.showNotification('error','Error','Item removing failed');
                        dialog.close();  
                        dialog.loading(false); 
                    })
                    
                }).catch(() => {
                    this.showNotification('info','Info','Deletion cancelled');
                })
            },
            removeItem(id,cartId) {
                this.$dialog.confirm('Item will be removed from cart. Continue?', {
                    loader: true
                }).then(dialog => {
                    
                    // this.$store.dispatch('removeCartItem',i);
                    deleteCartItem(localStorage.getItem('id'),cartId,id).then(response => {
                        if(!response.HasError) {
                            this.cartItems = response.result;
                            this.checkCartAfterDeletion(response.result);
                            this.showNotification('success','Success','Item removed from cart');
                            dialog.close();
                            dialog.loading(false);
                        } else {
                            this.showNotification('error','Error','Item removing failed');
                            dialog.close();  
                            dialog.loading(false); 
                        }
                    },error=> {
                        this.showNotification('error','Error','Item removing failed');
                        dialog.close();  
                        dialog.loading(false); 
                    })
                    
                }).catch(() => {
                    this.showNotification('info','Info','Deletion cancelled');
                })

                console.log('indexReceived',i);
            },
            fetchRestaurantByParam(id) {
                fetchRestaurantById(id).then(response => {
                    if(this.$store.state.cartData.length > 0) {
                        this.resData = response.result.Restaurant;
                    } else {
                        this.lon1 = response.result.Restaurant.Longitude;
                        this.lat1 = response.result.Restaurant.Latitude;
                        this.resData = response.result.Restaurant;
                    }
                    console.log('resData',id,this.resData);
                },error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                })
            },
            fetchRestaurant(id) {
                fetchRestaurantById(id).then(response => {

                    this.lon1 = response.result.Restaurant.Longitude;
                    this.lat1 = response.result.Restaurant.Latitude;
                    console.log('resData',id,this.resData);
                },error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                })
            },
            showInstruction() {
                this.$bvModal.show('instruction');
                if(this.instruction !== '' || this.instruction != null) {
                    document.getElementById('name-input').value = this.instruction;
                    this.emptyInstruction = false;
                } else {
                    this.emptyInstruction = true;
                }
            },
            checkCartAfterOrderItemDeletion() {
                if(this.cartItems.length <= 0) {
                    this.doProceed = true;
                    this.notEmpty = false;
                    this.cartItems =[];
                    this.$bvModal.hide('checkout');
                    this.$store.dispatch('clearCart');

                } else {
                    // for(var i=0; i<this.cartItems.length; i++) {
                    //     var temp = {};
                    //     this.subTotal = 0;
                    //     temp = this.cartItems[i].Meal;
                    //     this.subTotal += temp.Price;
                    // }
                    this.totalPrice = this.cartItems[0].SubTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
                }
            },
            checkCartAfterDeletion(cartDate) {

                if(this.cartItems.length <= 0) {
                    this.doProceed = true;
                    this.notEmpty = false;
                    this.cartItems =[];
                    // this.$store.dispatch('clearCart');
                } else {
                    this.cartItems = cartData;
                    this.doProceed = true;
                }
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },
            handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Push the name to submitted names

                // Hide the modal manually
                this.$nextTick(() => {
                    this.$bvModal.hide('instruction')
                })
            },
            setPlaceOrderObject(cartItems) {
                var dateTime = new Date();
                // this.time = "";
                if(this.isSchedule) {
                    console.log("time::::", this.time);
                    this.scheduleTime = dateTime.getFullYear() + "-"
                        + ('0' + (dateTime.getMonth()+1)).slice(-2) + "-" +
                        ('0' + dateTime.getDate()).slice(-2) + "T" + this.time +
                        ".108Z";
                        console.log('ScheduleTime', this.scheduleTime);
                } else {
                    this.time = "";
                    this.scheduleTime = "";
                }
                this.orderObject = {
                    "RestaurantId" : this.cartItems[0].RestroId,
                    "CustomerId": Number(localStorage.getItem('id')),
                    "AddressId": this.addID,
                    "CardId": this.cardID,
                    "CartId": this.cartItems[0].CartId,
                    "VAT": 5,
                    "IsSchedule": this.isSchedule,
                    "ScheduleTime": this.scheduleTime,
                    "IsDelivery": this.isDelivery,
                    // "ItemSubTotal": this.subTotal,
                    "SmallOrderExtra": this.smallDeliveryOrderExtra,
                    "BasicDeliveryFee": this.basicDeliveryFee,
                    "ExtraKMDeliveryFee": this.extraKmDeliveryFee,
                    // "TotalPrice": this.totalPrice,
                    "Notes": this.instruction,
                    // "OrderItems": cartItems,
                }
            },
            setAddressID(obj) {
                this.addID = obj.Id;
                this.lon2 = obj.Longitude;
                this.lat2 = obj.Latitude;
                console.log('here inside calc1',obj);
                // this.calculateDistance();
            },
            calculateDistance() {
                calculateDistance(this.lon1,this.lat1,this.lon2,this.lat2).then(response => {
                    this.disablePlaceOrder = true;
                    console.log('here inside calc2', response, Number(response),deliveryCharges.allowedKm,'::',response > deliveryCharges.allowedKm);
                    console.log('here inside calc3', response);
                    if(response > deliveryCharges.allowedKm) {
                        this.extraKmDeliveryFee = (response - deliveryCharges.allowedKm) * deliveryCharges.extraKmDeliveryFee;
                        this.disablePlaceOrder = false;
                    } else {
                        console.log('here inside calc4');
                        this.extraKmDeliveryFee = 0;
                        this.disablePlaceOrder = false;
                    }
                    this.basicDeliveryFee = deliveryCharges.basicDeliveryFee;
                    this.totalPrice = this.cartItems[0].SubTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
                    console.log(this.extraKmDeliveryFee);
                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                    this.disablePlaceOrder = true;
                })
            },
            setCardID(id) {
                this.cardID = id;
            },
            checkSmallOrder() {
                if(this.cartItems[0].SubTotal<10) {
                    this.smallDeliveryOrderExtra = 10 - this.cartItems[0].SubTotal;
                } else {
                    this.smallDeliveryOrderExtra = 0;
                }
            },
            async checkCart() {
                if(this.cartItems.length > 0) {
                    this.doProceed = false;
                    this.notEmpty= true;
                    console.log('cartItems',this.cartItems, this.cartItems[0].SubTotal);
                    this.subTotal = 0;
                    this.subTotal = this.cartItems[0].SubTotal
                    // for(var i=0; i<this.cartItems.length; i++) {
                    //     var temp = {};
                    //     temp = this.cartItems[i];
                    //     this.subTotal += temp.Price;
                    // }
                    this.checkSmallOrder();
                    // for(let item of this.cartItems) {
                    //     console.log('item',item,'meal',item.Meal,'itemPrice',item.Meal.Price);
                    //     this.subTotal += item.Meal.Price;
                    // }
                    // this.totalPrice = this.subTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
                } else {
                    this.notEmpty = false;
                    this.doProceed = true;
                }
            },
            forDelivery() {
                this.isDelivery = true;
                this.calculateDistance();
            },
            forPickup() {
                this.isDelivery = false;
                this.extraKmDeliveryFee = 0;
                this.basicDeliveryFee = 0;
                this.totalPrice = this.cartItems[0].SubTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
            },
            placeOrder() {
                this.disablePlaceOrder = true;
                this.setPlaceOrderObject(this.cartItems);
                console.log(this.orderObject);
                placeOrder(this.orderObject).then(response => {
                    console.log(response);
                    if(response.HasErrors) {
                        this.showNotification('error','Error','Order placing failed please try later!');
                        this.disablePlaceOrder = false;
                    } else {
                        this.$store.dispatch('clearCart');
                        this.showNotification('success','Success','Order is successfully placed! Thankyou!');
                        // console.log('orderObject',this.orderObject);
                        this.$router.push('/currentOrder');
                    }
                }, error => {
                    console.log(error);
                    this.disablePlaceOrder = false;
                    this.showNotification('error','Error','Error occurred please try later!');
                })
            },
            addToCart() {

            },
            async newDefaultCard(card,isDefault) {
                if(isDefault) {
                    this.showNotification('info','Info','This card is already default card!');
                } else {
                    this.disablePlaceOrder = true;
                    this.card.CustomerId = card.CustomerId;
                    this.card.SourceId = card.CardStripeId;
                    this.card.CardId = card.Id;
                    markDefaultCard(this.card.CardId, this.card.CustomerId).then(response => {
                        this.disablePlaceOrder = true;
                        if(response.HasErrors) {
                            this.disablePlaceOrder = false;
                            this.showNotification('error','Error','Card is failed to be set as default!');
                        } else {
                            this.allCards = [];
                            this.allCards = response.result;
                            $(document).ready(function(){
                                $('.owl-carousel2').owlCarousel({
                                    loop:true,
                                    dots: false,
                                    autoplay:false,
                                    responsiveClass:false,
                                    margin:20,
                                    nav:false,
                                    lazyLoad:true,
                                    responsive:{
                                        0:{
                                            items:1
                                        },
                                        600:{
                                            items:2
                                        },
                                        1000:{
                                            items:2
                                        }
                                    }
                                });
                            });
                            this.showNotification('success','Success','Card is default now and shown!');
                            this.disablePlaceOrder = false;
                            // retrieveCustomerAllCards(Number(localStorage.getItem('id'))).then(response => {
                            //     if(response.HasError) {
                            //         this.disablePlaceOrder = false
                            //         this.showNotification('error','Error','Error occurred please try later!');
                            //     } else {
                            //         this.allCards = [];
                            //         this.allCards = response.result;
                            //         this.showNotification('success','Success','Card is default now and shown!');
                            //         this.disablePlaceOrder = false;
                            //     }
                            // }, error => {
                            //     console.log(error);
                            //     this.disablePlaceOrder = false;
                            //     this.showNotification('error','Error','Error occurred please try later!');
                            // })
                        }
                    }, error => {
                        console.log(error);
                        this.showNotification('error','Error','Default setting failed please try later!');
                        this.disablePlaceOrder = false;
                    })
                }
            },
            async newDefaultAddress(id, isDefault) {
                if(isDefault) {
                    this.showNotification('info','Info','This address is already default one!');
                } else {
                    setDefaultAddress(Number(localStorage.getItem('id')),id).then(response => {
                        this.disablePlaceOrder = true;
                        if(response.HasErrors) {
                            this.disablePlaceOrder = false;
                            this.showNotification('error','Error','Default setting failed please try later!');
                        } else {
                                this.allAddresses = [];
                                this.allAddresses = response.result;
                                $(document).ready(function(){
                                    $('.owl-carousel').owlCarousel({
                                        loop:true,
                                        dots: false,
                                        autoplay:false,
                                        responsiveClass:false,
                                        margin:20,
                                        nav:false,
                                        lazyLoad:true,
                                        responsive:{
                                            0:{
                                                items:1
                                            },
                                            600:{
                                                items:2
                                            },
                                            1000:{
                                                items:2
                                            }
                                        }
                                    });
                                });
                                this.setAddressID(this.allAddresses[0]);
                                this.showNotification('success','Success','Address is default and shown!');
                                console.log('isDelivery',this.isDelivery);
                                if(this.isDelivery) {
                                    this.calculateDistance();
                                } else {
                                    this.disablePlaceOrder = false;
                                }
                            // getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                            //     this.allAddresses = [];
                            //     this.allAddresses = response.result;
                            //     this.setAddressID(this.allAddresses[0]);
                            //     this.showNotification('success','Success','Address is default and shown!');
                            //     console.log('isDelivery',this.isDelivery);
                            //     if(this.isDelivery) {
                            //         this.calculateDistance();
                            //     } else {
                            //         this.disablePlaceOrder = false;
                            //     }
                            // }, error => {
                            //     console.log(error);
                            //     this.showNotification('error','Error','Please try later error occurred');
                            // })
                        }
                    }, error=> {
                        console.log(error);
                        this.showNotification('error','Error','Default setting failed please try later!');
                        this.disablePlaceOrder = false;
                    })
                }
            },
            async startCheckout() {
                console.log('start');
                this.$bvModal.show('checkout');
                 this.hideToggle();
                if(localStorage.getItem('id') == null|| localStorage.getItem('id') === 'null' || localStorage.getItem('isLogin') === false) {
                    this.showNotification('info','Info','Please login first to place order');
                    localStorage.setItem('isRes', this.paramID);
                    this.$router.push('/signin')
                } else {
                    localStorage.setItem('isRes', 'false');
                    this.basicDeliveryFee = deliveryCharges.basicDeliveryFee;
                   
                    console.log('start2');
                    console.log('cartItems',this.cartItems);
                    fetchUserProfile(Number(localStorage.getItem('id'))).then(response => {
                        console.log('start3');
                        this.userData = response.result;
                        getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                            console.log('start4');
                            if(response.HasErrors) {
                                this.showNotification('Address fetching please try later!');
                                this.disablePlaceOrder = true;
                            } else {
                                this.allAddresses = response.result;
                                $(document).ready(function(){
                                    $('.owl-carousel').owlCarousel({
                                        loop:true,
                                        dots: false,
                                        autoplay:false,
                                        responsiveClass:false,
                                        margin:20,
                                        nav:false,
                                        lazyLoad:true,
                                        responsive:{
                                            0:{
                                                items:1
                                            },
                                            600:{
                                                items:2
                                            },
                                            1000:{
                                                items:2
                                            }
                                        }
                                    });
                                });
                                if(this.allAddresses.length > 0) {
                                    this.allAddresses = response.result;
                                    this.addID = this.allAddresses[0].Id;
                                    this.lon2 = this.allAddresses[0].Longitude;
                                    this.lat2 = this.allAddresses[0].Latitude;
                                    console.log('start5');
                                    retrieveCustomerAllCards(Number(localStorage.getItem('id'))).then(response => {
                                        console.log('start5');
                                        if(response.HasErrors) {
                                            this.showNotification('error','Error','Error occurred please try later!');
                                            this.disablePlaceOrder = true;
                                        } else {
                                            this.allCards = response.result;
                                            console.log(this.allCards,'herehere',response,' break ::',response.CustomerCards);
                                            if(this.allCards.length > 0) {
                                                console.log('cards',this.allCards);
                                                this.allCards = response.result;
                                                $(document).ready(function(){
                                                    $('.owl-carousel2').owlCarousel({
                                                        loop:true,
                                                        dots: false,
                                                        autoplay:false,
                                                        responsiveClass:false,
                                                        margin:20,
                                                        nav:false,
                                                        lazyLoad:true,
                                                        responsive:{
                                                            0:{
                                                                items:1
                                                            },
                                                            600:{
                                                                items:2
                                                            },
                                                            1000:{
                                                                items:2
                                                            }
                                                        }
                                                    });
                                                });
                                                calculateDistance(this.lon1,this.lat1,this.lon2,this.lat2).then(response => {
                                                    console.log('start6');
                                                    this.disablePlaceOrder = true;
                                                    console.log('here inside calc2', Number(response),deliveryCharges.allowedKm,'::',response > deliveryCharges.allowedKm);
                                                    console.log('here inside calc3', response);
                                                    if(response.result.Distance > deliveryCharges.allowedKm) {
                                                        this.extraKmDeliveryFee = (response.result.Distance - deliveryCharges.allowedKm) * deliveryCharges.extraKmDeliveryFee;
                                                        this.disablePlaceOrder = false;
                                                    } else {
                                                        console.log('here inside calc4');
                                                        this.extraKmDeliveryFee = 0;
                                                        this.disablePlaceOrder = false;
                                                    }
                                                    this.totalPrice = this.cartItems[0].SubTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
                                                    console.log('start7',this.cartItems[0].SubTotal,this.extraKmDeliveryFee,this.smallDeliveryOrderExtra,this.basicDeliveryFee);
                                                }, error => {
                                                    console.log(error);
                                                    this.showNotification('error','Error','Error occurred please try later!');
                                                    this.disablePlaceOrder = true;
                                                })


                                            } else {
                                                this.$dialog.confirm('No card found! Please add card to place order. Continue?', {
                                                    loader: true
                                                }).then(dialog => {
                                                    dialog.loading(false);
                                                    this.$router.push('/billing');
                                                    dialog.close();
                                                }).catch(() => {
                                                    this.showNotification('info','Info','Add card to place order please.');
                                                    this.disablePlaceOrder = true;
                                                    this.hideModal();
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    this.allAddresses = [];
                                    this.$dialog.confirm('No address found add address first to place order. Continue',{
                                        loader: true
                                    }).then(dialog => {
                                        dialog.loading(false);
                                        this.$router.push('/delivery');
                                        dialog.close();
                                    }).catch(() => {
                                        this.showNotification('info','Info','Add address to place order!');
                                        this.hideModal();
                                    })
                                }
                            }
                        }, error => {
                            console.log(error);
                            this.disablePlaceOrder = true;
                            this.showNotification('error','Error','Error occcurred please try later!');
                        })
                    }, error => {
                        console.log(error);
                        this.showNotification('error','Error','Error occurred please try later!');
                        this.disablePlaceOrder = true;
                    })
                }
            },
            getImage() {
                this.image =  this.resData.ImageUrl.replace(/ /g, '%20')
                console.log('UrlIS',this.resData,this.image);
                return this.image;
            },
            hideModal() {
                this.$bvModal.hide('checkout');
            },
            handleToggleDrawer() {
                if(!this.isOpen) {
                    this.checkCart();
                    console.log('insideToggle',this.$refs.drawer);
                    this.$refs.drawer.toggle();
                    document.getElementsByClassName('drawer-layout')[0].style.display = 'block';
                    this.isOpen = true;
                } else {
                    
                    this.hideToggle();
                }
                
            },
            hideToggle() {
                console.log('hide toggle');
                this.isOpen = false;
                document.getElementsByClassName('drawer-layout')[0].style.display = 'none';
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
            navigateToTrack() {
                console.log('addID',this.addID);
                // this.$router.push('/track');
            },
            async fetchRestaurantMealById(resId, mealId) {
                console.log('bothIDs'+resId+mealId);
               fetchRestaurantMealsById(resId, mealId).then(response => {
                    if(!response.HasError) {
                        this.$root.$emit('popularFood',response.result);
                        this.$root.$emit('isCustomMeal', true);
                    }else {
                        this.showNotification('error','Error','Error occurred please try later');S
                    }
                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later');
                })
            }
        }

    }
</script>
<style scoped>
    .drawer-layout {
        position: fixed !important;
        z-index: 900;
    }

    .item-no {
        background: red;
        border-radius: 50%;
        color: white;
        position: absolute;
        width: 20px;
        height: 20px;
        text-align: center;
        top: 0;
        right: 0px;
        z-index: 1000;
    }
    .slected-bg {
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 600px;
        border-radius: 0px 550px 550px 0;
        box-shadow: 19px 6px 5px 2px rgba(0, 0, 0, 0.05);
        width: 97%;
    }

    .food-type {
        position: absolute;
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
    /*//class of */
    .card-width{
        width: 320px !important;
    }
    .food-type a {
        text-decoration: none;
        display: inline-block;
        padding: 10px 20px;
        background: #2875b3;
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
        padding: 5px 15px;
        background: #2875b3;
        margin: 0 20px 0 5px;
        color: white;
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 500;
        border-radius: 5px;
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
        font-weight: 500;
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
    .notActive{
        background-color: #363a4b !important;
    }
    .invoice{
        /*margin: 10px 40px;*/
    }
    .invoice p{
        font-size: 18px;
        font-weight: 500;
        padding-left:33px;
        margin-bottom: 5px;
        padding-bottom: 0;
        color: black;
    }
    .invoice .price p{
        text-align: right;
        font-size: 18px;
        font-weight: 500;
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
        font-size: 24px;
    }
    a.link-color h2{
        font-size: 21px;
    }
    p.link-color{
        font-size: 21px;
        color: #8ba939;
        font-weight: 500;
        cursor: pointer;
    }
    p.link-color:hover{
        color: #5f7e32;
    }
    a.link-color{
        color: #8ba939;
    }
    .card-block{
        box-shadow:0px 0px 7px 1px #E8E8E9;
        width: 95%;
        border-radius: 15px;
        /*padding: 0 20px;*/
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
    .btn-main h3{
        font-weight: 500;
        font-size: 24px;
    }
    .active-background{
        background-color: #6A8623;
        color: white;
        font-weight: 400;
    }
    .drwer-else{
        font-size: 18px;
        font-weight: 500;
    }
    .default-btn{
        display: grid;
        margin-top: 5px;
    }
    @media screen and (max-width: 989px) and (min-width: 960px) {
        .card-width{
            width: 200px !important;
        }
    }
    @media screen and (max-width: 960px) and (min-width: 760px){
        .slected-bg{
            height:550px ;
            background-size: 100% 100%;
            border-radius: 0px 500px 500px 0;
        }
        .card-width{
            width: 200px !important;
        }
    }
    @media screen and (max-width: 760px) and (min-width: 576px){
        .slected-bg{
            height:500px ;
            background-size: 100% 100%;
            border-radius: 0px 450px 450px 0;
        }
        .card-width{
            width: 180px !important;
        }
        .btn-main h3{
            font-size: 24px;
        }
        .invoice p{
            padding-left: 30px;
        }
        .food-type{
            left: 50px;
        }
    }
    @media screen and (max-width: 576px) and (min-width: 430px){
        .slected-bg{
            height:450px ;
            background-size: 100% 100%;
            border-radius: 0px 400px 400px 0;
        }
        .card-width{
            width: 180px !important;
        }
        .btn-main h3{
            font-size: 22px;
        }
        .btn-continue button{
            width: 80%;
            font-size: 23px;
        }
        .sec-heading{
            font-size: 23px;
        }
        .invoice p{
            padding-left: 20px;
        }
        .food-type{
            left: 30px;
        }
    }
    @media screen and (max-width: 430px) and (min-width: 380px){
        .slected-bg{
            height:400px ;
            background-size: 100% 100%;
            border-radius: 0px 350px 350px 0;
        }
        .food-type{
            left: 26px;
        }
        .card-width{
            width: 160px !important;
        }
        .default-btn .btn{
            padding: 0 !important;
        }
        .btn-main h3{
            font-size: 20px;
        }

        .btn-main p{
            font-size: 15px;
        }
        .btn-continue button{
            width: 100%;
            font-size: 22px;
        }
        .sec-heading{
            font-size: 22px;
        }
        a.link-color h2{
            font-size: 20px;
        }
        p.link-color{
            font-size: 20px;
        }
        .invoice p{
            padding-left: 15px;
        }
    }
    @media screen and (max-width: 380px) {
        .slected-bg{
            height:400px ;
            border-radius: 0px 350px 350px 0;
            background-size: 100% 100%;
        }
        .card-width{
            width: 120px !important;
        }
        .default-btn .btn{
            padding: 0 !important;
        }
        .food-type{
            left: 20px;
        }
        .btn-main h3{
            font-size: 19px;
        }
        .btn-main p{
            font-size: 14px;
        }
        .btn-continue button{
            width: 100%;
            font-size: 22px;
        }
        .sec-heading{
            font-size: 21px;
        }
        a.link-color h2{
            font-size: 19px;
        }
        p.link-color{
            font-size: 19px;
        }

        .invoice p{
            padding-left: 10px;
        }
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
        /*background-color: #8f8f90;*/
    }
    
</style>
