<template>
    <div>
        <div class="slected-bg" :style="{'background-image': 'url('+`${getImage()}`+')'}">
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
                        <button type="button" class="btn btn-checkout float-right" :disabled="doProceed" @click="startCheckout" >Proceed to checkout</button>
                    </div>
                    <div class="drawer-body px-3">
                        <!-- card start-->
                        <div v-if="notEmpty">
                            <app-cart-items v-for="(item,index) in cartItems"
                                            :key="item.Meal"
                                            :itemIndex="index"
                                            :item="item.Meal"
                                @removeInCart="removeItem(index)"></app-cart-items>
                        </div>
                        <div v-else>
                            <h3>Add items in cart first...!</h3>
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
                 title="Enter Intstructions">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                        :state="nameState"
                        label="Intruction"
                        label-for="name-input"
                        invalid-feedback="Instruction is required"
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
        <b-modal size="lg" hide-footer class="my-modal" body-class="p-0" id="checkout" title="Checkout">
            <div class="container--fluid">
                <div class="map-place">
                    <img src="../../../public/images/map.png">
                </div>
                <div class="row mx-0 btn-main">
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg" @click="forDelivery" :class="[isDelivery ? 'active' : 'notActive']" ><h3 class="m-0">Delivery</h3><h4 class="m-0"> Around 30 Min</h4><p class="m-0"><small>total distance would be 10km</small></p></button>
                    </div>
                    <div class="col-6 p-0 btn-group">
                        <button type="button" class="btn btn-lg " @click="forPickup" :class="[!isDelivery ? 'active' : 'notActive']"><h3 class="m-0">Pickup</h3><h4 class="m-0"></h4></button>
                    </div>
                </div>

            </div>
            <div class="container p-4">
                <h2 class="sec-heading"><i class="far fa-calendar-check"></i> Scheduled order: Today&nbsp<i class="fas fa-plus"></i>
                    <VueCtkDateTimePicker
                            v-model="time"
                            only-time="true"
                            label="Select time"
                            output-format="hh:mm:ss"
                            format="hh:mm a"></VueCtkDateTimePicker>
                    <a href="#" class="link-color"></a></h2>
                <p class="text-muted">Desired delivery time + 10 min</p>
                <div class="row" style="box-sizing: border-box;">
                    <app-checkout-cart-item v-for="(item, index) in cartItems" :key="item.Meal"
                                            :itemIndex="index"
                                            @removeItemInCart="itemRemoveInOrder(index)"
                                            :item="item.Meal"></app-checkout-cart-item>
                </div>

                <a href="#" class="link-color"><h2><i class="fas fa-plus"></i> Add more items</h2></a>
                <div v-if="emptyInstruction">
                    <a @click="showInstruction" class="link-color" >
                        <h2><i class="fas fa-pepper-hot"></i> Add special cooking Intructions</h2></a>
                </div>
               <div v-else>
                   <a @click="showInstruction" class="link-color" >
                       <h2><i class="fas fa-pepper-hot"></i>{{this.instruction | truncate}}</h2></a>
               </div>
                <h2>People Also Added</h2>
                <div class="row">

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
                            <div v-for="address in allAddresses" :key="address.Id">
                                <div class="card card-block">
                                    <div class="card-body">
                                        <div v-if="!address.IsDefault">
                                            <button class="btn btn-primary" @click="newDefaultAddress(address.Id, address.IsDefault)" :checked="address.IsDefault">Set Default</button>
                                        </div>
                                        <div v-else style="display: none">
                                            {{setAddressID(address)}}
                                        </div>
                                        <p class="m-0">{{address.Apartment}}</p>
                                        <p class="m-0">{{address.AddressLine | truncate}}</p>
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </div>


                <div class="row">
                    <div class="col-8">
                        <h2 class="d-inline-block sec-heading">Contact Info</h2>
                    </div>

                    <div class="col-12">
                        <VueSlickCarousel v-bind="settings">
                                <div class="card card-block">
                                    <div class="card-body">
                                        <p class="m-0">{{userData.FullName}}</p>
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
                            <div v-for="card in allCards" :key="card.Id">
                                <div class="card card-block">
                                    <div class="card-body">
                                        <div v-if="!card.IsDefault">
                                            <button class="btn btn-primary"  @click="newDefaultCard(card,card.IsDefault)" :checked="(card.IsDefault)">Set Default</button>
