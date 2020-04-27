<template>
    <div>
            <div v-if="isEmpty">
                <div class="card mb-5" v-if="isCurrentOrder">
                    <div class="card-body">
                        <div class="row mx-3 mt-3">
                            <div class="col-md-6">
                                <!--                    <p style="display:none;">{{decomposeObject(currentOrder)}}</p>-->
                                <div class="sec1" >
                                    <h6>{{currentOrderObject.Restaurant.Name}}</h6>
                                    <p class="text-muted">{{currentOrderObject.Order.OrderPlaceTime}}</p>
                                </div>
                                <div class="sec1">
                                    <p class="mt-4">{{currentOrderObject.Order.AddressLine}}</p>
                                </div>
                                <div class="">
                                    <div class="rating mt-4 mb-3">
                                        <div class="rating mt-4 mb-3">
                                            <star-rating :rating="0" :read-only="true" :star-size="30" :rtl="true"></star-rating>
                                        </div>
                                        <!--                                    <star-rating :increment="0.5"></star-rating>-->
                                    </div>
                                    <div class="form-group">
                                        <textarea  class="form-control review" disabled placeholder="your review"></textarea>
                                    </div>
                                </div>
                            </div>
<!--                            <div>-->
<!--                                {{showObject(currentOrderObject)}}-->
<!--                            </div>-->
                            <div class="col-md-6">
                                <div class="collapse-tab" role="tablist"  v-for="(orderItem, itemIndex) in currentOrderObject.Order.OrderItems" :key="itemIndex">
                                    <div class="line">
                                        <div class="px-1 ml-1 collapse-head" role="tab">
                                            <a v-b-toggle.accordion-1><div class="numberCircle">1</div>{{orderItem.Title}}</a>
                                            <span class="float-right">${{orderItem.Price }}</span>
                                        </div>
                                        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                            <div class="pl-3 sub-catg pb-3">
                                                <p class="d-inline-block text-muted">Quantity</p><span class="float-right text-muted">{{orderItem.Quantity}}</span><br>
                                                <p class="d-inline-block text-muted">Other Charges</p><span class="float-right text-muted">{{(currentOrderObject.Order.TotalPrice.toFixed(2)-(orderItem.Price + addOnTotal))}}</span>
                                                <div v-if="orderItem.CustomOption.length > 0">
                                                    <div v-for="customOption in customOptions" :key="customOption.Id">
                                                        <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-collapse>
                                    </div>

                                    <div class="line">
                                        <div v-if="orderItem.AddOns.length > 0" >
                                            <div class="px-1 ml-1 collapse-head" role="tab">
                                                <a v-b-toggle.accordion-2><div class="numberCircle">2</div>{{addOnTitle}}</a>
