<template>
    <div>
        <div v-if="!noPreviousORders">
            <app-previous-order v-for="orders in allOrders"
                                :key="orders.Order.OrderId"
                                :previousOrder="orders"
                                :all70="getLocalAll70()"
                                :is-empty-array="allOrders.length>0"
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
                    if(response.HasErrors) {
                        this.isEmpty = true;
                        this.showNotification('error', 'Error', 'Error occurred please try later!')
                    } else {
                        if(response.length > 0) {
                            for(var i=0; i< response.length; i++) {
                                this.allOrders = response;
                                if(response[i].Order.OrderStatusId === orderStatus.OrderDelivered) {
                                    this.isAll70 = true;
                                    this.noPreviousORders = false;
                                } else {
                                    this.isAll70 = false;
                                }
                            }
                            if(!this.noPreviousORders) {
                                localStorage.setItem('all70',true.toString());
                                this.allOrders = response;
                                console.log('hereResponse',this.allOrders);
                                this.showNotification('success','Success','Current orders shown successfully!');

                            } else {
                                this.allOrders = [];
                                localStorage.setItem('all70',false.toString());
                            }
                        } else {
                            this.isEmpty = true;
                            this.showNotification('error','Error','No orders are currently placed to show');
                        }
                    }
                }, error => {
                    console.log(error);
                    this.isEmpty = true;
                    this.showNotification('error','Error','No orders are currently placed to show');
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
