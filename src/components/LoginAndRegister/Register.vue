<template>
    <div class="m-top">
        <div class="row">
            <div class="col-12 px-5">
            <form action="" name="registerForm" v-on:submit.prevent class="myProfile">
                <div class="form-group row">
                    <label for="fullname" class="col-sm-2 col-form-label">{{newLang.fullName}}</label>
                    <div class="col-sm-10">
                    <input type="text"
                           class="form-control"
                           v-model="userData.fullName"
                           placeholder="Name Here...!"
                           id="fullname"
                           v-on:input="checkName()"
                           required>
                    <label class="errorMessage" id="nameError"></label>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="number" class="col-sm-2 col-form-label">{{newLang.mobileNumber}}</label>
                    <div class="col-sm-10">
                        <input type="text"
                               class="form-control"
                               v-model="userData.mobile"
                               placeholder="e.g 03121234123"
                               v-on:input="checkMobileNumber()"
                               id="number" required>
                        <label class="errorMessage" id="numberError"></label>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">{{newLang.emailAddress}}</label>
                    <div class="col-sm-10">
                        <input type="email"
                               class="form-control"
                               placeholder="abc@mail.com"
                               v-on:input="checkEmail()"
                               v-model="userData.email"
                               id="email" required>
                        <label class="errorMessage" id="emailError"></label>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="npwd" class="col-sm-2 col-form-label">{{newLang.password}}</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control"
                               placeholder="Password Here...!"
                               v-on:input="checkPassword()"
                               v-model="userData.password" id="npwd" required>
                        <label class="errorMessage" id="passwordError"></label>
                    </div>
                </div>

                <!-- Material unchecked -->
                <div class="form-check">
                    <span class="form-check-label"
                           for="materialUnchecked">
                        <input type="checkbox"
                               class="form-check-input"
                               ref="termsChecked"
                               name="terms"
                                v-on:input="checkTerms()"
                               id="materialUnchecked" required>{{newLang.iAgree}} <a href="#" @click="loadTermsModal">{{newLang.terms}}</a> {{newLang.and}} <a href="#" @click="loadPolicyModal">{{newLang.privacy}}.</a>
                    </span>
                    <label class="errorMessage" id="termsCheckError"></label>
                </div>
                <div class="button text-center">
                    <button type="submit" :disabled="disableSubmit" @click="registerUser" class="btn btn-submit">{{newLang.signUp}}</button>
                        <span class="or">OR</span>
                    <facebook-login class="fb p-0 mt-3"
                                    appId="649127768995419"
                                    @login="onLogin"
                                    @logout="onLogout"
                                    @sdk-loaded="sdkLoaded">
                    </facebook-login>
                </div>
                <!-- <v-facebook-login app-id="649127768995419"></v-facebook-login> -->
            </form>
            </div>
        </div>
        <b-modal hide-footer refs="modal" size="xl" scrollable class="my-modal"   id="modal-1" title="Terms and Conditions">
                <div class="container-fluid px-0">
                            <terms-and-conditions></terms-and-conditions>
                </div>
                <div class="btn-modal">
                    <hr>
                    
                </div>
            </b-modal>
            <b-modal hide-footer refs="modal" size="xl" scrollable class="my-modal"   id="modal-2" title="Privacy Policy">
                <div class="container-fluid px-0">
                            <policy></policy>
                </div>
                <div class="btn-modal">
                    <hr>
                </div>
            </b-modal>
    </div>
</template>

<script>
    import {registerUser} from "../api/Profile";
    import {baseAddress} from "../../main";
    import {EventBus} from "../../main";
    import {validEmail} from "../util/validate";
    import {facebookAPILogin} from "../api/FacebookLogin";
    import {saveAddress} from "../api/DeliveryAddress.js";
    import TermsAndConditions from '@/components/Documents/TermsAndConditions'
    import Policy from '@/components/Documents/Policy'
