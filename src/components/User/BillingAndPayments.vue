<template>
<div>

    <div class="pl-5 m-top m-bottom">
        <div class="row">
            <div class="col-md-8">
                <h1 class="profile-heading">Billing and Payments</h1>
            </div>
            <div class="col-md-4">
                <button class="btn btn-submit" v-b-modal.modal-1><i class="fas fa-plus mr-3"></i>Add Card</button>
                <!--                <button type="submit" class="btn btn-submit"><i class="fas fa-plus mr-3"></i>Add Card</button>-->
            </div>
        </div>
        <div class="col-md-10">
            <div class="address-block row">
                <div class="col-md-8">
                    <div class="card-image">
                        <img src="../../../public/images/visa.png">
                    </div>
                    <p class="address-par text-muted">MasterCard Ending in 9019</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#" v-b-modal.modal-1><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
            <div class="address-block row">
                <div class="col-md-8">
                    <div class="card-image">
                        <img src="../../../public/images/mastercard.png">
                    </div>
                    <p class="address-par text-muted">MasterCard Ending in 9019</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#" v-b-modal.modal-1><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
            <div class="address-block row">
                <div class="col-md-8">
                    <div class="card-image">
                        <img src="../../../public/images/visa.png">
                    </div>
                    <p class="address-par text-muted">MasterCard Ending in 9019</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#" v-b-modal.modal-1><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
        </div>
<!-- Modal -->
    </div>
    <b-modal hide-footer size="lg" class="my-modal" id="modal-1" title="Add New Card">
        <div class="container">
        <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label for="cNumber">Card Number</label>
                <input type="text" class="form-control" id="cNumber">
            </div>
        </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="fName">First Name</label>
                    <input type="text" class="form-control" id="fName">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="lName">Last Name</label>
                    <input type="text" class="form-control" id="lName">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label for="expDate">Expires On</label>
                    <input type="text" class="form-control" placeholder="MM" id="expDate">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="year">&nbsp;</label>
                    <input type="text" class="form-control" placeholder="YY" id="year">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="security">Security Code</label>
                    <input type="text" class="form-control" id="security">
                </div>
            </div>
        </div>
        <div class="btn-modal">
            <button @click="$bvModal.hide('modal-1')" class="btn btn-submit">Save</button>
        </div>
        </div>
    </b-modal>
</div>
</template>

<script>
    import Index from "../LoginAndRegister/LoginAndRegister";
    export default {
        name: "BillingAndPayments",
        components: {Index}
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
        margin-top: 100px;
    }
    .m-bottom{
        margin-bottom: 100px;
    }
    /*.col-md-4{*/
    /*    padding: 0;*/
    /*}*/
    .profile-heading{
        color: #5860ff;
        font-size: 38px;
        margin-bottom: 50px;
    }
    .address-block{
        border-bottom: 1px solid #9C9C9C;
        /*margin-bottom: 30px;*/
    }
    .address-block p{
        font-size: 18px;
        padding-left: 5px;
        display: inline-block;
    }
    .button .btn-submit{
        margin-right: 50px;
        background-color: #5860ff;
        color: white;

    }
    .btn-submit:hover{
        background-color: #4F55C2;
        color: white;
    }
    .button{
        margin-top: 50px;
        margin-bottom: 100px;
    }
    .button button{
        border-radius: 30px;
        width: 150px;
    }
    .btn-submit{
        background-color: #5860ff;
        color: white;
        border-radius: 30px;
        /*width: 150px;*/
        padding-right: 25px;
        padding-left: 25px;
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
    }
    .edit:hover{
        color: #4F55C2;
    }
    .radio{
        display: flex;
        margin-top: 10px;
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
</style>
