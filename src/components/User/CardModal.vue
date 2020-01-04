<template>
        <div>

        </div>
</template>

<script>
    let stripe = Stripe(`pk_test_TYPazNES7wQJ4WyN83oLTlEa`),
        elements = stripe.elements(),
        card = undefined;
    export default {
        name: "CardModal",
        mounted(){
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
        margin-top: 100px;
    }
    .m-bottom{
        margin-bottom: 100px;
    }
    .col-md-4{
        padding: 0;
    }
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
        margin: 0 20px 0 0;
        font-size: 20px;
    }
    .icon .cancel{
        color: red;
    }
    .edit{
        color: #5860ff;
    }
    .radio{
        display: flex;
        margin-top: 10px;
    }
    .radio input{
        margin-top: 1px;
        height:20px;
        width: 20px;
        margin-right: 10px;
    }
    .radio label{
        font-size: 17px;
    }
    .modal-dialog {
        width: 700px !important;
    }
    .btn-modal{
    }
</style>
