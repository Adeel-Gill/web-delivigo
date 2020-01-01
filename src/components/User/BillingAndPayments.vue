<template>
    <div>

        <div class="pl-5 m-top m-bottom">
            <div class="row">
                <div class="col-md-8">
                    <h1 class="profile-heading">Billing and Payments</h1>
                </div>
                <div class="col-md-4">
                    <b-button class="btn btn-submit" v-b-modal.modal-1><i class="fas fa-plus mr-3"></i>Add Card</b-button>
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
        <b-modal hide-footer class="my-modal" id="modal-1" title="Create Card">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="cNumber">Card Number</label>
                        <input type="text" v-model="cardData.cardNumber" class="form-control" id="cNumber">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="fName">First Name</label>
                        <input type="text" v-model="firstName" class="form-control" id="fName">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="lName">Last Name</label>
                        <input type="text" v-model="lastName" class="form-control" id="lName">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="expDate">Expires On</label>
                        <input type="text" class="form-control" v-model="cardData.expMonth" placeholder="MM" id="expDate">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="year">&nbsp;</label>
                        <input type="text" class="form-control" v-model="cardData.expYear" placeholder="YY" id="year">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="security">CVC</label>
                        <input type="text" class="form-control" v-model="cardData.cvc" id="security">
                    </div>
                </div>
            </div>
            <div class="btn-modal">
                <button @click="createCard" class="btn btn-submit">Continue</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {createCardToken} from "../api/CardAndPayments";

    export default {
        name: "BillingAndPayments",
        data() {
            return {
                firstName: '',
                lastName: '',
                cardData: {
                    holderName: '',
                    cardNumber: '',
                    expMonth: '',
                    expYear: '',
                    cvc: ''
                },
                response: {},
            }
        },
        methods: {
            createCard() {
                this.cardData.holderName = this.firstName + this.lastName;
                this.response = createCardToken(this.cardData);
                console.log('responseOfCardNow',this.response);
                // if(!(this.response.isEmpty())) {
                //     console.log('responseOfCardAfter',this.response);
                // }
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
