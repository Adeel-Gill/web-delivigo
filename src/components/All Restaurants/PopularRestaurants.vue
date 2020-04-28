<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{local.allPopular}}</h2>
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
    import {fetchResturantsData} from "../api/Landing";
    import Restaurant from '../../components/restaurant/restaurant.vue';
    import emptyError from "../error/emptyError";
    import {EventBus} from "../../main";
    import {lang} from "../lang/lang";
    export default {
        name: "allPopularRestaurants",
        data() {
            return {
                restaurantsData: [],
                titleHeading: 'All Popular Restaurants',
                subHeading: 'The easiest way to your favourite food',
                notEmpty: true,
                local: lang.en
            }
        },
        components: {
            restaurantsData: Restaurant,
            appEmptyError: emptyError
        },
        methods: {
            fetchAllData() {
                localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
                fetchResturantsData().then(response => {
                    if(response.PopularNearYou.length>0) {
                        this.restaurantsData = response.PopularNearYou;
                    } else {
                        this.notEmpty = false;
                        this.showNotification('error','Error','No popular restaurants available to show!');
                    }

                }, error=> {
                    console.log(error);
                    this.notEmpty = false;
                    this.showNotification('error','Error', 'Error occurred please try later!');
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
            this.fetchAllData();
            this.checkLang();
            EventBus.$on("changeLang", () => {
            this.changeTheLang();
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
