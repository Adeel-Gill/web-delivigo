<template>
    <div class="pl-md-5 pl-0  m-top">
        <div class="row">
            <div class="col-12 px-5">
            <form action="" v-on:submit.prevent class="myProfile">
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">{{newLang.email}}</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control"
                               v-model="userData.Email"
                               placeholder="abc@mail.com"
                               v-on:input="checkEmail()"
                               id="email" required>
                        <label class="errorMessage" id="emailError"></label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="npwd" class="col-sm-2 col-form-label">{{newLang.password}}</label>
                    <div class="col-sm-10">
                        <input type="password"
                               class="form-control"
                               placeholder="Password Here...!"
                               v-on:input="checkPassword()"
                               v-model="userData.Password" id="npwd" required>
                        <label class="errorMessage" id="passwordError"></label>
                    </div>
                </div>
                <div class="text-right">
                    <router-link to="/searchPhone" >Forgot Password? </router-link>
                </div>
                <div class="button text-center">
                    <button type="submit" @click="checkCredentials" :disabled="false" class="btn btn-submit">{{newLang.signin}}</button>
                    <span class="or">OR</span>
                    <facebook-login class="fb p-0 mt-3"
                                    appId="649127768995419"
                                    @login="onLogin"
                                    @logout="onLogout"
                                    @sdk-loaded="sdkLoaded">
                    </facebook-login>
                </div>
