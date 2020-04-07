<template>
    <div class="pl-5 m-top">
        <div class="row">
            <form action="" v-on:submit.prevent class="myProfile">
                <div class="form-group">
                    <label for="email">EMAIL ADDRESS</label>
                    <input type="email"
                           class="form-control"
                           v-model="userData.email"
                           placeholder="abc@mail.com"
                           id="email" required>
                </div>
                <div class="form-group">
                    <label for="npwd">PASSWORD</label>
                    <input type="password"
                           class="form-control"
                           placeholder="Password Here...!"
                           v-model="userData.password" id="npwd" required>
                </div>
                <div class="button">
                    <button type="submit" @click="checkCredentials" class="btn btn-submit">SIGN IN</button>

                </div>
<!--                <v-facebook-login app-id="649127768995419" @login="fbLogin"></v-facebook-login>-->
<!--                <v-facebook-login-scope app-id="649127768995419" v-model="model" @sdk-init="handleSdkInit">-->
<!--                    &lt;!&ndash; Compose HTML/CSS here, otherwise nothing will be rendered &ndash;&gt;-->
<!--                    <button  @click="doLogin">-->
<!--                        &lt;!&ndash; Compose with `scope` here &ndash;&gt; Login-->
<!--                    </button>-->
<!--                </v-facebook-login-scope>-->

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
    import {checkCredentials} from "../api/Profile";
    import {mapActions} from "vuex";
    import {facebookAPILogin} from "../api/FacebookLogin";
    import {EventBus} from "../../main";
    // import VFacebookLogin from "vue-facebook-login-component";
    // import { VFBLoginScope as VFacebookLoginScope } from 'vue-facebook-login-component'
    import facebookLogin from 'facebook-login-vuejs';
    export default {
        name: "Login",
        components: {
          // VFacebookLogin
          //   VFacebookLoginScope
            facebookLogin
        },
        data() {
            return {
                userData: {
                    password: '',
                    email: '',
                    DeviceUniqueCode: "web",
                    DeviceToken: "web",
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
                url: ''
            }
        },
        mounted() {
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
                if(this.checkObject()) {
                     checkCredentials(this.userData).then(response => {
                        if(response.HasErrors === false) {
                            this.showNotification('success', 'Success', 'Sign in successfully');
                            console.log('id',response.Id);
                            localStorage.setItem('userProfile',response.UrlImage);
                            this.$store.dispatch('storeToken',response);
                            // console.log('cart',JSON.parse(localStorage.getItem('cart').replace (/(^')|('$)/g, '')));
                            // console.log('cart',JSON.parse(JSON.stringify(localStorage.getItem('cart'))));

                            console.log('cart',JSON.parse(localStorage.getItem('cart')));
                            this.$router.push({path:'/'});
                            this.$router.go();
                            // this.storeToken('storeToken',response.AuthToken, response)

                        } else {
                            console.log('Error: '+ response.ResultMessages[0].Message);
                            this.showNotification('error', 'Error', 'Sign in failed');
                        }
                    }, error => {
                         console.log(error);
                         this.showNotification('error','Error','Error occurred please try later!');
                     })
                } else {
                    this.showNotification('warn', 'Warning', 'Please fill all the fields!');
                }
            },
            checkObject() {
                if(this.userData.password != '' && this.userData.email != '') {
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
                EventBus.$emit('StartOverlay', true);
                this.FB.api('/me', 'GET', { fields: 'id,name,email,picture.type(large)' },
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
        margin-bottom: 10px;
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
