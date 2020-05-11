<template>
    <div>
            <div v-if="isEmpty">
                <div class="card mb-5" v-if="isPreviousOrder">
                    <div class="card-body">
                        <div class="row mx-3 mt-3">
                            <div class="col-md-6">
                                <!--                    <p style="display:none;">{{decomposeObject(currentOrder)}}</p>-->
                                <div class="sec1">
                                    <h6>{{previousOrderObject.Restaurant.Name}}</h6>
                                    <p class="text-muted">{{previousOrderObject.Order.OrderPlaceTime}}</p>
                                </div>
                                <div class="sec1">
                                    <p class="mt-4">{{previousOrderObject.Order.AddressLine}}</p>
                                </div>
                                <div class="">
                                    <div class="rating mt-4 mb-3">
                                        <star-rating :rating="rating" v-model="rating"  :star-size="35" :rtl="true"></star-rating>
                                    </div>
                                    <div class="form-group">
                                        <textarea  class="form-control review" v-model="review" id="review" :disabled="isLoading" :placeholder="newLang.yourReview"></textarea>

                                    </div>
                                    <button class="btn btn-primary float-right" @click="submitReview(previousOrderObject.Order.RestaurantId, previousOrderObject.Order.OrderId)" :disabled="isLoading">{{newLang.review}}</button>
<!--                                    <button class="btn btn-primary">Review</button>-->
                                </div>
                            </div>
<!--                            <div>-->
<!--                                {{showObject(previousOrder)}}-->
<!--                            </div>-->
                            <div class="col-md-6">
                                <div class="collapse-tab" role="tablist" v-for="(orderItem, itemIndex) in previousOrderObject.Order.OrderItems" :key="orderItem.MealId">
                                    <div class="line">
                                        <div class="px-1 ml-1 collapse-head" role="tab">
                                            <a v-b-toggle.accordion-1><div class="numberCircle">1</div>{{orderItem.Title}}</a>
                                            <span class="float-right">${{orderItem.Price}}</span>
                                        </div>
                                        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                            <div class="pl-3 sub-catg pb-3">
                                                <p class="d-inline-block text-muted">{{newLang.quantity}}</p><span class="float-right text-muted">{{orderItem.Quantity}}</span><br>
                                                <p class="d-inline-block text-muted">{{newLang.otherCharges}}</p><span class="float-right text-muted">{{otherCharges}}</span>
                                                <div v-if="orderItem.CustomOption.length > 0">
                                                    <div v-for="customOption in orderItem.CustomOption" :key="customOption.Id">
                                                        <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-collapse>
                                    </div>

                                    <div class="line">
                                        <div v-if="orderItem.AddOns.length > 0" >
                                            <div class="px-1 ml-1 collapse-head" role="tab">
                                                <a v-b-toggle.accordion-2><div class="numberCircle">2</div>{{newLang.addOnTitle}}</a>
                                                <!--                                                <span class="float-right">$44</span>-->
                                                <span class="float-right">${{addOnsPrices.length == 1? addOnsPrices[0] : addOnsPrices[itemIndex]}}</span>
                                            </div>
                                            <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                                <div class="pl-3 sub-catg pb-3">
                                                    <div v-for="addon in orderItem.AddOns" :key="addon.Id">
                                                        <p class="d-inline-block text-muted">{{addon.Id}}</p><span class="float-right text-muted">${{addon.Price}}</span>
                                                    </div>
                                                </div>
                                            </b-collapse>
                                        </div>
<!--                                        <div v-else>-->
<!--                                            <div class="px-1 ml-1 collapse-head" role="tab">-->
<!--                                                <a v-b-toggle.accordion-2><div class="numberCircle">2</div>{{emptyAddOnTitle}}</a>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>

                                    <div class="line">
                                        <div v-if="isScales">
                                            <div class="px-1 ml-1 collapse-head" role="tab">
                                                <a v-b-toggle.accordion-3><div class="numberCircle">3</div>{{newLang.scales}}</a>
                                                <span class="float-right">$33</span>
                                            </div>
                                            <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                                                <div class="pl-3 sub-catg pb-3">
                                                    <div v-for="scale in scales" :key="scale.Id">
                                                        <p class="d-inline-block text-muted">{{scale.Name}}</p><span class="float-right text-muted">${{scale.Price}}</span>
                                                    </div>

                                                </div>
                                            </b-collapse>
                                        </div>
