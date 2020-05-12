<template>
    <div class="footer">
        <div class="container-fluid">
            <div class="footer-top">
<!--                <div class="display-block">&lt;!&ndash;v-bind:class="[isFooter? 'display-block': 'downloads' ]"&ndash;&gt;-->
            <div class="container">
                <div class="row pt-3">
                    <div class="col-12 col-md-3">
                        <div class="download">
                            <div class="app-download">
                                <h3>{{newLang.gotApp}}</h3>
                                <p>{{newLang.getYours}}</p>
                                <a href="#" class="margin-right-10px"><img :src="download.iphone" /></a>
                                <a href="#"><img :src="download.android" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 infoLink">
                        <div class="quickLinks">
                            <h4>{{newLang.information}}</h4>
                            <ul>
                                <li><router-link to="/profile">{{newLang.myAccount}}</router-link>
                                <li><router-link to="/currentOrder">{{newLang.orderHistory}}</router-link>
                                <li><router-link to="/termsAndConditions?docType=t">{{newLang.termsAndCondition}}</router-link>
                                <li><router-link to="/privacyPolicy?docType=p">{{newLang.privaryPolicy}}</router-link>
                                <!-- <li><a href="#">My Account</a></li> -->
                                <!-- <li><a href="#">Order History</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li> -->
                                <li><a href="#">FAQ's</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 infoLink">
                        <div class="quickLinks">
                            <h4>{{newLang.helpfulLinks}}</h4>
                            <ul>
                                <li><a href="#">{{newLang.jobs}}</a></li>
                                <li><a href="#">{{newLang.blog}}</a></li>
                                <li><a href="#">{{newLang.support}}</a></li>
                                <li><a href="#">{{newLang.merchants}}</a></li>
                                <li><a href="#">{{newLang.couriers}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 infoLink">
                        <div class="quickLinks">
                        <h4 class="pb-3">{{newLang.contactInfo}}</h4>
                        <p><i class="fas fa-phone pr-4"></i> +358 46 6334501</p>
                        <p><i class="fas fa-envelope pr-4"></i> support@delivigo.com </p>
                        <p><i class="far fa-clock pr-4"></i> Mon-Sun/ 24hr  </p>
                        </div>
                    </div>
             </div>
<!--            </div>-->
        </div>
            </div>
            <div class="footer-data">
                <div class="row py-4">
                    <div class="col-12 order-last order-md-first col-md-4">
                        <div class="copyright">
                            <p>© DeliviGo 2019 - 2020 {{newLang.reights}}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 order-first m-auto">
                        <div class="social">
                            <div class="circle">
                                <i class="fab fa-facebook-f"></i>
                            </div>
                            <div class="circle">
                                <i class="fab fa-twitter"></i>
                            </div>
                            <div class="circle">
                                <i class="fab fa-instagram"></i>
                            </div>
                            <div class="circle">
                                <i class="fab fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="payment">
                            <img src="/images/mastercard.png" alt="master card">
                            <img src="/images/visa.png" alt="visa card">
                            <img src="/images/paypal.png" alt="paypal card">
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { EventBus } from '../main';
import {lang} from "../components/lang/lang";
export default {
    data(){
        return{
            isFooter:false,
            newCount: 0,
            newLang: lang.fn,
            download: {
                appHeading: 'Have you got the app?',
                appDescription:'Get yours now - available on the iOS and Android app stores!',
                iphone:'./images/iphoneApp.png',
                android: './images/mobileApp.png',
            }
        }
    },
    methods: {
        checkLang() {
            console.log("hereItFooter");
        var temp = localStorage.getItem("lang");
        if(temp == null || temp === "EN") {
          localStorage.setItem("lang", "EN");
          this.newLang = lang.en;
        } else if(temp === "FN" ) {
          this.newLang = lang.fn;
          localStorage.setItem("lang", "FN");
        } else {
          this.newLang = lang.sp;
          localStorage.setItem("lang", "ES");
        }
        // this.value = temp;
      },
        changeTheLang() {
            console.log("here it footer");
            this.checkLang();
        },
    },
    created() {
        this.isFooter = false;
        this.changeTheLang();
        this.$eventBus.$on('checkFooter', (footerData) => {
        // do something with the data
            if(footerData === 'footer') {
                this.isFooter = true;
            } else {
                this.isFooter = false;
            }
        });
        EventBus.$on("changeLang", () => {
            this.changeTheLang();
        })
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
    /*float: left;
    margin-top: 48px;
    margin-bottom: 28px;*/
}
.copyright p{
    font-weight: normal;
    font-size: 16px;
    color: #cccccc;
    line-height: 43px;
    margin: 0;
}
.infoLink h4{
    font-size: 21px;
    font-weight: 500;
    /*color: rgb(235 155 70);*/
    color:#2875b3;
}
.quickLinks p{
    color: #cccccc;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
}
.quickLinks p i {
    font-size: 20px;
    /*color: rgb(235 155 70);*/
    color:#2875b3;
}
.quickLinks{
    display: table;
    margin: 0 auto;
}
.quickLinks ul{
    list-style: none;
}
.quickLinks a{
    font-weight: normal;
    font-size: 18px;
    color: #cccccc;
    line-height: 43px;
}

.download {
    position: relative;
    width: 100%;
    align-items: center;
}
.app-download h3 {
    /*font-family: "PantonSemi";*/
    font-weight: 500;
    font-size: 30px;
    /*color: rgb(235 155 70);*/
    margin: 0;
    color:#2875b3;
}
.app-download p {
    /*font-family: "Roboto";*/
    color: #cccccc;
    font-size: 18px;
    /*max-width: 327px;*/
    font-weight: normal;
    margin: 13px 0 72px 0;
}
.app-download a {
    display: inline-block;
}
.margin-right-10px{
    margin-right: 10px;
}
.social{
    display: table;
    margin: auto;
}
.social .circle{
    border-radius: 50%;
    /*background-color: rgb(251 150 8);*/
    background-color: #2668A3;
    width: 30px;
    height: 30px;
    text-align: center;
    display: inline-block;
    padding-top:6px;
    padding-right: 2px;
}
.social >*{
    margin-right: 10px;
}
.social > *:last-child{
    margin-right: 0px;
}
.social .circle i{
    color: #fff;
    font-size: 20px;
}
.payment{
    display: table;
    margin: auto;
}
.payment > *{
    margin-right: 10px;
}
.payment > *:last-child{
    margin-right: 0;
}
.payment img{
    display: inline-block;
    width: 50px;
}
/*.downloads{
    display: none;
}
.display-block{
    display: block;
}*/
</style>
