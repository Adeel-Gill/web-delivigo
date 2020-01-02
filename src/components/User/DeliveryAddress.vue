@@ -0,0 +1,15 @@
<template>
    <div>
    <div class="pl-5 m-top m-bottom">
        <div class="row">
            <div class="col-md-8">
            <h1 class="profile-heading">Saved Address</h1>
            </div>
                <div class="col-md-4">
                    <b-button class="btn btn-submit" v-b-modal.modal-1><i class="fas fa-plus mr-3"></i>Add Card</b-button>

                    <!--                    <button type="submit" class="btn btn-submit"><i class="fas fa-plus mr-3"></i>Add Address</button>-->
                </div>
        </div>
        <div class="col-md-10">
            <div class="address-block row">
                <div class="col-md-9">
                <h6 class="address-heading">Home</h6>
                <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
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
                <div class="col-md-9">
                    <h6 class="address-heading">Office1</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
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
                <div class="col-md-9">
                    <h6 class="address-heading">Home2</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
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
                <div class="col-md-9">
                    <h6 class="address-heading">Office</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
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
    </div>
        <b-modal size="lg" hide-footer class="my-modal" id="modal-1" title="Add new Address">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="zipCode">Zip Code</label>
                        <input type="text" class="form-control" id="zipCode">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state">
                    </div>
                </div>
            </div>
            <div class="btn-modal">
                <b-button @click="$bvModal.hide('modal-1')" class="btn btn-submit">Continue</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "DeliveryAddress"
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
        margin-bottom: 10px;
    }
    .address-block h6{
        font-size: 21px;
        /*margin-top: 20px;*/
    }
    .address-block p{
        font-size: 18px;
        padding-left: 5px;
        display: inline-block;
        margin-bottom: 0;
    }
    /*.input-group-append{*/
    /*    !*color: #1c0095;*!*/
    /*    margin-right: 30px;*/
    /*}*/
    .button .btn-submit{
        margin-right: 50px;
        background-color: #5860ff;
        color: white;

    }
    .button .btn-cancel{
        border: 2px solid #5860ff;
        color: #5860ff;
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
    .icon{
        display: inline-block;
        position: absolute;
        right: 0;
        text-align: right;
        /*margin-top: 20px;*/
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