<!--                                        <div v-else>-->
<!--                                            <div class="px-1 ml-1 collapse-head" role="tab">-->
<!--                                                <a v-b-toggle.accordion-3><div class="numberCircle">3</div>{{emptyScalesTitle}}</a>-->
<!--                                            </div>-->
<!--                                        </div>-->
                                    </div>
                                </div>
                                <div class="total">
                                    <span class="float-right">{{previousOrderObject.Order.TotalPrice.toFixed(2)}}</span>
                                </div>
                            </div>
                        </div>
                        <router-link to="/orderTracking">
                         <button class="btn btn-primary mr-2"><i class="fas fa-download"></i> &nbsp;{{newLang.reciept}}</button>
                            <button class="btn btn-primary float-right"
                                    :disabled="(statuses.OrderDelivered === previousOrderObject.Order.OrderStatusId)">
                                {{newLang.trackOrder}}
                            </button>
                        </router-link>
                        <button class="btn btn-primary float-left" @click="reorder(previousOrderObject.Order.OrderId)"
                                :disabled="(statuses.OrderDelivered !== previousOrderObject.Order.OrderStatusId)">
                            {{newLang.reorder}}
                        </button>
                    </div>
                </div>
            </div>
            <div v-else>
                <app-empty-error :custom-message="'No orders are avaialable to show'"></app-empty-error>
            </div>
        </div>
</template>

