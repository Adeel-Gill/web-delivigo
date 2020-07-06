<template>
    <div class="popular-dishes">
        <h5>{{newLang.popularOnly}}</h5>
        <ul>
            <li v-for="dish in dishes" :key="dish"  @click="navigateTo(dish.Id)">
                {{dish.Name}}
            </li>
        </ul>
    </div>
</template>
<script>
import {fetchRestaurantMealsById} from "../api/CustomMeal";
    export default {
        props: ['newLang'],
        data(){
            return{
                favrtDishes:'Popular',
                dishes:[],
                count: 0,
            }
        },
        methods: {
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
            navigateTo(id) {
                console.log('insideNavigateMethod', id);
                if(id) {
                    this.$router.push({path:'/restaurant/'+this.$route.params.id,query:{mealID:id}});
                    this.fetchRestaurantMealById(this.$route.params.id,id);
                } else {
                    alert('Please select menu other than popular!');
                }
            },
            async fetchRestaurantMealById(resId, mealId) {
                console.log('bothIDs'+resId+mealId);
                fetchRestaurantMealsById(resId, mealId).then(response => {
                    this.$root.$emit('popularFood',response.Meals);
                    this.$root.$emit('isCustomMeal', true);
                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later');
                })
            }
        },
        mounted() {
            this.$root.$on('mealMenu', response => {
                if(response.length>0) {
                    this.dishes = response;
                } else {
                    if(this.count === 0) {
                        console.log('popularFoodNotification');
                        this.showNotification('error','Error','No popular food is available to show!');
                        this.count++;
                    } else {
                        this.count++;
                    }
                }
            })
        }
    }
</script>
<style scoped>
    .clear{
        clear: both;
    }
    .popular-dishes {
        text-align: left;
        background: #f2f2f2;
        /*margin: 50px 15px -20px 0px;*/
        padding: 15px 0 15px 25px;
    }
    .popular-dishes h5 {
        font-family: "Roboto",sans-serif;
        font-size: 26px;
        font-weight: 500;
        color: black;
        position: relative;
        padding-bottom: 15px;
    }
    .popular-dishes h5::after {
        content: '';
        width: 91%;
        height: 2px;
        background: black;
        position: absolute;
        bottom: 0;
        left: -25px;
    }
    .popular-dishes ul {
        padding: 0;
    }
    .popular-dishes ul li {
        list-style: none;
        padding: 7px 0px;
        /*font-family: "Roboto";*/
        font-size: 21px;
        font-weight: 500;
        color: black;
    }

</style>