import facebookLogin from 'facebook-login-vuejs';
import VFacebookLogin from 'vue-facebook-login-component'
    export default {
        name: "Register",
        props: ['newLang'],
         components: {
          VFacebookLogin,
          //   VFacebookLoginScope
            facebookLogin,
            TermsAndConditions,
            Policy

        },
        data() {
            return {
                userData: {
                    firstName: '',
                    lastName: '',
                    fullName: '',
                    mobile: '',
                    email: '',
                    password: '',
                    deviceToken: 'web',
                    deviceType: 'web',
                    deviceUniqueCode: 'web',
                },
                fbUserData: {
                    FirstName: "",
                    LastName: "",
                    FacebookUId: "",
                    ImageUrl: "",
                    Password: "",
                    Email: "",


                    DeviceUniqueCode: "web",
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
                url: '',
                result: true,
                message: '',
                objStatus: false,
                disableSubmit: true,
                totalTrue: 5,
                nameCheck: false,
                numberCheck: false,
                emailCheck: false,
                passwordCheck: false,
                termsCheck : false,
                payload: null,
            }
        },
        mounted() {
            this.$emit("updateTheCounter",'');
        },
        methods: {
            checkTerms() {
                var isChecked = document.registerForm.terms.checked;
                if(isChecked) {
                    this.termsCheck = true;
                    document.getElementById('termsCheckError').style.visibility = "hidden";

                } else {
                    document.getElementById('termsCheckError').style.visibility = "visible";
                    document.getElementById('termsCheckError').innerHTML = this.newLang.checkBoxError;
                    this.termsCheck = false;
                }
                this.checkAll();
            },
            async registerUser() {
                this.userData.firstName = this.userData.fullName.substr(0,this.userData.fullName.indexOf(' '));
                this.userData.lastName = this.userData.fullName.substr(this.userData.fullName.indexOf(' ')+1);
                console.log('reg',this.userData);
                if(this.checkObject()) {
                    registerUser(this.userData).then(response => {
                        this.result = response.HasErrors;
                        this.message = response.ResultMessages[0].Message;
                        if(response.HasErrors === false) {
                            this.showNotification('success',this.newLang.success,this.newLang.signUpSucces);
                            EventBus.$emit('userImage',baseAddress+response.ImageUrl);
                            this.$router.push({path:'/signin'});
                        } else {
                            this.showNotification('error',this.newLang.error,this.newLang.signUpFailed);
                        }
                    }, error=> {
                        console.log(error);
                        this.showNotification('error',this.newLang.error,this.newLang.signUpFailed);
                    })
                } else {
                    this.showNotification('error',this.newLang.error,this.newLang.emptyFields);
                }

            },
            checkObject() {
                if( this.userData.fullName != '' &&
                    this.userData.mobile != '' &&
                    this.userData.email !='' &&
                    this.userData.password !='' &&
                    this.$refs.termsChecked.checked != false) {
                    return true;
                }
                else {
                    return false;
                }
            },
            showNotification(type, title, message) {
                console.log('after Fail',message);
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
            getUserData() {
                console.log("FBObject",this.FB);
                console.log("Payload",this.payload);
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
                            this.fbUserData.ImageUrl = userInformation.picture.data.url;
                            facebookAPILogin(this.fbUserData).then(response => {
                                if(response.HasErrors === false) {
                                    if(localStorage.getItem('isRes' === 'false')) {
                                        this.showNotification('success', this.newLang.success, this.newLang.signInSuccess);
                                        console.log('id',response.Id);
                                        localStorage.setItem('userProfile',response.UrlImage);
                                        this.$store.dispatch('storeToken',response);
                                        if(localStorage.getItem('saveAddress') === 'true') {
                                        var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                        addressData.CustomerId = response.Id;
                                        saveAddress(addressData).then(response => {
                                            console.log(response);
                                            localStorage.setItem('addressObj', JSON.stringify({}));
                                            localStorage.setItem(saveAddress, 'false');
                                        })
                                    }
                                        this.$router.push({path:'/'});
                                        localStorage.setItem("fbLogin", true);
                                        // this.$router.go();
                                    } else {
                                        this.showNotification('success', this.newLang.success, this.newLang.signInSuccess);
                                        console.log('id',response.Id);
                                        localStorage.setItem('userProfile',response.UrlImage);
                                        this.$store.dispatch('storeToken',response);
                                        localStorage.setItem("fbLogin", true);
                                        if(localStorage.getItem('saveAddress') === 'true') {
                                        var addressData = JSON.parse(localStorage.getItem('addressObj'));
                                        addressData.CustomerId = response.Id;
                                        saveAddress(addressData).then(response => {
                                            console.log(response);
                                            localStorage.setItem('addressObj', JSON.stringify({}));
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
            },
            loadSDK() {
                this.payload = JSON.parse(localStorage.getItem("payload"));
                [localStorage.getItem("isFB") === "true"? this.sdkLoaded(this.payload): ""];
            },
            sdkLoaded(payload) {
                console.log('payload',payload);
                
                this.payload = payload;
                this.FB = payload.FB;
                localStorage.setItem("isFB", true);
                localStorage.setItem("payload",JSON.stringify(payload));
                this.isConnected = payload.isConnected;
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            },
            //validation code start
            checkName() {
                var res = false;
                if(this.userData.fullName === "") {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = this.newLang.nameEmptyError;
                    document.getElementById('fullname').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(!this.userData.fullName.match(/^[a-zA-Z\s]+$/)) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = this.newLang.nameWrongInput;
                    document.getElementById('fullname').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(this.userData.fullName.length < 3) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = this.newLang.nameLengthError;
                    document.getElementById('fullname').style.borderColor = "red";
                    this.nameCheck = false;
                } else {
                    document.getElementById('nameError').style.visibility = "hidden";
                    document.getElementById('nameError').innerHTML = "";
                    document.getElementById('fullname').style.borderColor = "grey";
                    res = true;
                    this.nameCheck = true;
                }
                return res;
            },
            checkMobileNumber() {
                var res = false;
                if(this.userData.mobile === "") {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.newLang.numberEmptyError;
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                }else if(!this.userData.mobile.match(/^[0-9]+$/)) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.newLang.numberWrongInpur;
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                } else if(this.userData.mobile.length < 11) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.newLang.numberLengthError;
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                } else {
                    document.getElementById('numberError').style.visibility = "hidden";
                    document.getElementById('numberError').innerHTML = "";
                    document.getElementById('number').style.borderColor = "grey";
                    this.numberCheck = true;
                    res = true;
                }
                return res;
            },
            checkEmail() {
                if(validEmail(this.userData.email)) {
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
                if(this.userData.password === "") {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = this.newLang.passwordEmptyError;
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(!this.userData.password.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = this.newLang.passwordWrongInput;
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(this.userData.password.length < 6) {
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
            loadTermsModal() {
                this.$bvModal.show("modal-1");
            },
            loadPolicyModal() {
                this.$bvModal.show("modal-2");
            },
            checkAll() {
                if(this.emailCheck && this.numberCheck && this.nameCheck && this.passwordCheck && this.termsCheck) {
                    this.disableSubmit = false;
                } else {
                    this.disableSubmit = true;
                }
            }

        },
        mounted() {
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
       word-break: break-word;
   }
   .form-group input{
       border: 0;
       border-bottom: 1px solid #BCBDBF;
       border-radius: 0;
       font-size: 16px;
       background:none;
   }
   .form-group input:focus{
       border-bottom: 1px solid #5860ff;
   }
   .form-control:focus{
       box-shadow: none;
       -webkit-box-shadow: none;
   }
    /*.myProfile input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 0;
        width: 400px;
        border-radius: 0;
        color: #999999;
        font-size: 16px;
        background:none;
    }*/
    .form-check input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 0;
        width: 20px !important;
        /*margin-left: -240px;*/
        border-radius: 0;
        color: #999999;
        font-size: 16px;
        background:none;
    }
   /* .myProfile input:focus{
        border-bottom: 1px solid #5860ff;
    }*/

    .button .btn-submit{
        /*margin-right: 50px;*/
        background-color: #5860ff;
        color: white;

    }
    .button .btn-cancel{
        border: 2px solid #5860ff;
        color: #5860ff;
    }
    .button{
        margin-top: 50px;
        margin-bottom: 100px;
    }
    .button button{
        border-radius: 30px;
        width: 150px;
    }
    .form-control:focus{
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .edit-btn i{
        margin-left:20px ;
        font-size: 25px;
        color: #9c9c9c;
    }
    .edit-btn i:hover{
        color: #5860ff;
    }
/* new */
 .m-top{
        margin-top: 30px;
    }
    .m-bottom{
        margin-bottom: 100px;
    }
    /*.col-md-4{*/
    /*    padding: 0;*/
    /*}*/
    .profile-heading{
        color: #5860ff;
        font-size: 34px;
        font-weight: 500;
        margin-bottom: 50px;
    }
    .address-block{
        border-bottom: 1px solid #9C9C9C;
        /*margin-bottom: 30px;*/
    }
    .address-block p{
        font-size: 16px;
        padding-left: 5px;
        display: inline-block;
    }
    
    .card-image{
        display: inline-block;
        width: 50px;
        height: 50px;
    }
    .card-image img{
        width: 100%;
        height: 100%;
    }
    .icon{
        display: inline-block;
        position: absolute;
        right: 0;
        text-align: right;
        padding-right: 0;
    }
    .icon i{
        margin: 0 15px 0 0;
        font-size: 18px;
    }
    .icon .cancel{
        color: red;
    }
    .cancel:hover{
        color: #9C0000;
    }
    .edit{
        color: #5860ff;
        margin-right: 15px;
    }
    .edit:hover{
        color: #4F55C2;
    }
    .radio{
        display: flex;
        margin-top: 10px;
        float: right;
    }
    .radio input{
        margin-top: 3px;
        height:18px;
        width: 18px;
        margin-right: 5px;
    }
    .radio label{
        font-size: 16px;
    }
    .btn-modal{
        display: flex;
        justify-content: flex-end;
        margin: 10px 0 20px 0;
    }
    .or{
        font-size: 20px;
        font-weight: 500;
        display: block;
        padding-top: 12px;
    }
    @media screen and (max-width: 576px) {
        .m-top{
            margin-top: 50px;
        }
    }
</style>
