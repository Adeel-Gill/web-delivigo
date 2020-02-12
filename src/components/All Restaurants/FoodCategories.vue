<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="clear"></div>
            <div class="catagories" v-if="notEmpty">
                <div class="row">
                <app-food-categories v-for="catagory in foodCategoriesData"
                                     v-bind:key="catagory.Id"
                                     :foodCategories="catagory"
                                    ></app-food-categories>
                </div>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchAllData} from "../api/Home";
    import foodCategories from "../foodCategories/foodCategories";
    import emptyError from "../error/emptyError";
    export default {
        name: "allFoodCategories",
        data() {
          return {
              foodCategoriesData: [],
              titleHeading: 'All Food Categories',
              subHeading: 'All your favorite food categories',
              notEmpty: true,
          }
        },
        components: {
          appFoodCategories: foodCategories,
          appEmptyError: emptyError
        },
        methods: {
            async fetchAllData() {
                fetchAllData().then(response => {
                    if(response.FoodCategories.length>0) {
                        this.foodCategoriesData = response.FoodCategories;
                    } else {
                        this.notEmpty = false;
                        this.showNotification('error','Error','No food categories available to show!');
                    }

                }, error => {
                    console.log(error);
                    this.notEmpty = false;
                    this.showNotification('error','Error','Error occurred please try later');
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
        created() {
            this.fetchAllData();
        }
    }
</script>

<style scoped>
    .catagories{
        margin-bottom: 50px;
    }
    .popular {
        margin: 50px 0;
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