<script>
    import noItemError from "../error/noItemError";
    import {orderStatus} from "./OrderStatus";
    import {reOrder} from "../api/PlaceOrder";
    import {submitReview} from "../api/Reviews";
    import {updateReview} from "../api/Reviews";

    export default {
        name: "PreviousOrder",
        components: {
            appEmptyError: noItemError
        },
        props: ['previousOrder','isEmptyArray','all70', 'newLang'],
        data() {
            return {
                addOnPrice: 0,
                rating: 0,
                review: '',
                obj: this.previousOrder,
                previousOrderObject: {},
                statuses: orderStatus,
                addOns: [],
                customOptions: [],
                scales: [],
                orderItems: [],
                newAddons: [],
                addOnsPrices: [],
                isAddons: false,
                isAll70: this.all70,
                isCustomOptions: false,
                checkAll70: this.all70 === 'true',
                isScales: false,
                isLoading: false,
                addOnTitle: "AddOns",
                addOnTotal: 0,
                emptyAddOnTitle: "No AddOns",
                isEmpty: this.isEmptyArray,
                emptyCustomOptionTitle: "No Custom Options",
                scalesTitle: "Scales",
                emptyScalesTitle: "No Scales",
                isPreviousOrder: false,
                mealBasePrice: 0,
                otherCharges: 0,
                orderTotalPrice: 0,
                reviewObj: {
                    Comments: "string",
                    Rates: 0,
                    CustomerId: 0,
                    RestaurantId: 0,
                    OrderID: 0,
                },
                updateReview: {
                    OrderNumber: 0,
                    IsReviewed: true
                }
            }
        },
        methods: {
            calculateAddOnsPrice(addons) {
                this.orderItems = addons;
                this.addOnTotal = 0;
                for(var i=0; i<this.orderItems.length; i++) {
                    this.newAddons = this.orderItems[i].AddOns;
                    console.log('orderItems,addons',this.orderItems[i],this.newAddons);
                    for(var j=0; j<this.newAddons.length; j++) {
                        console.log('addons',this.newAddons, this.newAddons[j].Price);
                        this.otherCharges = this.addOnPrice += this.newAddons[j].Price;
                    }
                    this.addOnsPrices.push(this.addOnPrice);
                    this.addOnTotal += this.addOnPrice;
                    this.otherCharges = this.orderTotalPrice - this.otherCharges
                    this.addOnPrice = 0;


                }
                // for(var i=0; i<addons.length; i++) {
                //     this.addOnPrice += addons[i].Price;
                // }
                // console.log('price',this.addOnPrice);
                // return this.addOnPrice;
            },
            // showObject(obj) {
            //     // console.log('currentOrder',currentOrder)
            //     console.log('first',obj.Order.OrderItems[0].Title);
            //     console.log('first',obj.Order.OrderItems[0].Price);
            //     console.log('first',obj.Order.OrderItems[0].Quantity);
            //     console.log('first',obj.Order.OrderItems[0].AddOns);
            //     console.log('first',obj.Order.OrderItems[0].AddOns[0].Id);
            //     console.log('first',obj.Order.OrderItems[0].AddOns[0].Price);
            // },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
            decomposeObject() {
                // this.previousOrderObject = obj;
                console.log('here',this.previousOrderObject);
                console.log('previousOrderObject', this.previousOrderObject,'obj',this.obj);
                if(this.obj.Order.OrderStatusId === orderStatus.OrderDelivered) {
                    this.previousOrderObject = this.obj;
                    console.log('previousOrderObject', this.previousOrderObject);
                    this.isPreviousOrder = true;
                    this.orderTotalPrice = this.previousOrderObject.Order.TotalPrice;
                    if(this.previousOrderObject.Order.OrderItems[0].AddOns.length > 0) {
                        this.isAddons = true;
                        this.addOns = this.previousOrderObject.Order.OrderItems[0].AddOns;
                        this.calculateAddOnsPrice(this.previousOrderObject.Order.OrderItems);
                        if(this.previousOrderObject.Order.OrderItems[0].CustomOption.length > 0) {
                            this.isCustomOptions = true;
                            this.customOptions = this.previousOrderObject.Order.OrderItems[0].CustomOption;
                            if(this.previousOrderObject.Order.OrderItems[0].Scales.length > 0) {
                                this.isScales = true;
                                this.scales = this.previousOrderObject.Order.OrderItems[0].Scales;
                            } else {
                                this.isScales = false;
                            }
                        } else {
                            this.isCustomOptions = false;
                        }
                    } else {
                        this.isAddons = false;
                    }
                } else {
                    this.isPreviousOrder = false;
                    this.previousOrderObject = {};
                }
            },
            getLocalAll70() {
                console.log('insidelocal70',localStorage.getItem('all70'));
                if(localStorage.getItem('all70') === 'true') {
                    console.log('here');
                    return true;
                } else {
                    return false;
                }
            },
            setRating(rating) {
              this.rating = rating;
            },
            reorder(id) {
                this.$dialog.confirm(this.newLang.reorderAlert, {
                    loader: true
                }).then(dialog => {
                    dialog.loading(true);
                    reOrder(id).then(response => {
                        if(response) {
                            this.showNotification('success',this.newLang.success,this.newLang.reorderSuccess);
                            this.$router.push('/currentOrder');
                        } else {
                            this.showNotification('error',this.newLang.error,this.newLang.reorderFailed);
                        }
                        dialog.loading(false);
                        dialog.close();
                    }, error => {
                        this.showNotification('error',this.newLang.error,this.newLang.reorderFailed);
                        dialog.loading(false);
                        dialog.close();
                    })
                }).catch(() => {
                    this.showNotification('info',this.newLang.info,this.newLang.reorderCancelled);
                    // dialog.close();
                })

            },
            submitReview(resId,orderId) {
                if(this.rating === 0) {
                    this.showNotification('info',this.newLang.starMissingFields,this.newLang.starError)
                } else {
                    if(this.review.length < 5 && this.review.length>0) {
                        this.showNotification('info', this.newLang.info,this.newLang.reviewErrorShortLength)
                    } else if (this.review.length> 100) {
                        this.showNotification('info', this.newLang.info,this.newLang.reviewErrorLongLength)
                    } else {
                        this.$dialog.confirm(this.newLang.reviewSubmitAlert, {
                            loader: true
                        }).then(dialog => {
                            dialog.loading(true);
                            this.reviewObj.Comments = this.review;
                            this.reviewObj.Rates = this.rating;
                            this.reviewObj.CustomerId = localStorage.getItem('id');
                            this.reviewObj.RestaurantId = resId;
                            this.reviewObj.OrderID = orderId;
                            submitReview(this.reviewObj).then(response => {
                                if(response.hasErrors) {
                                    this.showNotification('error',this.newLang.error,this.newLang.reviewSubmitError);
                                    dialog.loading(false);
                                } else {
                                    this.updateReview.OrderNumber = orderId;
                                    updateReview(this.updateReview).then(response => {
                                        if(response.hasErrors) {
                                            this.showNotification('error',this.newLang.error,this.newLang.reviewSubmitError);
                                            dialog.loading(false);
                                        } 
                                    }, error => {
                                        this.showNotification('error',this.newLang.error,this.newLang.reviewSubmitError);
                                        dialog.loading(false);
                                    })
                                }
                            }, error => {
                                this.showNotification('error',this.newLang.error,this.newLang.reviewSubmitError);
                                dialog.loading(false);
                            })
                        }).catch(() => {
                            this.showNotification('info',this.newLang.info,this.newLang.reviewCancelledError);
                            dialog.loading(false);
                        })

                    }
                }
            }
        },
        created() {
            // console.log(this.isEmpty,this.obj);
            if(this.isEmpty) {
                console.log(this.isEmpty,this.obj);
                this.decomposeObject();
                // if(localStorage.getItem('all70') === 'true') {
                //     this.decomposeObject();
                // }
            }

        },
        updated() {
            console.log('rating',this.rating)
        }
    }
