<template>
    <div class="row">
        <div class="col-6 mx-auto">
            <div class="card text-light">
                <div class="card-body mx-auto px-5">
                    <h3 class="card-title">Forgot Password</h3>
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
export default {
    name: "SearchPhone"
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