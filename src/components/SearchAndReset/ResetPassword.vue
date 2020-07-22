<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card text-light">
                <div class="card-body px-5 py-5">
                    <h3 class="card-title">Reset Password</h3>
                    <p class="card-text">Enter the OTP sent to you Number (+354 34343433).</p>
                    <section class="mt-5 p-4">
                        <p class="">Enter OTP</p>
                        <form>
                            <input id="codeBox1" type="number" maxlength="1" @keyup="onKeyUpEvent(1, $event)" @focus="onFocusEvent(1)">
                            <input id="codeBox2" type="number" maxlength="1" @keyup="onKeyUpEvent(2, $event)" @focus="onFocusEvent(2)">
                            <input id="codeBox3" type="number" maxlength="1" @keyup="onKeyUpEvent(3, $event)" @focus="onFocusEvent(3)">
                            <input id="codeBox4" type="number" maxlength="1" @keyup="onKeyUpEvent(4, $event)" @focus="onFocusEvent(4)">
                        </form>
                    </section>

                    <div class="w-100 mt-5 reset-password">
                        <form>
                            <div class="form-group">
                                <label for="newPassword">New Password</label>
                                <input type="password" class="form-control" id="newPassword" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <label for="confirmpassword">Confirm Password</label>
                                <input type="password" class="form-control" id="confirmpassword" placeholder="Password">
                            </div>
                            <div class="w-50 mx-auto">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "ResetPassword",
    methods:{
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