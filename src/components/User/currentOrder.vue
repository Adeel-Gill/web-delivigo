<template>
    <div>
        <app-current-order v-for="orders in allOrders" :key="orders.Order.OrderId"
                           :currentOrder="orders"
                           :all70="getLocalAll70()"
                           :is-empty-array="allOrders.length>0"></app-current-order>
    </div>

</template>

<script>
    import CurrentOrder from "../Order/CurrentOrder";
    import {getOrderHistory} from "../api/OrderHistory";
    import {orderStatus} from "../Order/OrderStatus";

    export default {
        name: "currentOrder",
        data() {
            return {
                isEmpty: true,
                allOrders: [],
                isAll70: false,
            }
        },
        components: {
            appCurrentOrder: CurrentOrder
        },
        methods: {
            getCurrentOrders() {
                getOrderHistory(Number(localStorage.getItem('id'))).then(response => {
                    if(response.HasErrors) {
                        this.isEmpty = true;
                        this.showNotification('error', 'Error', 'Error occurred please try later!')
                    } else {
                        if(response.length > 0) {
                            this.isEmpty = false;
                            for(var i=0; i< response.length; i++) {
                                this.allOrders = response;
                                if(response[i].Order.OrderStatusId === orderStatus.OrderDelivered) {
                                   this.isAll70 = true;
                                } else {
                                    this.isAll70 = false;
                                }
                            }
                            if(this.isAll70) {
                                localStorage.setItem('all70',true.toString());

                            } else {
                                this.allOrders = response;
                                this.showNotification('success','Success','Current orders shown successfully!');
                                localStorage.setItem('all70',false.toString());
                            }
                        } else {
                            this.isEmpty = true;
                            this.allOrders = [];
                            this.showNotification('error','Error','No orders are currently placed to show');
                        }
                    }
                }, error => {
                    console.log('error',error);
                    this.isEmpty = true;
                    this.allOrders = [];
                    this.showNotification('error','Error','Error occurred please try later!');
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
            if(localStorage.getItem('all70') === 'false' || this.isEmpty)
                console.log('empty',this.isEmpty);
            this.getCurrentOrders();
        },
        created() {
            console.log('empty',this.isEmpty);
            this.getCurrentOrders();
        }
    }
</script>

<style scoped>

</style>
