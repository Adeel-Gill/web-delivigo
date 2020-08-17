<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card text-light">
                <div class="card-body px-5 py-5">
                    <h3 class="card-title">Confirm Registration</h3>
                    <p class="card-text">Enter the OTP sent to your Number ({{mobile}}) to continue registration.</p>
                    <section class="mt-5 p-4">
                        <p class="">Enter OTP</p>
                        <div class="input-wrapper">
                            <PincodeInput
                                v-model="code"
                                placeholder="0"
                                @keyup="checkCode"
                            />
                        </div>
                        <!-- <form>
                            <input id="codeBox1" type="number" maxlength="1" @keyup="onKeyUpEvent(1, $event)" @focus="onFocusEvent(1)">
                            <input id="codeBox2" type="number" maxlength="1" @keyup="onKeyUpEvent(2, $event)" @focus="onFocusEvent(2)">
                            <input id="codeBox3" type="number" maxlength="1" @keyup="onKeyUpEvent(3, $event)" @focus="onFocusEvent(3)">
                            <input id="codeBox4" type="number" maxlength="1" @keyup="onKeyUpEvent(4, $event)" @focus="onFocusEvent(4)">
                        </form> -->
                        <p @click="resendOtp()">Resend OTP? </p>
                    </section>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { EventBus } from '../../main';
import PincodeInput from "vue-pincode-input";
import {confirmOtp, resendOtp} from "../api/ConfirmOtp";
export default {
    name: "OtpConfirm",
    components: {
        PincodeInput
    },
    data() {
        return {
            mobile: '',
            otp: '',
            code: '',
            otpObj: {
                'Mobile': '',
                'Otp': ''
            }
        }
    },
    watch: {
        code() {
            if(this.code.length === 4) {
                this.otpObj.Mobile = this.mobile;
                this.otpObj.Otp = this.code;
                confirmOtp(this.otpObj).then(response => {
                    if(response.HasError) {
                        this.showNotification('error', 'Error', 'OTP not correct please try again!');
                    } else {
                        localStorage.setItem('mobileNumber', null);
                        localStorage.setItem('isRegOtp', null);
                        this.showNotification('success', 'Success', 'Registration completed successfully!');
                        this.$router.push({path:'/signin'})
                    }
                })
                console.log(this.code);
            }
            
        }
    },
    mounted() {
        this.mobile=localStorage.getItem('mobileNumber') 
    },
    methods:{
        resendOtp(){
            this.otpObj.Mobile = this.mobile;
            resendOtp(this.otpObj).then(response => {
                if(response.HasError) {
                    this.showNotification('error','Error','Otp resend failed');
                } else {
                    this.showNotification('success','Success','New otp send to you number '+this.mobile);
                }
            },error=> {
                this.showNotification('error','Error','Otp resend failed');
            })
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
        checkCode() {
            console.log(this.code);
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
        }

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