<!--                                            <label class="d-inline-block">Default</label>-->
                                        </div>
                                        <div v-else style="display: none">
                                            {{setCardID(card.Id)}}
                                        </div>
                                        <p class="m-0">{{card.Brand}} .... .... {{card.CardNumber}}</p>
                                        <p class="m-0">Expires in {{card.Month}}/{{card.Year}}</p>
                                    </div>
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                    <h2 class="sec-heading">Prices in EUR, Incl. taxes</h2>
                    </div>
                </div>
                    <div class="row invoice">
                        <div class="col-8">
                            <p>Item Subtotal</p>
                        </div>
                        <div class="col-4 price">
                            <p>{{subTotal}}</p>
                        </div>
                    </div>
                    <div class="row invoice">
                        <div class="col-8">
                            <p>Small delivery Order extra </p>
                        </div>
                        <div class="col-4 price">
                            <p>{{smallDeliveryOrderExtra}}</p>
                        </div>
                    </div>

                    <div class="row invoice">
                        <div class="col-8">
                            <p>Delivery</p>
                            <p class="small-text">Address lorem ipsum</p>
                        </div>
                        <div class="col-4 price">
                            <p>3.56</p>
                        </div>
                    </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>Basic Delivery Fee</p>
                    </div>
                    <div class="col-4 price">
                        <p>{{basicDeliveryFee}}</p>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>Extra KM Delivery Free</p>
                        <p class="small-text">Order deliver more than 10km will cost extra to deliver</p>
                    </div>
                    <div class="col-4 price">

                        <p>{{extraKmDeliveryFee}}</p>
                    </div>
                </div>
                <div class="row invoice">
                    <div class="col-8">
                        <p>Total</p>
                    </div>
                    <div class="col-4 price">
                        <p>{{totalPrice}}</p>
                    </div>
                </div>

                <div class="row w-100 btn-continue">

                    <button type="button" :disabled="disablePlaceOrder" @click="placeOrder()" class="btn mx-auto" >Place the Order</button>
                </div>
            </div>
        </b-modal>

    </div>

