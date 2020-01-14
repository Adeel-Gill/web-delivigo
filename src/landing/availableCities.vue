<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{titleHeading}}</h2>
                <p>{{subHeading}}</p>
            </div>
            <div class="show-more">
                <router-link to="/" >Show More</router-link>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list">
                <div class="row">
                    <app-city></app-city>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import City from "../components/City/City";
    export default {
        name: "availableCities",

        data() {
            return {
                titleHeading: 'Available Cities',
                subHeading: 'The easiest way to find us!',
            }
        },
        components: {
            appCity: City
        }
    }
</script>

<style scoped>
    .popular {
        margin: 50px 0;
    }
    .show-more{
        text-align: right;
    }
    .show-more a {
        color: #0030b4;
        display: inline-block;
        margin: 10px 0 20px;
        font-family: "Panton";
        font-weight: bold;
        font-size: 17px;
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
