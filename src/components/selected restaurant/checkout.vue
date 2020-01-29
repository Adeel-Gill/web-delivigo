<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="text-center">
                    <h3>Order is on its way</h3>
                    <p class="text-muted">Showing location</p>
                </div>
                <div class="w-100">
                    <img src="../../../public/images/map.png" class="img-fluid" alt="map image">
                </div>
                <div class="row mx-auto map-add mt-4">
                    <div class="col-md-3 p-0">
                    <div><img src="../../../public/images/green-radio.png" class="float-right" alt="gRadio"></div>
                        <div class="text-right d-block" style="clear: right;">
                            <div class="col-3 float-right p-0 mt-2">
                                <i class="fas fa-map-marker-alt map-marker pr-2"></i>
                            </div>
                            <div class="col-9 p-0 mt-2">
                                <h6>{{orderObject.Restaurant.Name}}</h6>
                            <p class="text-muted">{{orderObject.Restaurant.FullAddress}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 p-0 dot text-center">
                            <i class="fas fa-circle" v-for="num in 12" :key="num" :class="[num<=progress? 'green': '']"
                            ></i>
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
<!--                            <i class="fas fa-circle"></i>-->
                        <div>
<!--                            <h6>Will be delivered within</h6>-->
                            <h6>{{statusText}}</h6>
                        </div>
                    </div>
                    <div class="col-md-3 p-0">
                        <div><img src="../../../public/images/blue-radio.png" alt="gRadio"></div>
                        <div class="text-left row">
                            <div class="col-3 p-0 mt-2">
                                <i class="fas fa-map-marker-alt map-marker pl-4"></i>
                            </div>
                            <div class="col-9 p-0 mt-2">
                                <h6>{{orderObject.Customer.FirstName + " " + orderObject.Customer.LastName}}</h6>
                                <p class="text-muted">{{orderObject.Order.AddressLine}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div class="col-md-6">
                <h1>Cutlery</h1>
                <p>Help us to reduce plastic waste - only request
                    cutlery when you really need it.
                </p>
<!--                <button class="btn btn-primary"><i class="fas fa-motorcycle"></i> Delivery</button>-->
<!--                <span>~ $30</span>-->
<!--                <p>Your food will be deliverd as per the saved-->
<!--                    home address</p>-->
                <div class="card-deck text-center">
                    <div class="card" v-if="orderObject.Order.IsDelivery">
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-motorcycle"></i> Delivery</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{orderObject.Order.ETATime}}~{{orderObject.Order.ETATime + 5}} mins</h5>
                            <p class="card-text">Your food will be deliverd as per the saved home address</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary"
                                    :disabled="orderObject.Order.OrderStatusId !== statuses.OrderDelivered">Grab it</button>
                        </div>
                    </div>

                    <div class="card" v-else>
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-shopping-bag"></i> PickUp</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">~ 10 Min</h5>
                            <p class="card-text">We will be happy to be in service for your
                                pick up.</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary">Grab it</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderTracking} from "../api/OrderTracking";
    import {orderStatus} from "../Order/OrderStatus";

    export default {
        name: "checkout",
        data() {
          return {
              orderObject: {},
              statuses: orderStatus,
              progress: 0,
              statusText: '',
          }
        },
        methods: {
            getOrderTrackingDetail(cusID, orderID) {
                getOrderTracking(cusID,orderID).then(response => {
                    this.orderObject = response;
                    switch (this.orderObject.Order.OrderStatusId) {
                        case this.statuses.OrderReceived: {
                            this.progress = 12;
                            this.statusText = "Order is arrived!";
                            break;
                        }
                        case this.statuses.Open: {
                            this.progress = 1;
                            this.statusText = "Order is open!";
                            break;
                        }
                        case this.statuses.AssignedToRestaurant: {
                            this.progress = 2;
                            this.statusText = "Order is assigned to restaurant!";
                            break;
                        }
                        case this.statuses.Cooking: {
                            this.progress = 3;
                            this.statusText = "Restaurant start cooking your order!";
                            break;
                        }
                        case this.statuses.FoodReady: {
                            this.progress = 4;
                            this.statusText = "Order is cooked and ready for pickup/delivery!"
                            break;
                        }
                        case this.statuses.DriverAccept: {
                            this.progress = 5;
                            this.statusText = "Driver accept your order request";
                            break;
                        }
                        case this.statuses.GoingPickup: {
                            this.progress = 6;
                            this.statusText = "Driver is on its way to pickup your order"
                            break;
                        }
                        case this.statuses.DriverPickup: {
                            this.progress = 7;
                            this.statusText = "Order is picked up by driver"
                            break;
                        }
                        case this.statuses.GoingDelivered: {
                            this.progress = 8;
                            this.statusText = "Driver is on its way to deliver order"
                            break;
                        }
                        case this.statuses.OrderDelivered: {
                            this.progress = 12;
                            break;
                        }
                        default: {
                            this.progress = 0;
                        }
                    }
                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                })
            },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            }
        },
        mounted() {
            console.log('here');
            console.log('trackID',this.$route.params.id, this.$route.query.cusID);
            this.getOrderTrackingDetail(this.$route.query.cusID,this.$route.params.id)
        }
    }
</script>

<style scoped>
    .map-add img{
        width: 30px;
        height: 30px;
    }
    .dot i{
        font-size: 8px;
        color: #C2C2C3;
        margin: 0 9px;
    }
    .green{
        color: #39b54a !important;
    }
    .map-marker{
        font-size: 18px;
        color: #C2C2C3;
    }
    .greenDot i{
        font-size: 8px;
        color: #39b54a;
        margin: 0 9px;
    }
</style>