</template>
<script>
    import {baseAddress} from "../../main";
    import {fetchRestaurantMealsById} from "../api/CustomMeal";
    import {deliveryCharges} from "./charges";
    import fab from 'vue-fab';
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
    import VueSlickCarousel from 'vue-slick-carousel';
    import {BBadge} from 'bootstrap-vue';
    import {defaultRestaurantPic} from "../../main";
    import cartItem from "../Cart/cartItem";
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

    export default {
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
            notEmpty: true,
            subTotal: 0,
            addID: null,
            cardID: null,
            lon1: 0,
            lat1: 0,
            lon2: 0,
            lat2: 0,
            km: 0,
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
            cartItems: [],
            userData: {},
            resData: {},
            newResData: {},
            cartData: [],
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
                let length = 26;
                if(val.length <= length) {
                    return val
                } else {
                    return val.substring(0, length)+ '...';
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
        this.$root.$on('mealMenu', response => {
            this.foodTypes = response;
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
    methods: {
        itemRemoveInOrder(i) {
            this.$dialog.confirm('Item will be removed from order. Continue?', {
                loader: true
            }).then(dialog => {
                dialog.loading(false);
                this.$store.dispatch('removeCartItem',i);
                this.checkCartAfterOrderItemDeletion();
                this.showNotification('success','Success','Item removed.');
                dialog.close();
            }).catch(() => {
                this.showNotification('info','Info','Deletion cancelled');
            })
        },
        removeItem(i) {
            this.$dialog.confirm('Item will be removed from cart. Continue?', {
                loader: true
            }).then(dialog => {
                dialog.loading(false);
                this.$store.dispatch('removeCartItem',i);
                this.checkCartAfterDeletion();
                this.showNotification('success','Success','Item removed from cart');
                dialog.close();
            }).catch(() => {
                this.showNotification('info','Info','Deletion cancelled');
            })

          console.log('indexReceived',i);
        },
        fetchRestaurantByParam(id) {
            fetchRestaurantById(id).then(response => {
                if(this.$store.state.cartData.length > 0) {
                    this.resData = response.Restaurant;
                } else {
                    this.lon1 = response.Restaurant.Longitude;
                    this.lat1 = response.Restaurant.Latitude;
                    this.resData = response.Restaurant;
                }
                console.log('resData',id,this.resData);
            },error => {
                console.log(error);
                this.showNotification('error','Error','Error occurred please try later!');
            })
        },
        fetchRestaurant(id) {
         fetchRestaurantById(id).then(response => {

             this.lon1 = response.Restaurant.Longitude;
             this.lat1 = response.Restaurant.Latitude;
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
            if(this.$store.state.cartData.length <= 0) {
                this.doProceed = true;
                this.notEmpty = false;
                this.cartItems =[];
                this.$bvModal.hide('checkout');
                this.$store.dispatch('clearCart');

            } else {
                this.cartItems = this.$store.state.cartData;
                for(var i=0; i<this.cartItems.length; i++) {
                    var temp = {};
                    this.subTotal = 0;
                    temp = this.cartItems[i].Meal;
                    this.subTotal += temp.Price;
                }
                this.totalPrice = this.subTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
            }
        },
        checkCartAfterDeletion() {
            if(this.$store.state.cartData.length <= 0) {
                this.doProceed = true;
                this.notEmpty = false;
                this.cartItems =[];
                this.$store.dispatch('clearCart');
            } else {
                this.cartItems = this.$store.state.cartData;
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
            if(this.isSchedule) {
                this.time = dateTime.getFullYear() + "-"
                    + (dateTime.getMonth() + 1) + "-" +
                    dateTime.getDate() + "T" + this.time +
                    ".108Z";
            } else {
                this.time = "";
            }
            this.orderObject = {
                "RestaurantId" : cartItems[0].Meal.RestroId,
                "CustomerId": Number(localStorage.getItem('id')),
                "AddressId": this.addID,
                "CardId": this.cardID,
                "VAT": 5,
                "IsSchedule": this.isSchedule,
                "ScheduleTime": this.time,
                "IsDelivery": this.isDelivery,
                "ItemSubTotal": this.subTotal,
                "SmallOrderExtra": this.smallDeliveryOrderExtra,
                "BasicDeliveryFee": this.basicDeliveryFee,
                "ExtraKMDeliveryFee": this.extraKmDeliveryFee,
                "TotalPrice": this.totalPrice,
                "Notes": this.instruction,
                "OrderItems": cartItems,
            }
        },
        setAddressID(obj) {
          this.addID = obj.Id;
          this.lon2 = obj.Longitude;
          this.lat2 = obj.Latitude;
          console.log('here inside calc1');
            // this.calculateDistance();
        },
        calculateDistance() {
            calculateDistance(this.lon1,this.lat1,this.lon2,this.lat2,'k').then(response => {
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
                this.totalPrice = this.subTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
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
            if(this.subTotal<10) {
                this.smallDeliveryOrderExtra = 10 - this.subTotal;
            } else {
                this.smallDeliveryOrderExtra = 0;
            }
        },
        async checkCart() {
            if(this.$store.state.cartData.length > 0) {
                this.doProceed = false;
                this.notEmpty= true;
                this.cartItems = this.$store.state.cartData;
                console.log('cartItems',this.cartItems, this.subTotal);
                this.subTotal = 0;
                for(var i=0; i<this.cartItems.length; i++) {
                    var temp = {};
                    temp = this.cartItems[i].Meal;
                    this.subTotal += temp.Price;
                }
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
          this.totalPrice = this.subTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
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
                  console.log('orderObject',this.orderObject);
                  this.$router.push('/orderHistory')
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
                markDefaultCard(this.card).then(response => {
                    this.disablePlaceOrder = true;
                    if(response.HasErrors) {
                        this.disablePlaceOrder = false;
                        this.showNotification('error','Error','Card is failed to be set as default!');
                    } else {
                        retrieveCustomerAllCards(Number(localStorage.getItem('id'))).then(response => {
                            if(response.HasError) {
                                this.disablePlaceOrder = false
                                this.showNotification('error','Error','Error occurred please try later!');
                            } else {
                                this.allCards = [];
                                this.allCards = response.CustomerCards;
                                this.showNotification('success','Success','Card is default now and shown!');
                                this.disablePlaceOrder = false;
                            }
                        }, error => {
                            console.log(error);
                            this.disablePlaceOrder = false;
                            this.showNotification('error','Error','Error occurred please try later!');
                        })
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
                     getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                         this.allAddresses = [];
                         this.allAddresses = response;
                         this.setAddressID(this.allAddresses[0]);
                         this.showNotification('success','Success','Address is default and shown!');
                         console.log('isDelivery',this.isDelivery);
                         if(this.isDelivery) {
                             this.calculateDistance();
                         } else {
                             this.disablePlaceOrder = false;
                         }
                     }, error => {
                         console.log(error);
                         this.showNotification('error','Error','Please try later error occurred');
                     })
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
            if(localStorage.getItem('id') == null|| localStorage.getItem('id') === 'null' || localStorage.getItem('isLogin') === false) {
                this.showNotification('info','Info','Please login first to place order');
                this.$router.push('/signin')
            } else {
                this.cartItems = this.$store.state.cartData;
                this.basicDeliveryFee = deliveryCharges.basicDeliveryFee;
                this.hideToggle();
                console.log('start2');
                console.log('cartItems',this.cartItems);
                fetchUserProfile(Number(localStorage.getItem('id'))).then(response => {
                    console.log('start3');
                    this.userData = response;
                    getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                        console.log('start4');
                        if(response.HasErrors) {
                            this.showNotification('Address fetching please try later!');
                            this.disablePlaceOrder = true;
                        } else {
                            this.allAddresses = response;
                            if(this.allAddresses.length > 0) {
                                this.allAddresses = response;
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
                                        this.allCards = response.CustomerCards;
                                        console.log(this.allCards,'herehere',response,' break ::',response.CustomerCards);
                                        if(this.allCards.length > 0) {
                                            console.log('cards',this.allCards);
                                            this.allCards = response.CustomerCards;
                                            calculateDistance(this.lon1,this.lat1,this.lon2,this.lat2,'k').then(response => {
                                                console.log('start6');
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
                                                this.totalPrice = this.subTotal + this.extraKmDeliveryFee + this.smallDeliveryOrderExtra + this.basicDeliveryFee;
                                                console.log('start7');
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
            this.image =  baseAddress + this.resData.ImageUrl
            console.log('UrlIS',this.resData,this.image);
            return this.image;
        },
        hideModal() {
          this.$bvModal.hide('checkout');
        },
        handleToggleDrawer() {
            this.checkCart();
            console.log('insideToggle',this.$refs.drawer);
            this.$refs.drawer.toggle();
        },
        hideToggle() {
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
    height: 600px;
    border-radius: 0px 550px 550px 0;
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
    padding: 5px 15px;
    background: red;
    margin: 0 20px 0 5px;
    color: white;
    /*font-weight: bold;*/
    font-family: "Roboto";
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 500;
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
    .notActive{
        background-color: #363a4b !important;
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

@media screen and (max-width: 400px){
    .slected-bg{
        height:400px ;
        border-radius: 0px 350px 350px 0;
    }
    .food-type{
        left: 26px;
    }
}
@media screen and (max-width: 576px) and (min-width: 400px){
    .slected-bg{
        height:450px ;
        border-radius: 0px 400px 400px 0;
    }
}
@media screen and (max-width: 760px) and (min-width: 576px){
    .slected-bg{
        height:500px ;
        border-radius: 0px 450px 450px 0;
    }
}
@media screen and (max-width: 960px) and (min-width: 760px){
    .slected-bg{
        height:550px ;
        border-radius: 0px 500px 500px 0;
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
    background-color: #8f8f90;
}
</style>