<!--                                                <span class="float-right">$44</span>-->
                                                <span class="float-right">${{addOnsPrices.length == 1? addOnsPrices[0] : addOnsPrices[itemIndex]}}</span>
                                            </div>
                                            <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                                <div class="pl-3 sub-catg pb-3">
                                                    <div v-for="addon in orderItem.AddOns" :key="addon.Id">
                                                        <p class="d-inline-block text-muted">{{addon.Title}}</p><span class="float-right text-muted">${{addon.Price}}</span>
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
                                                <a v-b-toggle.accordion-3><div class="numberCircle">3</div>{{scalesTitle}}</a>
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
                                    <span class="float-right">{{currentOrderObject.Order.TotalPrice.toFixed(2)}}</span>
                                </div>
                                <div class="float-right button">
                                   
                                    <router-link :to="{path:'/orderTracking/'+currentOrderObject.Order.OrderId,query:{cusID:currentOrderObject.Customer.CustomerId}}">
                                        <button class="btn btn-primary"
                                                :disabled="(statuses.OrderDelivered === currentOrderObject.Order.OrderStatusId)">
                                            Track Order
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!--<div class="float-right">
                        <button class="btn btn-primary mr-2"><i class="fas fa-download"></i> &nbsp;Receipt</button>
                        <router-link :to="{path:'/orderTracking/'+currentOrderObject.Order.OrderId,query:{cusID:currentOrderObject.Customer.CustomerId}}">
                            <button class="btn btn-primary"
                                    :disabled="(statuses.OrderDelivered === currentOrderObject.Order.OrderStatusId)">
                                Track Order
                            </button>
                        </router-link>
                        </div>-->
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

    export default {
        name: "CurrentOrder",
        components: {
            appEmptyError: noItemError
        },
        props: ['currentOrder','isEmptyArray','all70'],
        data() {
            return {
                addOnPrice: 0,
                obj: this.currentOrder,
                currentOrderObject: {},
                addOns: [],
                addOnsPrices: [],
                customOptions: [],
                newAddons: [],
                scales: [],
                orderItems: [],
                isAddons: false,
                statuses: orderStatus,
                isAll70: this.all70,
                checkAll70: this.all70 === 'false',
                isCustomOptions: false,
                isScales: false,
                addOnTitle: "AddOns",
                addOnTotal: 0,
                emptyAddOnTitle: "No AddOns",
                isEmpty: this.isEmptyArray,
                emptyCustomOptionTitle: "No Custom Options",
                scalesTitle: "Scales",
                emptyScalesTitle: "No Scales",
                isCurrentOrder: false,
            }
        },
        methods: {
            calculateAddOnsPrice(addons) {
                console.log('hereInFunction',addons);
                this.orderItems = addons;

                for(var i=0; i<this.orderItems.length; i++) {
                    this.newAddons = this.orderItems[i].AddOns;
                    console.log('orderItems,addons',this.orderItems[i],this.newAddons);
                    for(var j=0; j<this.newAddons.length; j++) {
                        console.log('addons',this.newAddons);
                        this.addOnPrice += this.newAddons[j].Price;
                    }

                    console.log('checking nan',this.addOnPrice);

                    this.addOnsPrices.push(this.addOnPrice);
                    console.log('addOnPrices',this.addOnsPrices);
                    this.addOnTotal += this.addOnPrice;
                    this.addOnPrice = 0;
                }
            },
            showObject(obj) {
                // console.log('currentOrder',currentOrder)
                console.log('first',obj.Order.OrderItems[0].Title);
                console.log('first',obj.Order.OrderItems[0].Price);
                console.log('first',obj.Order.OrderItems[0].Quantity);
                console.log('first',obj.Order.OrderItems[0].AddOns);
                console.log('first',obj.Order.OrderItems[0].AddOns[0].Id);
                console.log('first',obj.Order.OrderItems[0].AddOns[0].Price);
            },
            decomposeObject() {
                // this.currentOrderObject = obj;
                console.log('currentOrderObject', this.currentOrderObject);
                if(this.obj.Order.OrderStatusId !== 70) {
                    this.currentOrderObject = this.obj;
                    this.isCurrentOrder = true;
                    console.log('currentOrderAssigned',this.currentOrderObject);
                    this.calculateAddOnsPrice(this.currentOrderObject.Order.OrderItems);
                    if(this.currentOrderObject.Order.OrderItems[0].AddOns.length > 0) {
                        this.isAddons = true;
                        this.addOns = this.currentOrderObject.Order.OrderItems[0].AddOns;
                        this.calculateAddOnsPrice(this.currentOrderObject.Order.OrderItems);
                        console.log('here after method',this.currentOrderObject.Order.OrderItems)
                        if(this.currentOrderObject.Order.OrderItems[0].CustomOption.length > 0) {
                            this.isCustomOptions = true;
                            this.customOptions = this.currentOrderObject.Order.OrderItems[0].CustomOption;
                            if(this.currentOrderObject.Order.OrderItems[0].Scales.length > 0) {
                                this.isScales = true;
                                this.scales = this.currentOrderObject.Order.OrderItems[0].Scales;
                            } else {
                                this.scales = [];
                                this.isScales = false;
                            }
                        } else {
                            this.customOptions = [];
                            this.isCustomOptions = false;
                        }
                    } else {
                        this.addOns = [];
                        this.isAddons = false;
                    }
                } else {
                    this.isCurrentOrder = false;
                    this.currentOrderObject = {};
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
            }
        },
        mounted() {
            console.log('isEmpty',this.isEmpty);
            if(this.isEmpty) {
                console.log('object',this.obj);
                this.decomposeObject();
            }

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
        /*font-family: panton;*/
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
    .button{
        position: absolute;
        bottom: 40px;
        right: 0;
    }
    .button button{
        background-color: #5860ff;
    }
    .button button:hover{
        background-color:#0056b3 ;
    }
    .card{
        box-shadow: 4px 1px 10px 1px #DEDEDE;
    }

    @media screen and (max-width: 576px) {
        .w-75{
            width: 100% !important;
        }
    }
</style>
