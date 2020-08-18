<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card text-light">
                <div class="card-body mx-auto px-5">
                    <h3 class="card-title">Forgot Password</h3>
                    <p class="card-text">We will send a OTP code to this number. So make sure correct number would be given.</p>
                    <label for="forgotPassword">Phone Number</label>
                    <label class="errorMessage" id="numberError"></label>
                    <div class="input-group">
                        <!-- <div class="input-group-prepend">
                            <span class="input-group-text" id="plusSign">+</span>
                        </div> -->
                        <input type="text" class="form-control" v-model="numberObj.Mobile" v-on:input="checkMobileNumber" id="number" placeholder="+352 74638333" aria-label="Phone Number" aria-describedby="plusSign"><br>
                        
                    </div>
                    <div class="w-50 mx-auto">
                        <button type="button" :disabled="isDisabled" @click="getOtp" class="btn">Send</button>
                    </div>
                </div>
            </div>


            <!--<div class="card">
                <div class="card-header">
                    <h5 class="card-title">Forgot Password</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">We will send a OTP code to this number. So make sure correct number would be given.</p>
                    <label for="forgotPassword">Phone Number</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="plusSign">+</span>
                        </div>
                        <input type="text" class="form-control" id="forgotPassword" placeholder="352 74638333" aria-label="Phone Number" aria-describedby="plusSign">
                    </div>
                    <div class="w-50 mx-auto">
                        <button type="button" class="btn">Send</button>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
import {lang} from "../lang/lang";
import {EventBus} from "../../main";
import {getOtp} from "../api/GetOtp";
export default {
    name: "SearchPhone",
    data() {
        return {
            isDisabled: true,
            local: lang.en,
            numberObj: {
                "Mobile": ''
            }
        }
    },
    created() {
             this.checkLang();
        EventBus.$on("changeLang", () => {
            this.checkLang();
            })
    },
    methods: {
        getOtp() {
            getOtp(this.numberObj).then(response => {
                // debugger;
                if(response.HasError) {
                    this.showNotification('error', 'Error', 'Error occurred please try later!')
                } else {
                    localStorage.setItem('mobileNumber', this.numberObj.Mobile);
                    localStorage.setItem('isRegOtp', 'true');
                    this.$router.push({path: '/resetPassword'});
                }
            },error => {
                this.showNotification('error', 'Error', 'Error occurred please try later!')
            })
        },
        checkMobileNumber() {
                var res = false;
                if(this.numberObj.Mobile === "") {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.local.numberEmptyError;
                    document.getElementById('number').style.borderColor = "red";
                    this.isDisabled = true;
                }/*else if(!this.userData.mobile.match(/^[0-9]+$/)) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.newLang.numberWrongInpur;
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                }*/ else if(this.numberObj.Mobile[0] !== '+') {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.local.numberFormatError;
                    document.getElementById('number').style.borderColor = "red";
                    this.isDisabled = true;
                } else if(this.numberObj.Mobile.length < 11) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = this.local.numberLengthError;
                    document.getElementById('number').style.borderColor = "red";
                    this.isDisabled = true;
                } else {
                    document.getElementById('numberError').style.visibility = "hidden";
                    document.getElementById('numberError').innerHTML = "";
                    document.getElementById('number').style.borderColor = "grey";
                    this.isDisabled = false;
                    res = true;
                }
                return res;
            },
        checkLang() {
            console.log("hereItIs");
                var temp = localStorage.getItem("lang");
                if(temp == null || temp === "EN") {
                localStorage.setItem("lang", "EN");
                this.local = lang.en;
                } else if(temp === "FN" ) {
                this.local = lang.fn;
                localStorage.setItem("lang", "FN");
                } else {
                this.local = lang.sp;
                localStorage.setItem("lang", "ES");
                }
            },
            showNotification(type, title, message) {
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
    }
}
</script>
<style scoped>
    .card{
        margin-top: 100px;
        margin-bottom: 100px;
        background: #606c88;
        background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
        background: linear-gradient(to right, #3f4c6b, #606c88);
    }
    /*.card-header{
        background: #606c88;
        background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
        background: linear-gradient(to right, #3f4c6b, #606c88);
        color: white;
    }*/
    .card-text, .card-body label {
        font-size: 18px;
        color: #fff;
    }
    .card-body .btn {
        background-color: #5f7e32;
        color: white;
        border-radius: 30px;
        width: 100%;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        line-height: 26px;
    }

    .input-group-text {
        background: #fff;
        border: none;
        color: #000000;
        padding-right: 2px;
        font-size: 20px;
        font-weight: 500;
    }

    .form-control {
        border: none;
        padding-left: 0;
        font-size: 20px;
        background: #fff;
        color: #000000;
    }
</style>