</script>

<style scoped>
    .btn-tab{
        border-bottom: 1px solid #9C9C9C;
        color: black !important;
    }
    .btn-tab a{
        color: inherit;
    }
    .btn-tab:hover{
        color: #007bff !important;
        border-bottom: 2px solid #0056b3;
    }
    .btn-tab a:hover{
        text-decoration: none;

    }
    .active-btn{
        border-bottom: 2px solid #0056b3;
        color: #007bff !important;
    }
    .sec1{
        border-bottom: 1px solid #9C9C9C;
    }
    .review{
        height: 70px;
        background-color: #f2f2f2;
    }
    /*rating star*/
    .rating {
        unicode-bidi: bidi-override;
        direction: rtl;
    }
    .rating > span {
        display: inline-block;
        position: relative;
        font-size: 1.1em;
        color: #e6e6e6;
    }
    .rating > span:hover:before,
    .rating > span:hover ~ span:before {
        color: #fbb03b;
    }
    /* end*/

    /*.custom-text {*/
    /*    font-weight: bold;*/
    /*    font-size: 1.9em;*/
    /*    border: 1px solid #cfcfcf;*/
    /*    padding-left: 10px;*/
    /*    padding-right: 10px;*/
    /*    border-radius: 5px;*/
    /*    color: #999;*/
    /*    background: #fff;*/
    /*}*/

    .numberCircle {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        /*padding-bottom:2px;*/
        background: #5860ff;
        padding-top: 1px;
        /*border: 2px solid #5860ff;*/
        color: #fff;
        position: absolute;
        left: 14px;
        text-align: center;
        font-size: 11px;
        display: inline-block;
    }
    .line{
        border-left: 1px solid #5860ff;
        margin-left: 10px;
        padding-left: 10px;
    }
    .sub-catg p,.sub-catg span{
        /*font-family: pantonl;*/
        text-transform: capitalize;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: lighter;
    }
    .collapse-head{
        font-size: 19px;
    }
    .collapse-tab{
        padding-bottom: 10px;
        border-bottom: 1px solid #9C9C9C;
    }
    .total span{
        font-size: 19px;
        padding-top: 15px;
    }
    .card{
        box-shadow: 4px 1px 10px 1px #DEDEDE;
    }

    @media screen and (max-width: 576px) {
        .w-75{
            width: 100% !important;
        }
    }
    .vue-star-rating-rating-text[data-v-34cbeed1] {
        display: none;
    }
</style>
