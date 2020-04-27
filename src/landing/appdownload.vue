<template>
    <div class="downloads">
        <div class="container">
            <div class="app-download mx-auto">
                <div class="row">
                    <div class="col-md-8 col-12 ar-head-text">
                        <!-- <h3>{{newLang.gotApp}}</h3>
                        <p>{{newLang.getYours}}</p> -->

                    </div>
                    <div class="col-md-4 col-sm-8 col-12 mx-auto py-0">
                        <div class="phone-image">
                            <img :src="phoneimg" />
                        </div>
                    </div>
                    <div class="store-image">
                        <a href="#" class="margin-right-10px"><img :src="download.iphone" /></a>
                        <a href="#"><img :src="download.android" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Dishes from "../components/selected restaurant/dishes";
export default {

    props: ['newLang'],
    data(){
        return{
            download: {
                appHeading: 'Have you got the app?',
                appDescription:'Get yours now - available on the iOS and Android app stores!',
                iphone:'./images/iphoneApp.png',
                android: './images/mobileApp.png'
            },
            phoneimg:'./images/download-app.jpg'
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
    margin: auto;
}

.app-download{
    position: relative;
}
.app-download h3 {
    /*font-family: "PantonSemi";*/
    font-weight: 500;
    font-size: 46px;
    color: white;
    margin: 0;
}
.app-download p {
    /*font-family: "HH-Samuel",sans-serif;*/
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
.ar-head-text{
    margin-top: 30px;
}
@media screen and (min-width: 960px){
    .ar-head-text{
        display: inline;
        margin-top: 80px;
    }
    .store-image{
        display: inline;
        position: absolute;
        top:240px;
        margin: auto;
        left: 16%;
    }
}
@media screen and (max-width: 576px) {}
</style>
