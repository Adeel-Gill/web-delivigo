<template>
    <div class="pl-5 m-top">
        <div class="row">
            <form action="" v-on:submit.prevent class="myProfile">
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <label class="errorMessage" id="nameError"></label>
                    <input type="text"
                           class="form-control"
                           v-model="userData.fullName"
                           placeholder="Name Here...!"
                           id="fullname"
                           v-on:input="checkName()"
                            required>
                </div>
                <div class="form-group">
                    <label for="number">Mobile Number</label>
                    <label class="errorMessage" id="numberError"></label>
                    <input type="text"
                           class="form-control"
                           v-model="userData.mobile"
                           placeholder="e.g 03121234123"
                            v-on:input="checkMobileNumber()"
                           id="number" required>
                </div>
                <div class="form-group">
                    <label for="email">EMAIL ADDRESS</label>
                    <label class="errorMessage" id="emailError"></label>
                    <input type="email"
                           class="form-control"
                           placeholder="abc@mail.com"
                            v-on:input="checkEmail()"
                           v-model="userData.email"
                           id="email" required>
                </div>
                <div class="form-group">
                    <label for="npwd">PASSWORD</label>
                    <label class="errorMessage" id="passwordError"></label>
                    <input type="password" class="form-control"
                           placeholder="Password Here...!"
                            v-on:input="checkPassword()"
                           v-model="userData.password" id="npwd" required>
                </div>
                <!-- Material unchecked -->
                <div class="form-check">
                    <span class="form-check-label"
                           for="materialUnchecked">
                        <input type="checkbox"
                               class="form-check-input"
                               ref="termsChecked"
                               id="materialUnchecked" required>I agree to the <a href="#" @click="loadTermsModal">terms of services</a> and <a href="#" @click="loadPolicyModal">privacy policy.</a>
                    </span>
                </div>
                <div class="button">
                    <button type="submit" :disabled="disableSubmit" @click="registerUser" class="btn btn-submit">SIGN UP</button>
                        <p>- - - - - - - - - - - - - - OR - - - - - - - - - - - - - -</p>
                    <facebook-login class="mx-0 px-0"
                                    appId="649127768995419"
                                    @login="onLogin"
                                    @logout="onLogout"
                                    @sdk-loaded="sdkLoaded">
                    </facebook-login>
                </div>

            </form>
        </div>
        <b-modal hide-footer refs="modal" size="lg" scrollable class="my-modal"   id="modal-1" title="Terms and Conditions">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <terms-and-conditions></terms-and-conditions>
                        </div>
                    </div>
                </div>
                <div class="btn-modal">
                    <hr>
                    
                </div>
            </b-modal>
            <b-modal hide-footer refs="modal" size="lg" scrollable class="my-modal"   id="modal-2" title="Terms and Conditions">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <policy></policy>
                        </div>
                    </div>
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
    import TermsAndConditions from '@/components/Documents/TermsAndConditions'
    import Policy from '@/components/Documents/Policy'
import facebookLogin from 'facebook-login-vuejs';
    export default {
        name: "Register",
         components: {
          // VFacebookLogin
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
            }
        },
        methods: {
            async registerUser() {
                this.userData.firstName = this.userData.fullName.substr(0,this.userData.fullName.indexOf(' '));
                this.userData.lastName = this.userData.fullName.substr(this.userData.fullName.indexOf(' ')+1);
                console.log('reg',this.userData);
                if(this.checkObject()) {
                    registerUser(this.userData).then(response => {
                        this.result = response.HasErrors;
                        this.message = response.ResultMessages[0].Message;
                        if(response.HasErrors === false) {
                            this.showNotification('success','Success','Signup success!');
                            EventBus.$emit('userImage',baseAddress+response.ImageUrl);
                            this.$router.push({path:'/signin'});
                        } else {
                            this.showNotification('error','Error','Signup failed!');
                        }
                    }, error=> {
                        console.log(error);
                        this.showNotification('error','Error','Signup failed!');
                    })
                } else {
                    this.showNotification('error','Error','Please fill all the fields first!');
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
                                    this.showNotification('success', 'Success', 'Sign in successfully');
                                    console.log('id',response.Id);
                                    localStorage.setItem('userProfile',response.UrlImage);
                                    this.$store.dispatch('storeToken',response);
                                    this.$router.push({path:'/'});
                                    localStorage.setItem("fbLogin", true);
                                    this.$router.go();
                                } else {
                                    this.showNotification('error', 'Error', 'Sign in failed');
                                }
                            }, error => {
                                console.log('error',error);
                                this.showNotification('error', 'Error', 'Sign in failed');
                            })
                        }
                        console.log('url',this.url);
                    }
                )
                EventBus.$emit('StartOverlay', false);
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected
                this.FB = payload.FB
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
                    document.getElementById('nameError').innerHTML = "Name Field Cannot Be Empty...!";
                    document.getElementById('fullname').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(!this.userData.fullName.match(/^[a-zA-Z\s]+$/)) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = "Wrong Input Enter Alphabets Only...!";
                    document.getElementById('fullname').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(this.userData.fullName.length < 3) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = "Wrong Input Enter minimum 3 Alphabets ..!";
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
                    document.getElementById('numberError').innerHTML = "Number Field Cannot Be Empty...!";
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                }else if(!this.userData.mobile.match(/^[0-9]+$/)) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = "Wrong Input Enter Numbers Only...!";
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                } else if(this.userData.mobile.length < 11) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = "Wrong Input Enter minimum 11 Numbers ..!";
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
                   document.getElementById('emailError').innerHTML = "Email invalid...!";
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
                    document.getElementById('passwordError').innerHTML = "Password Cannot Be Empty...!";
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(!this.userData.password.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = "Wrong Input alphabets only...!";
                    document.getElementById('npwd').style.borderColor = "red";
                    this.passwordCheck = false;
                } else if(this.userData.password.length < 6) {
                    document.getElementById('passwordError').style.visibility = "visible";
                    document.getElementById('passwordError').innerHTML = "Password must be upto 6 ..!";
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
                if(this.emailCheck && this.numberCheck && this.nameCheck && this.passwordCheck) {
                    this.disableSubmit = false;
                } else {
                    this.disableSubmit = true;
                }
            }

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
    .myProfile input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 0;
        width: 400px;
        border-radius: 0;
        color: #999999;
        font-size: 16px;
        background:none;
    }
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
    .myProfile input:focus{
        border-bottom: 1px solid #5860ff;
    }

    .button .btn-submit{
        margin-right: 50px;
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
    @media screen and (max-width: 576px) {
        .m-top{
            margin-top: 50px;
        }
    }
</style>
