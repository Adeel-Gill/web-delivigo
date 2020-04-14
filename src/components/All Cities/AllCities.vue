<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
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
                count: 0
            }
        },
        methods: {
            fetchCities() {
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
            }
        },
        created() {
            this.fetchCities();
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
