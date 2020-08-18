<template>
    <div>
        <div v-if="!noPreviousORders">
            <app-previous-order v-for="orders in allOrders"
                                :key="orders.Id"
                                :previousOrder="orders"
                                :all70="getLocalAll70()"
                                :newLang = newLang
                                :is-empty-array="allOrders.length"
                                @recallOrders = "getPreviousOrders"
            ></app-previous-order>
        </div>
        <div v-else>
            <app-empty-error :custom-message="'No orders available to show'"></app-empty-error>
        </div>
    </div>
</template>

<script>
    import PreviousOrder from "../Order/PreviousOrder";
    import {getOrderHistory} from "../api/OrderHistory";
    import {orderStatus} from "../Order/OrderStatus";
    import noItemError from "../error/noItemError";

    export default {
        name: "previousOrder",
        props: ['newLang'],
        components: {
            appPreviousOrder: PreviousOrder,
            appEmptyError: noItemError
        },
        data() {
            return {
                isEmpty: true,
                allOrders: [],
                isAll70: false,
                noPreviousORders: true,
            }
        },
        methods: {
            getPreviousOrders() {
                getOrderHistory(Number(localStorage.getItem('id'))).then(response => {
                    if(response.HasError) {
                        this.isEmpty = true;
                        this.showNotification('error', this.newLang.error, this.newLang.errorOccurred)
                    } else {
                        if(response.result.length ) {
                            for(var i=0; i< response.result.length; i++) {
                                // this.allOrders = response.result;
                                if(Number(response.result[i].OrderStatusId) === orderStatus.OrderDelivered) {
                                    this.isAll70 = true;
                                    this.allOrders.push(response.result[i]);
                                    this.noPreviousORders = false;
                                } else {
                                    this.isAll70 = false;
                                }
                            }
                            console.log('previousOrders',this.allOrders);
                            if(this.allOrders.length) {
                                localStorage.setItem('all70',true.toString());
                                // this.allOrders = response.result;
                                console.log('hereResponse',this.allOrders);
                                this.showNotification('success',this.newLang.success,this.newLang.previousOrdersShown);

                            } else {
                                this.allOrders = [];
                                localStorage.setItem('all70',false.toString());
                            }
                        } else {
                            this.isEmpty = true;
                            this.showNotification('error',this.newLang.error,this.newLang.noOrdersAvailable);
                        }
                    }
                }, error => {
                    console.log(error);
                    this.isEmpty = true;
                    this.showNotification('error',this.newLang.error,this.newLang.noOrdersAvailable);
                })
            },
            getLocalAll70() {
                console.log('insideRetrunItem70');
                return localStorage.getItem('all70');
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
            this.getPreviousOrders();
        }
    }
</script>

<style scoped>

</style>
