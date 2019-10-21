<template>
    <div class="downloads">
        <div class="container">
            <div class="download">
                <div class="app-download">
                    <h3>{{download.appHeading}}</h3>
                    <p>{{download.appDescription}}</p>
                    <a href="#" class="margin-right-10px"><img :src="download.iphone" /></a>
                    <a href="#"><img :src="download.android" /></a>
                    <div class="phone-image">
                        <img :src="phoneimg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
.download {
    display: flex;
    position: relative;
    width: 100%;
    height: 518px;
    align-items: center;
}
.phone-image {
    position: absolute;
    top: -7px;
    right: 0;
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
    margin: 13px 0 72px 0;
}
.app-download a {
    display: inline-block;
}
.margin-right-10px{
    margin-right: 10px;
}

</style>