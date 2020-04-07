<template>
    <div class="pl-5 m-top">
        <div class="row">
            <form action="" v-on:submit.prevent class="myProfile">
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text"
                           class="form-control"
                           v-model="userData.fullName"
                           placeholder="Name Here...!"
                           id="fullname"
                            required>
                </div>
                <div class="form-group">
                    <label for="number">Mobile Number</label>
                    <input type="text"
                           class="form-control"
                           v-model="userData.mobile"
                           placeholder="e.g 03121234123"
                           id="number" required>
                </div>
                <div class="form-group">
                    <label for="email">EMAIL ADDRESS</label>
                    <input type="email"
                           class="form-control"
                           placeholder="abc@mail.com"
                           v-model="userData.email"
                           id="email" required>
                </div>
                <div class="form-group">
                    <label for="npwd">PASSWORD</label>
                    <input type="password" class="form-control"
                           placeholder="Password Here...!"
                           v-model="userData.password" id="npwd" required>
                </div>
                <!-- Material unchecked -->
                <div class="form-check">
                    <span class="form-check-label"
                           for="materialUnchecked">
                        I agree to the <a href="#" @click="loadTermsModal">terms of services</a> and <a href="#" @click="loadPolicyModal">privacy policy.</a>
                        <input type="checkbox"
                               class="form-check-input"
                               ref="termsChecked"
                               id="materialUnchecked" required></span>
                </div>
                <div class="button">
                    <button type="submit" @click="registerUser" class="btn btn-submit">SIGN UP</button>
                </div>
            </form>
            <facebook-login class="button"
                            appId="649127768995419"
                            @login="onLogin"
                            @logout="onLogout"
                            @sdk-loaded="sdkLoaded">
            </facebook-login>
        </div>
    </div>
</template>

<script>
    import {registerUser} from "../api/Profile";
    import {baseAddress} from "../../main";
    import {EventBus} from "../../main";
import facebookLogin from 'facebook-login-vuejs';
    export default {
        name: "Register",
         components: {
          // VFacebookLogin
          //   VFacebookLoginScope
            facebookLogin
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
                objStatus: false
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
        margin-left: -240px;
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

</style>
