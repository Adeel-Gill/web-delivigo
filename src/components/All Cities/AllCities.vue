<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{local.allCities}}</h2>
                <p>{{local.easiestToFind}}</p>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list">
                <div class="row" v-if="cities.length>0">
                    <app-city v-for="city in cities" :key="city.Id" :city="city"></app-city>
                </div>
                <div class="row" v-else>
                    <app-empty-error></app-empty-error>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import City from "../City/City";
    import emptyError from "../error/emptyError";
    import {fetchResturantsData} from "../api/Landing";
    import {EventBus} from "../../main";
    import {lang} from "../lang/lang";
    export default {
        name: "AllCities",
        components: {
            appCity: City,
            appEmptyError: emptyError,

        },
        data() {
            return {
                cities: [],
                titleHeading: 'All Available Cities',
                subHeading: 'The easiest way to find us',
                count: 0,
                local: lang.en
            }
        },
        methods: {
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
            fetchCities() {
                localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
                fetchResturantsData().then(response => {
                    this.cities = response.Cities;
                    console.log(this.cities.length);
                    if(this.cities.length > 0) {
                        this.cities = response.Cities;
                    } else {
                        if(this.count === 0) {
                            this.showNotification('error','Error','No cities are available to show!');
                            this.count++;
                        } else {
                            this.count++;
                        }
                    }
                }, error => {
                    console.log(error);
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
            changeTheLang() {
            console.log("here AllCities");
            // this.fetchResturantsData();
            this.checkLang();
            EventBus.$emit("changeNewLang", "");
            this.fetchCities();
            // this.resetCount += 1;
            // this.newCount += 1;
        },
        },
        created() {
            this.fetchCities();
            this.checkLang();
            EventBus.$on("changeLang", () => {
            this.changeTheLang();
        })
        }
    }
</script>

<style scoped>
    .popular {
        margin-top: 50px;
    }
    .show-more{
        text-align: right;
    }
    .show-more a {
        color: #0030b4;
        display: inline-block;
        margin: 10px 0 20px;
        /*font-family: "Panton";*/
        font-weight: 500;
        font-size: 17px;
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
