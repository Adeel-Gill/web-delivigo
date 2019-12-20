<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="clear"></div>
            <div class="catagories">
                <app-food-categories v-for="catagory in foodCategoriesData"
                                     v-bind:key="catagory.Id"
                                     :foodCategories="catagory"
                                    ></app-food-categories>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchAllData} from "../api/Home";
    import foodCategories from "../foodCategories/foodCategories";
    export default {
        name: "allFoodCategories",
        data() {
          return {
              foodCategoriesData: [],
              titleHeading: 'All Food Categories',
              subHeading: 'All your favorite food categories',
          }
        },
        components: {
          appFoodCategories: foodCategories
        },
        methods: {
            async fetchAllData() {
                fetchAllData().then(response => {
                    this.foodCategoriesData = response.FoodCategories;
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
        font-family: "Roboto";
        color: #080808;
    }
    .title h2{
        font-size: 35px;
        text-transform: uppercase;
    }
    .title p{
        font-size: 23px;
    }
</style>
