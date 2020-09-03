<template>
    <div>
        <div v-if="allOrders.length"> 
            <app-current-order v-for="orders in allOrders" :key="orders.Id"
                           :currentOrder="orders"
                           :all70="getLocalAll70()"
                           :newLang = newLang
                           :is-empty-array="allOrders.length>0"></app-current-order>
        </div>
        <div v-else>
            <app-empty-error :custom-message="'No active orders available to show'"></app-empty-error>
        </div>
        
    </div>

</template>

<script>
    import CurrentOrder from "../Order/CurrentOrder";
    import {getOrderHistory} from "../api/OrderHistory";
    import {orderStatus} from "../Order/OrderStatus";
    import noItemError from "../error/noItemError";
    

    export default {
        name: "currentOrder",
        props: ['newLang'],
        data() {
            return {
                isEmpty: true,
                allOrders: [],
                isAll70: false,
            }
        },
        components: {
            appCurrentOrder: CurrentOrder,
            appEmptyError: noItemError
        },
        methods: {
            getCurrentOrders() {
                getOrderHistory(Number(localStorage.getItem('id'))).then(response => {
                    if(response.HasError) {
                        this.isEmpty = true;
                        this.showNotification('error', this.newLang.error, this.newLang.errorOccurred)
                    } else {
                        if(response.result.length ) {
                            this.isEmpty = false;
                            for(var i=0; i< response.result.length; i++) {
                                // this.allOrders = response.result;
                                if(Number(response.result[i].OrderStatusId) !== orderStatus.OrderDelivered) {
                                   this.isAll70 = false;
                                   this.allOrders.push(response.result[i])
                                } else {
                                    this.isAll70 = true;
                                }
                            }
                            console.log('allCurrentOrders1', this.allOrders);
                            if(!this.allOrders.length) {
                                this.isAll70 = true;
                                console.log('allCurrentOrders', this.allOrders);
                                localStorage.setItem('all70',true.toString());

                            } else {
                                // this.allOrders = response.result;
                                this.isAll70 = false;
                                this.showNotification('success',this.newLang.success,this.newLang.currentOrdersShown);
                                localStorage.setItem('all70',false.toString());
                            }
                        } else {
                            this.isEmpty = true;
                            this.allOrders = [];
                            this.showNotification('error',this.newLang.error,this.newLang.noOrdersAvailable);
                        }
                    }
                }, error => {
                    console.log('error',error);
                    this.isEmpty = true;
                    this.allOrders = [];
                    this.showNotification('error',this.newLang.error, this.newLang.errorOccurred);
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
            // console.log('empty',this.isEmpty);
            // this.getCurrentOrders();
        }
    }
</script>

<style scoped>

</style>
