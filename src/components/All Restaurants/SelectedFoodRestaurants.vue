<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{foodCategoryName + " " +  local.foodRestaurants}}</h2>
                <p>{{local.easiestToFood}}</p>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list" v-if="notEmpty">
                <div class="row">
                    <restaurantsData v-for= "restaurant in restaurantsData" :key="restaurant.Id" :restaurant='restaurant'></restaurantsData>
                </div>
            </div>
            <div class="row" v-else>
                <app-empty-error></app-empty-error>
            </div>
        </div>
    </div>
</template>

<script>
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import {fetchRestaurantsByCategory} from "../api/FilterRestaurants";
    import {EventBus} from "../../main";
    import emptyError from "../error/emptyError";
    import {lang} from "../lang/lang";
    export default {
        name: "SelectedFoodRestaurants",
        data(){
            return{
                titleHeading: ' Food Restaurants',
                subHeading: 'The easiest way to your favourite food',
                restaurantsData: [],
                foodCategoryName: '',
                notEmpty: true,
                local: lang.en
            }
        },
        components: {
            restaurantsData: Restaurant,
            appEmptyError: emptyError
        },
        methods: {
            async fetchRestaurantsByCategoryName(name) {
                localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
                console.log('name1 : '+name);
                fetchRestaurantsByCategory(name).then(response => {
                    console.log('name2 : '+name);
                    if(response.result.length) {
                        this.restaurantsData = response.result;
                    } else {
                        this.notEmpty = false;
                        this.showNotification('error','Error','No restaurants available for that food category!');
                    }

                }, error => {
                    console.log(error);
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
            },
            checkLang() {
            console.log("hereItIs");
                var temp = localStorage.getItem("lang");
                if(temp == null || temp === "EN") {
                localStorage.setItem("lang", "EN");
                this.local = lang.en;
                } else if(temp === "FN" ) {
                this.local = lang.fn;
                localStorage.setItem("lang", "FN");
                } else {
                this.local = lang.sp;
                localStorage.setItem("lang", "ES");
                }
                // this.value = temp;
            },
            changeTheLang() {
            console.log("here AllCities");
            // this.fetchResturantsData();
            this.checkLang();
            EventBus.$emit("changeNewLang", "");
            // this.fetchAllData();
            // this.resetCount += 1;
            // this.newCount += 1;
        },
        },
        mounted() {
            this.checkLang();
            EventBus.$on("changeLang", () => {
            this.changeTheLang();
         });
            EventBus.$on('foodCategoryName', data => {
                this.foodCategoryName = data;
                console.log('data '+ this.foodCategoryName);
                this.fetchRestaurantsByCategoryName(this.foodCategoryName);
            });

        }

    }
</script>

<style scoped>
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
