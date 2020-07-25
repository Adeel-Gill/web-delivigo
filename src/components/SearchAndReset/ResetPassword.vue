<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card text-light">
                <div class="card-body px-5 py-5">
                    <h3 class="card-title">Reset Password</h3>
                    <div v-if="isMatched">
                    <p class="card-text">Enter the OTP sent to you Number ({{otpObj.Number}}).</p>
                    <section class="mt-5 p-4" >
                        <p class="">Enter OTP</p>
                        <div class="input-wrapper" >
                            <PincodeInput
                                v-model="code"
                                placeholder="0"
                            />
                        </div>
                    </section>
                    </div>
                    
                    <div class="w-100 mt-5 reset-password">
                        <!-- <form> -->
                            <div class="form-group">
                                <label for="newPassword">New Password</label>
                                <label class="errorMessage" id="newPasswordError"></label>
                                <input type="password" class="form-control" v-model="changePasswordObj.NewPassword" v-on:input="checkNewPassword" :disabled="isMatched" id="newPassword" placeholder="New Password">
                            </div>

                            <div class="form-group">
                                <label for="confirmpassword">Repeat Password</label>
                                <label class="errorMessage" id="confirmPasswordError"></label>
                                <input type="password" class="form-control" v-model="changePasswordObj.ConfirmPassword" v-on:input="checkConfirmPassword" :disabled="isMatched" id="confirmPassword" placeholder="Repeat Password">
                            </div>
                            <div class="w-50 mx-auto">
                                <button  :disabled="isDisabled" @click="resetPassword" class="btn btn-primary">Submit</button>
                            </div>
                        <!-- </form> -->
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import PincodeInput from "vue-pincode-input";
import {confirmOtp} from "../api/ConfirmOtp";
import {forgetPassword} from "../api/ForgetPassword";
import {lang} from "../lang/lang";
import {EventBus} from "../../main";
export default {
    name: "ResetPassword",
    components: {
        PincodeInput
    },
    watch: {
        code() {
            this.otpObj.Otp = this.code;
            if(this.otpObj.Otp.length === 4) {
                confirmOtp(this.otpObj).then(response => {
                    if(response.HasErrors) {
                        this.showNotification('error', 'Error', 'OTP not correct please try again!');
                    } else {
                        // localStorage.setItem('mobileNumber', null);
                        // localStorage.setItem('isRegOtp', null);
                        this.isMatched = false;
                        this.showNotification('success', 'Success', 'Otp verified successfully!');
                    }
                })
                console.log(this.otpObj.Otp);
            }
            
        }
    },
    data() {
        return {
            otpObj: {
                'Number': '',
                'Otp': ''
            },
            changePasswordObj: {
                OldPassword: "",
                NewPassword: "",
                ConfirmPassword: "",
                Id: 0
            },
            resetPasswordObj: {
                "Number": '',
                "Password": ''
            },
            code: '',
            local: lang.en,
            isMatched: true,
            newPasswordCheck: false,
            confirmPasswordCheck: false,
            isDisabled: true
        }
    },
    mounted() {
        this.otpObj.Number=localStorage.getItem('mobileNumber');
        this.checkLang();
        EventBus.$on("changeLang", () => {
            this.checkLang();
            })
    },
    methods:{
        resetPassword() {
            // debugger;
            this.resetPasswordObj.Number = this.otpObj.Number;
            this.resetPasswordObj.Password = this.changePasswordObj.NewPassword;
            forgetPassword(this.resetPasswordObj).then(response => {
                // debugger;
                if(response.HasErrors) {
                    this.showNotification('error', 'Error', 'Error occurred please try later!')
                } else {
                    localStorage.setItem('mobileNumber', null);
                    localStorage.setItem('isRegOtp', null);
                    this.showNotification('success','Success','Password reset successfully login now!');
                    this.$router.push({path: '/signin'});
                }
            })
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
                console.log('after Fail',message);
                this.$notify({
                    group: 'foo',
                    type: type,
                    title: title,
                    text: message,
                    duration: 2000
                })
            },
        onKeyUpEvent( index, event) {
            const eventCode = event.which || event.keyCode;
            if (this.getCodeBoxElement(index).value.length === 1) {
                if (index !== 4) {
                    this.getCodeBoxElement(index+ 1).focus();
                } else {
                    this.getCodeBoxElement(index).blur();
                    // Submit code
                    console.log('submit code ');
                }
            }
            if (eventCode === 8 && index !== 1) {
                this.getCodeBoxElement(index - 1).focus();
            }
        },
        onFocusEvent(index) {
            for (let item = 1; item < index; item++) {
                const currentElement = this.getCodeBoxElement(item);
                if (!currentElement.value) {
                    currentElement.focus();
                    break;
                }
            }
        },
        getCodeBoxElement(index) {
            return document.getElementById('codeBox' + index);
        },
        checkNewPassword() {
                 var res = false;
                if(this.changePasswordObj.NewPassword === "") {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = this.local.passwordEmptyError;
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(!this.changePasswordObj.NewPassword.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = this.local.passwordWrongInput;
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword.length < 6) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = this.local.passwordLengthError;
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword !== this.changePasswordObj.ConfirmPassword) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML =this.local.passwordEqualError;
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else {
                    document.getElementById('newPasswordError').style.visibility = "hidden";
                    document.getElementById('newPasswordError').innerHTML = "";
                    document.getElementById('newPassword').style.borderColor = "grey";
                    this.newPasswordCheck = true;
                    document.getElementById('confirmPasswordError').style.visibility = "hidden";
                    document.getElementById('confirmPasswordError').innerHTML = "";
                    document.getElementById('confirmPassword').style.borderColor = "grey";
                    this.confirmPasswordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkConfirmPassword() {
                 var res = false;
                if(this.changePasswordObj.ConfirmPassword === "") {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = this.local.passwordEmptyError;
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(!this.changePasswordObj.ConfirmPassword.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = this.local.passwordWrongInput;
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(this.changePasswordObj.ConfirmPassword.length < 6) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = this.local.passwordLengthError;
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword !== this.changePasswordObj.ConfirmPassword) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = this.local.passwordEqualError;
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                }  else {
                    document.getElementById('newPasswordError').style.visibility = "hidden";
                    document.getElementById('newPasswordError').innerHTML = "";
                    document.getElementById('newPassword').style.borderColor = "grey";
                    this.newPasswordCheck = true;
                    document.getElementById('confirmPasswordError').style.visibility = "hidden";
                    document.getElementById('confirmPasswordError').innerHTML = "";
                    document.getElementById('confirmPassword').style.borderColor = "grey";
                    this.confirmPasswordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkAll() {
               if(this.newPasswordCheck && this.confirmPasswordCheck) {
                   this.isDisabled = false;
               } else {
                   this.isDisabled = true;
               }
            }
    }
}
</script>
<style scoped>
div.vue-pincode-input-wrapper {
        justify-content: space-between;
        align-items: center;
        width: auto;
        margin: 0 auto;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
    }
    input.vue-pincode-input {
        width: 50px;
        height: 50px;
        padding: 0;
        margin-right: 25px;
        text-align: center;
        border: 1px solid gray;
        border-radius: 5px;
}
    .card{
        margin-top: 100px;
        margin-bottom: 100px;
        background: #606c88;
        background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
        background: linear-gradient(to right, #3f4c6b, #606c88);
    }

    .reset-password button {
        /*background-color: #5f7e32;*/
        color: white;
        border-radius: 30px;
        width: 100%;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        line-height: 26px;
    }





    section {
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.1);
    }

    section form {
        align-items: center;
        width: auto;
        margin: 0 auto;
        text-align: center;
    }
    section form input {
        width: 50px;
        height: 50px;
        padding: 0;
        margin-right: 25px;
        text-align: center;
        border: 1px solid gray;
        border-radius: 5px;
    }
    section form input:last-child {
        margin-right: 0;
    }
    section form input::-webkit-inner-spin-button, section form input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    section form input:focus, section form input.focus {
        border-color: white;
        outline: none;
        box-shadow: none;
    }

</style>