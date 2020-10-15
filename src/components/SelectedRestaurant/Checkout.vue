<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="text-center">
                    <h3>{{local.orderOnItsWay}}</h3>
                    <p class="text-muted">{{local.showingLocation}}</p>
                </div>
                <div class="w-100">
                    <app-custom-map :cus="cusData" :res="resData" :allData="alldata" :driver="driverData"></app-custom-map>
                    <!--                    <img src="../../../public/images/map.png" class="img-fluid" alt="map image">-->
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
                <p>{{local.helpUs}}
                </p>
                <!--                <button class="btn btn-primary"><i class="fas fa-motorcycle"></i> Delivery</button>-->
                <!--                <span>~ $30</span>-->
                <!--                <p>Your food will be deliverd as per the saved-->
                <!--                    home address</p>-->
                <div class="card-deck text-center">
                    <div class="card" v-if="orderObject.Order.IsDelivery">
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-motorcycle"></i> {{local.delivery}}</h4>
                        </div>
                        <div class="card-body"> 
                            <h5 class="card-title">{{orderObject.Order.ETATime}}~{{Number(orderObject.Order.ETATime) + 5}} {{local.mins}}</h5>
                            <p class="card-text">{{local.yourFood}}</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary"
                                    :disabled="Number(orderObject.Order.OrderStatusId) !== statuses.OrderDelivered">{{local.grabIt}}</button>
                        </div>
                    </div>

                    <div class="card" v-else>
                        <div class="card-header bg-primary text-white">
                            <h4><i class="fas fa-shopping-bag"></i> {{local.pickup}}</h4>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">~ 10 Min</h5>
                            <p class="card-text">{{local.weWillBeHappy}}</p>
                            <button type="button" class="btn btn-lg btn-block btn-primary">{{local.grabIt}}</button>
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
    import CustomMap from "../Map/CustomMap";
    import {lang} from "../lang/lang";
    import {EventBus} from "../../main";
    export default {
        name: "Checkout",
        // props: ['newLang'],
        components: {
            appCustomMap: CustomMap
        },
        data() {
            return {
                orderObject: {},
                statuses: orderStatus,
                progress: 0,
                statusText: '',
                alldata: [],
                data: {
                    "longitude": 0,
                    "latitude": 0,
                    "type": ""
                },
                cusData: {
                    "longitude": 0,
                    "latitude": 0,
                    "type": "cus"
                },
                resData: {
                    "longitude": 0,
                    "latitude": 0,
                    "type": "res"
                },
                driverData: {
                    "longitude": 0,
                    "latitude": 0,
                    "type": "drv"
                },
                local: lang.en,
            }
        },
        methods: {
            getOrderTrackingDetail(cusID, orderID) {
                getOrderTracking(cusID,orderID).then(response => {
                    this.orderObject = response.result[0];
                    this.cusData.longitude = this.orderObject.Order.Longitude;
                    this.cusData.latitude = this.orderObject.Order.Latitude;
                    this.alldata.push(this.cusData);
                    this.resData.longitude = this.orderObject.Restaurant.Longitude;
                    this.resData.latitude = this.orderObject.Restaurant.Latitude;
                    this.alldata.push(this.resData);
                    if(this.orderObject.Driver) {
                    this.driverData.longitude = this.orderObject.Driver.Longitude;
                    this.driverData.latitude = this.orderObject.Driver.Latitude;
                    this.alldata.push(this.driverData);
                    }
                   console.log(this.cusData, this.resData);
                    switch (Number(this.orderObject.Order.OrderStatusId)) {
                        case this.statuses.OrderReceived: {
                            this.progress = 12;
                            this.statusText = this.local.orderIsArrived;
                            break;
                        }
                        case this.statuses.Open: {
                            this.progress = 1;
                            this.statusText = this.local.orderIsOpen;
                            break;
                        }
                        case this.statuses.RestaurantAccept: {
                            this.progress = 2;
                            this.statusText = 'Restaurant accepts your order';
                            break;
                        }
                        case this.statuses.AssignedToRestaurant: {
                            this.progress = 3;
                            this.statusText = this.local.orderIsAssignedRestaurant;
                            break;
                        }
                        case this.statuses.Cooking: {
                            this.progress = 4;
                            this.statusText = this.local.restaurantStartCooking;
                            break;
                        }
                        case this.statuses.FoodReady: {
                            this.progress = 5;
                            this.statusText = this.local.orderIsCooked;
                            break;
                        }
                        case this.statuses.DriverAccept: {
                            this.progress = 6;
                            this.statusText = this.local.driverAccept;
                            break;
                        }
                        case this.statuses.GoingPickup: {
                            this.progress = 7;
                            this.statusText = this.local.driverOnItsWayPickup;
                            break;
                        }
                        case this.statuses.DriverPickup: {
                            this.progress = 8;
                            this.statusText = this.local.orderIsPicked;
                            break;
                        }
                        case this.statuses.GoingDelivered: {
                            this.progress = 9;
                            this.statusText = this.local.driverOnItsWatDeliver;
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
                    this.showNotification('error',this.local.error,this.local.errorOccurred);
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
            },
            checkLang() {
            console.log("hereItIs");
                var temp = localStorage.getItem("lang");
                if(temp == null || temp === "EN") {
                localStorage.setItem("lang", "EN");
                this.local = lang.en;
                } else if(temp === "FN" ) {
                this.local = lang.fn;
                localStorage.setItem("lang", "FN");
                } else {
                this.local = lang.sp;
                localStorage.setItem("lang", "ES");
                }
                // this.value = temp;
            },
        },
        mounted() {
            console.log('here');
            console.log('trackID',this.$route.query.cusID,this.$route.query.orderId);
            this.getOrderTrackingDetail(this.$route.query.cusID,this.$route.query.orderId)
        },
        created() {
             this.checkLang();
        EventBus.$on("changeLang", () => {
            this.checkLang();
        })
            // EventBus.$on('StartOverlay', response => {
            //     this.loader = response;
            //     console.log('StartOverlay'+this.loader);
            // })
        },
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
