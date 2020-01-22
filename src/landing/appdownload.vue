<template>
    <div class="downloads">
        <div class="container">
            <div class="app-download mx-auto">
                <div class="row mt-5">
                    <div class="col-md-8 col-12 ar-head-text">
                        <h3>{{download.appHeading}}</h3>
                        <p>{{download.appDescription}}</p>

                    </div>
                    <div class="col-md-4 col-sm-8 col-12 mx-auto">
                        <div class="phone-image">
                            <img :src="phoneimg" />
                        </div>
                    </div>
                    <div class="col-12 col-md-4 store-image">
                        <a href="#" class="margin-right-10px"><img :src="download.iphone" /></a>
                        <a href="#"><img :src="download.android" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Dishes from "../components/selected restaurant/dishes";
export default {
    components: {Dishes},
    data(){
        return{
            download: {
                appHeading: 'Have you got the app?',
                appDescription:'Get yours now - available on the iOS and Android app stores!',
                iphone:'./images/iphoneApp.png',
                android: './images/mobileApp.png'
            },
            phoneimg:'./images/phone.png'
        }
    }
}
</script>
<style scoped>
.downloads{
    background: #ff2e32;
}
.phone-image{
    height: 500px;
    width: 80%;
    display: block;
    margin: auto;
}
.phone-image img{
    width: 100%;
    height: 100%;
}
.phone-image {
    height: 500px;
    width: 80%;
    display: block;
    margin: auto;
}
.phone-image img {
    width: 100%;
    height: 100%;
}
.store-image{
    text-align: center;
}
.app-download{
    position: relative;
}
.app-download h3 {
    font-family: "Roboto";
    font-weight: 500;
    font-size: 46px;
    color: white;
    margin: 0;
}
.app-download p {
    font-family: "Roboto";
    color: white;
    font-size: 18px;
    max-width: 327px;
    font-weight: normal;
    /*margin: 13px 0 72px 0;*/
}
.app-download a {
    display: inline-block;
}
.margin-right-10px{
    margin-right: 10px;
}
@media screen and (min-width: 960px){
    .ar-head-text{
        display: inline;
    }
    .store-image{
        display: inline;
        position: relative;
        top:-380px;
    }
}
@media screen and (max-width: 576px) {}
</style>
