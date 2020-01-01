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
                           v-model="userData.mobileNo"
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
                        I agree all the terms of services
                        <input type="checkbox"
                               class="form-check-input"
                               ref="termsChecked"
                               id="materialUnchecked" required></span>
                </div>
                <div class="button">
                    <button type="submit" @click="registerUser" class="btn btn-submit">SIGN UP</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {registerUser} from "../api/Profile";
    import {baseAddress} from "../../main";
    import {EventBus} from "../../main";

    export default {
        name: "Register",
        data() {
            return {
                userData: {
                    firstName: '',
                    lastName: '',
                    fullName: '',
                    mobileNo: '',
                    email: '',
                    password: '',
                    deviceToken: 'web',
                    deviceType: 'web',
                    deviceUniqueCode: 'web',
                },
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
                       EventBus.$emit('userImage',baseAddress+response.ImageUrl)
                        alert(this.message);
                    })
                } else {
                    alert('Please fill all the fields');
                }

            },
            checkObject() {
                if( this.userData.fullName != '' &&
                    this.userData.mobileNo != '' &&
                    this.userData.email !='' &&
                    this.userData.password !='' &&
                    this.$refs.termsChecked.checked != false) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }
    .row{
        font-family:pantonb ;
    }
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