<!--                <v-facebook-login app-id="649127768995419" @login="fbLogin"></v-facebook-login>-->
<!--                <v-facebook-login-scope app-id="649127768995419" v-model="model" @sdk-init="handleSdkInit">-->
<!--                    &lt;!&ndash; Compose HTML/CSS here, otherwise nothing will be rendered &ndash;&gt;-->
<!--                    <button  @click="doLogin">-->
<!--                        &lt;!&ndash; Compose with `scope` here &ndash;&gt; Login-->
<!--                    </button>-->
<!--                </v-facebook-login-scope>-->

            </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {checkCredentials} from "../api/Profile";
    import {mapActions} from "vuex";
    import {facebookAPILogin} from "../api/FacebookLogin";
    import {saveAddress} from "../api/DeliveryAddress.js";
    import {EventBus} from "../../main";
    // import VFacebookLogin from "vue-facebook-login-component";
    // import { VFBLoginScope as VFacebookLoginScope } from 'vue-facebook-login-component'
    import facebookLogin from 'facebook-login-vuejs';
     import {validEmail} from "../util/validate";
    export default {
        name: "Login",
        props: ['newLang'],
        components: {
          // VFacebookLogin
          //   VFacebookLoginScope
            facebookLogin
        },
        data() {
            return {
                userData: {
                    Password: '',
                    Email: '',
                    DeviceUniqueCode: "web",
                    DeviceToken: "web",
                    DeviceType: "web"
                },
                fbUserData: {
                    FirstName: "",
                    LastName: "",
                    FacebookUId: "",
                    UrlImage: "",
                    Password: "",
                    Email: "",
                    DeviceUniqueCode: "web",
                    DeviceType: "web",
                    DeviceToken: "web",
                },

                // FB: {},
                model: {},
                scope: {},
                //data
                isConnected: false,
                name: '',
                email: '',
                personalID: '',
                FB: undefined,
                emailCheck: false,
                passwordCheck: false,
                disableSubmit: true,
                url: '',
                payload: {
                    isConnected: false,
                    FB: {
                        api: null
                    }
                }
            }
        },
        mounted() {
            this.$emit("updateTheCounter",0);
            if(localStorage.getItem('userProfile') === 'null') {
                localStorage.setItem('userProfile','');
            }
        },
        methods: {
            ...mapActions([
                'storeToken'
            ]),
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
            async checkCredentials() {
                localStorage.setItem("changeCount", 0)
                if(this.checkObject()) {
                     checkCredentials(this.userData).then(response => {
                        if(!response.HasError) {
                            if(localStorage.getItem('isRes') === 'false' || localStorage.getItem('isRes') == null) {
                                console.log('trueid',response.result.Id);
                                localStorage.setItem('userProfile',response.result.UrlImage);
                                // console.log('cart',JSON.parse(localStorage.getItem('cart').replace (/(^')|('$)/g, '')));
                                // console.log('cart',JSON.parse(JSON.stringify(localStorage.getItem('cart'))));

                                console.log('cart',JSON.parse(localStorage.getItem('cart')));
                                 this.$store.dispatch('storeToken',response.result);
                                if(localStorage.getItem('saveAddress') === 'true') {
                                    console.log('test1');
                                    var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                    console.log('test2');
                                    addressData.CustomerId = response.result.Id;
                                    saveAddress(addressData).then(response => {
                                        console.log(response);
                                        localStorage.setItem('addressObj', JSON.stringify({}));
                                        localStorage.setItem(saveAddress, 'false');
                                    })
                                    this.$emit('updateTheCounter', '');
                                }
                               
                                // localStorage.setItem("changeCount", Number(localStorage.getItem("changeCount"))++);
                                this.$router.push({path:'/'});
                                //  var num =Number(localStorage.getItem("changeCount"));
                                //  num += 1;
                                // localStorage.setItem("changeCount", num);
                                
                                // this.$router.go();
                                // this.storeToken('storeToken',response.AuthToken, response)
                            } else {
                                this.showNotification('success', this.newLang.success, this.newLang.signInSuccess);
                                this.$store.dispatch('storeToken',response);
                                this.$emit('updateTheCounter', '');
                                if(localStorage.getItem('saveAddress') === 'true') {
                                    var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                    addressData.CustomerId = response.result.Id;
                                    saveAddress(addressData).then(response => {
                                        console.log(response);
                                        localStorage.setItem('addressObj', JSON.stringify({}));
                                        localStorage.setItem(saveAddress, 'false');
                                    })
                                    this.$router.push({path: '/restaurant/'+localStorage.getItem('isRes')});
                                    localStorage.setItem('isRes', 'false');
                                } else {
                                    this.$router.push({path: '/restaurant/'+localStorage.getItem('isRes')});
                                    localStorage.setItem('isRes', 'false');
                                } 
                            }
                            

                        } else {
                            
                            this.showNotification('error', this.newLang.error, this.newLang.singInFailed);
                        }
                    }, error => {
                         console.log(error);
                         this.showNotification('error',this.newLang.error,this.newLang.errorOccurred);
                     })
                } else {
                    this.showNotification('warn', this.newLang.warning, this.newLang.emptyFields);
                }
            },
            checkObject() {
                if(this.userData.Password != '' && this.userData.Email != '') {
                    return true;
                } else {
                    return false;
                }
            },
            fbLogin(response) {
                console.log("response",response)
                // this.FB = FB;
                // this.scope = scope;
                // console.log("FB",this.FB);
                // console.log("scope",this.scope);
                // this.scope.login(response => {
                //     console.log("loginStatus", response);
                // });
            },
            loadSDK() {
                // this.payload = JSON.parse(localStorage.getItem("payload"));
                // if()
                console.log("hereAt");
                // if(localStorage.getItem("isFB") === "true") {
                //     local
                // }
                [localStorage.getItem("isFB") === "true"? this.sdkLoaded(JSON.parse(localStorage.getItem("payload"))): ""];
                // [localStorage.getItem("isFB") === "true"? this.sdkLoaded(JSON.parse(localStorage.getItem("payload"))): ""];
            },
            handleSdkInit({ FB, scope }) {
                this.FB = FB
                this.scope = scope
            },
            doLogin() {
                this.scope.login(response => {
                   console.log("loginResponse", response);
                });
            },
            getUserData() {

                if(localStorage.getItem('allLogout') === 'false') {
                    EventBus.$emit('StartOverlay', true);
                this.FB.api('/me', 'GET', { fields: 'id,name,first_name,last_name,email,picture.type(large)' },
                    userInformation => {
                    console.log("userInfo",userInformation);
                        this.personalID = userInformation.id;
                        if(this.personalID != '' || this.personalID != null) {
                            this.fbUserData.FirstName = userInformation.first_name;
                            this.fbUserData.LastName = userInformation.last_name;
                            this.fbUserData.FacebookUId = this.fbUserData.Password = userInformation.id;
                            this.fbUserData.Email = userInformation.email;
                            this.fbUserData.UrlImage = userInformation.picture.data.url;
                            
                            facebookAPILogin(this.fbUserData).then(response => {
                                if(!response.HasError) {
                                    if(localStorage.getItem('isRes')==='false') {
                                        this.showNotification('success', this.newLang.success, this.newLang.signInSuccess);
                                        console.log('id',response.result.Id);
                                        localStorage.setItem('userProfile',response.result.UrlImage);
                                        this.$store.dispatch('storeToken',response.result);
                                        this.$emit('updateTheCounter', '');
                                        if(localStorage.getItem('saveAddress') === 'true') {
                                        var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                        addressData.CustomerId = response.result.Id;
                                        saveAddress(addressData).then(response => {
                                            console.log(response);
                                            localStorage.setItem('addressObj', {});
                                            localStorage.setItem(saveAddress, 'false');
                                        })
                                    }
                                        this.$router.push({path:'/'});
                                        localStorage.setItem("fbLogin", true);
                                    // this.$router.go();
                                    } else {
                                        this.showNotification('success', this.newLang.success, this.newLang.signInSuccess);
                                        console.log('id',response.result.Id);
                                        this.$emit('updateTheCounter', '');
                                        localStorage.setItem('userProfile',response.result.UrlImage);
                                        this.$store.dispatch('storeToken',response.result);
                                        localStorage.setItem("fbLogin", true);
                                        if(localStorage.getItem('saveAddress') === 'true') {
                                        var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                        addressData.CustomerId = response.result.Id;
                                        saveAddress(addressData).then(response => {
                                                console.log(response);
                                                localStorage.setItem('addressObj', {});
                                                localStorage.setItem(saveAddress, 'false');
                                            })
                                            this.$router.push({path: '/restaurant/'+localStorage.getItem('isRes')});
                                            localStorage.setItem('isRes', 'false');
                                        }
                                        
                                    }
                                    
                                } else {
                                    this.showNotification('error', this.newLang.error, this.newLang.singInFailed);
                                }
                            }, error => {
                                console.log('error',error);
                                this.showNotification('error', this.newLang.error, this.newLang.singInFailed);
                            })
                        }
                        console.log('url',this.url);
                    }
                )
                EventBus.$emit('StartOverlay', false);
                } 
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected;
                this.FB = payload.FB;
                this.payload.isConnected = payload.isConnected;
                this.payload.FB.api = payload.FB.api;
                localStorage.setItem("isFB", true);
                localStorage.setItem("payload",JSON.stringify(this.payload));
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
                localStorage.getItem('allLogout',false);
            },
            checkEmail() {
                if(validEmail(this.userData.Email)) {
                   document.getElementById('emailError').style.visibility = "hidden";
                   document.getElementById('emailError').innerHTML = "";
                   document.getElementById('email').style.borderColor = "grey";
                //    this.disableButton = false;
                this.emailCheck = true;
                   return true;
                } else {
                   document.getElementById('emailError').style.visibility = "visible";
                   document.getElementById('emailError').innerHTML = this.newLang.emailError;
                   document.getElementById('email').style.borderColor = "red";
                //    this.disableButton = true;
                this.emailCheck = false;
                   return false;
                }
            },
            checkPassword() {
                var res = false;
                if(this.userData.Password === "") {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = this.newLang.passwordEmptyError;
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(!this.userData.Password.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = this.newLang.passwordWrongInput;
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(this.userData.Password.length < 6) {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = this.newLang.passwordLengthError;
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else {
                    document.getElementById('passwordError').style.visibility = "hidden";
                    document.getElementById('passwordError').innerHTML = "";
                    document.getElementById('npwd').style.borderColor = "grey";
                    this.passwordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkAll() {
                if(this.emailCheck && this.passwordCheck) {
                    this.disableSubmit = false;
                } else {
                    this.disableSubmit = true;
                }
            }
        },
        mounted() {
            localStorage.getItem('allLogout',true);
            this.loadSDK();
        }

    }
</script>

<style scoped>
   /* @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }
    .row{
        font-family:pantonb ;
    }*/
    .m-top{
        margin-top: 30px;
    }
   .form-group label{
       align-self: center;
       color: black;
       font-weight: 500;
       font-size: 17px;
   }
   .form-group input{
       border: 0;
       border-bottom: 1px solid #BCBDBF;
       border-radius: 0;
       font-size: 16px;
       background:none;
       color: #000;
   }
   .form-group input:focus{
       border-bottom: 1px solid #5860ff;
   }
   .form-control:focus{
       box-shadow: none;
       -webkit-box-shadow: none;
   }
    .button .btn-submit{
        background-color: #5860ff;
        color: white;

    }
    .button .btn-cancel{
        border: 2px solid #5860ff;
        color: #5860ff;
    }
    .button{
        margin-top: 50px;
        margin-bottom: 10px;
    }
    .button button{
        border-radius: 30px;
        width: 150px;
    }
    .edit-btn i{
        margin-left:20px ;
        font-size: 25px;
        color: #9c9c9c;
    }
    .edit-btn i:hover{
        color: #5860ff;
    }
   .or{
       font-size: 20px;
       font-weight: 500;
       display: block;
       padding-top: 12px;
   }
</style>
