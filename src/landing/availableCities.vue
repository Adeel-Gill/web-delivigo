<template>
    <div class="container">
        <div class="popular">
            <div class="title">
                <h2>{{newLang.availableCities}}</h2>
                <p>{{newLang.easiestToFind}}</p>
            </div>
            <div class="show-more" v-if="allcities.length > 3">
                <router-link to="/allCities" >{{newLang.showMore}}</router-link>
            </div>
            <div class="clear"></div>
            <div class="restaurants-list">
                <div class="row" v-if="allcities.length>0">
                    <div class="owl-carousel2 owl-theme">
                    <app-city v-for="city in allcities" :key="city.Id" :city="city"></app-city>
                    </div>
                </div>
                <div class="row" v-else>
                    <app-empty-error></app-empty-error>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import City from "../components/City/City-slider";
    import emptyError from "../components/error/emptyError";
    import 'owl.carousel/dist/assets/owl.carousel2.css';
    import 'owl.carousel';
    import 'jquery';
    export default {
        name: "availableCities",
        props: ['newLang'],
        // components: {
        //   appEmptyError: emptyError,
        // },
        data() {
            return {
                titleHeading: 'Available Cities',
                subHeading: 'The easiest way to find us!',
                count: 0,
                allcities: [],
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
            }
        },
        components: {
            appCity: City,
            appEmptyError: emptyError,
        },
        created() {
            this.$root.$on('cities', response => {
                if(response.length > 0) {
                    this.allcities = response;
                     $(document).ready(function(){
                console.log('here we are');
                $('.owl-carousel2').owlCarousel({
                    loop:true,
                    dots: false,
                    autoplay:true,
                    autoplayTimeout:2000,
                    autoplayHoverPause:true,
                    responsiveClass:false,
                    margin:20,
                    nav:false,
                    lazyLoad:true,
                    responsive:{
                        0:{
                            items:1
                        },
                        600:{
                            items:2
                        },
                        1000:{
                            items:3
                        }
                    }
                });
            });
                } else {
                    if(this.count === 0) {
                        this.showNotification('error','Error','No cities are available to show!');
                        this.count++;
                    } else {
                        this.count++;
                    }
                }
            })
            this.$root.$on('newCities', response => {
                console.log("newCities", response);
                this.allcities = response;
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
    }
    .title h2{
        font-size: 35px;
        font-weight: bold;
        text-transform: uppercase;
        color: #080808;
    }
    .title p{
        font-size: 23px;
        color: #080808;
    }
</style>
