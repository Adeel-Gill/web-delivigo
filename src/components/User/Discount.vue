<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>Discounted Restaurants</h2>
                <p>Restaurants with deals</p>
            </div>
            <div class="restaurants-list" v-if="notEmpty">
                <div class="row" >
                    <restaurant v-for="(restaurant,index) in discounted" :key="index" :restaurant="restaurant" ></restaurant>
                </div>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
            <paginate
                :page-count="total"
                :container-class="'pagination'"
                :click-handler="callAPI">
            </paginate>
        </div>
    </div>
</template>

<script>
    import {fetchDiscountedRestaurants} from "../api/Discount";
    import emptyError from "../error/emptyError";
    import restaurant from "../restaurant/restaurant";
    export default {
        name: "Discount",
        components: {
            restaurant,
            appEmptyError: emptyError

        },
        data() {
            return {
                discounted: [],
                size: 5,
                page: 1,
                total: 0,
                notEmpty: true
            }
        },
        methods: {
            getPageRange(total) {
                if(total<5) {
                    return 1;
                } else {
                    var div = total/5;
                    var rem = total%5
                    if(div >=1 && rem > 0 && rem <=4) {
                        return div+1;
                    } else {
                        return div;
                    }
                }
            },
            callAPI(page) {
              this.page = page;
              this.fetchDiscountedRestaurants();
            },
            fetchDiscountedRestaurants() {
              fetchDiscountedRestaurants(this.page,this.size).then(response => {
                  if(response.Restaurants.length > 0) {
                      this.notEmpty = true;
                      this.discounted = response.Restaurants;
                      this.total = parseInt(this.getPageRange(response.Pagination.TotalRecords));
                      this.showNotification('success','Success','Restaurants with deals are available');
                  } else {
                      this.notEmpty = false;
                      this.showNotification('info','No deals','Come back later to check!')
                  }
              }, error => {
                  this.notEmpty = false;
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
            this.fetchDiscountedRestaurants();
        }
    }
</script>

<style scoped>

    .pagination .active{
        z-index: 2;
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .popular {
        margin: 20px 0;
    }
    .title{
        text-align: center;
        /*font-family: "Roboto";*/
        color: #080808;
    }
    .title h2{
        font-size: 35px;
        font-weight: bold;
        text-transform: uppercase;
    }
    .title p{
        font-size: 23px;
    }
</style>
