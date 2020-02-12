<template>
    <div class="footer">
        <div class="container-fluid">
            <div class="footer-top">
                <div v-bind:class="[isFooter? 'display-block': 'downloads' ]">
            <div class="container">
                <div class="download">
                    <div class="app-download">
                        <h3>{{download.appHeading}}</h3>
                        <p>{{download.appDescription}}</p>
                        <a href="#" class="margin-right-10px"><img :src="download.iphone" /></a>
                        <a href="#"><img :src="download.android" /></a>
                    </div>
                </div>
            </div>
        </div>
            </div>
            <div class="footer-data">
                <div class="copyright">
                    <p>© DeliviGo 2017 - 2018</p>
                </div>
                <div class="quickLinks">
                    <ul>
                        <li><a href="#">Jobs</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Merchants</a></li>
                        <li><a href="#">Couriers</a></li>
                    </ul>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isFooter:false,
            download: {
                appHeading: 'Have you got the app?',
                appDescription:'Get yours now - available on the iOS and Android app stores!',
                iphone:'./images/iphoneApp.png',
                android: './images/mobileApp.png'
            }
        }
    },
    created() {
        this.isFooter = false;
        this.$eventBus.$on('checkFooter', (footerData) => {
        // do something with the data
            if(footerData === 'footer') {
                this.isFooter = true;
            } else {
                this.isFooter = false;
            }
        });
    }
}

</script>
<style scoped>
.footer{
    background: #0b0d0f;
}
.footer-top{
    min-height: 280px;
    border-bottom: 1px solid #3c3d3f;
}
.footer-data{
    padding: 0 35px;
}
.copyright{
    float: left;
    margin-top: 48px;
    margin-bottom: 28px;
}
.copyright p{
    font-family: Panton;
    font-weight: normal;
    font-size: 18px;
    color: #cccccc;
    line-height: 43px;
    margin: 0;
}
.quickLinks{
    float: right;
    margin-top: 48px;
    margin-bottom: 28px;
}
.quickLinks ul{
    padding: 0;
    margin: 0;
}
.quickLinks ul li{
    display: inline-block;
    padding: 0 25px 0 0;
}
.quickLinks a{
    font-family: Panton;
    font-weight: normal;
    font-size: 18px;
    color: #cccccc;
    line-height: 43px;
}
.download {
    position: relative;
    width: 100%;
    align-items: center;
    padding: 50px 0;
}
.app-download h3 {
    font-family: "PantonSemi";
    font-weight: 500;
    font-size: 46px;
    color: white;
    margin: 0;
}
.app-download p {
    /*font-family: "Roboto";*/
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
.downloads{
    display: none;
}
.display-block{
    display: block;
}

</style>