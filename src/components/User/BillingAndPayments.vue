<template>
    <div>
<!--        <div ref="card">-->
<!--         </div>-->
<!--        <button class="btn btn-submit" @click="showToken"> save card-->
<!--        </button>-->
        <div class="pl-5 m-top m-bottom">
            <div class="row">
                <div class="col-md-8">
                    <h1 class="profile-heading">Billing and Payments</h1>
                </div>
                <div class="col-md-4">
                    <b-button class="btn btn-submit" @click="createCard" v-b-modal.modal-1><i class="fas fa-plus mr-3"></i>Add Card</b-button>
                    <!--                <button type="submit" class="btn btn-submit"><i class="fas fa-plus mr-3"></i>Add Card</button>-->
                </div>
            </div>
            <div class="col-md-10" v-if="isAvailable">
                <div v-if="allCards.length > 0">
                    <div class="address-block row" v-for="card in allCards" :key="card.Id">
                        <div class="col-md-8" >
                            <div class="card-image">
                                <img :src="getImgUrl(card.Brand.toLowerCase())">
                            </div>
                            <p class="address-par text-muted">{{card.Brand}} .... .... {{card.CardNumber}}</p>
                            <p class="address-par text-muted">Expires in {{card.Month}}/{{card.Year}}</p>
                        </div>
                        <div class="col-md-2 icon">
                            <button @click="deleteCard(card.Id)" :disabled ="card.IsDefault"><i class="fas fa-times-circle cancel"></i></button>
                            <div class="radio">
                                <input type="radio" :checked = card.IsDefault @click="markDefaultCard(card)" >
                                <label>Default</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="address-block row">
                    <div class="col-md-8">

                    </div>
                </div>
            </div>
            <!-- Modal -->
        </div>
        <div>
            <b-modal hide-footer refs="modal" class="my-modal"  @exit="close" id="modal-1" title="Create Card">
                <div ref="card" :disabled = "isLoading"></div>
                <hr>
                <buttonSpinner
                        :loading="isLoading"
                        :disabled="isLoading"
                        :styled="true"
                        @click.native="showToken">Save Card
                </buttonSpinner>
<!--                <button class="btn btn-submit" > Save-->
<!--                </button>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-12">-->
<!--                        <div class="form-group">-->
<!--                            <label for="cNumber">Card Number</label>-->
<!--                            <input type="text" v-model="cardData.cardNumber" class="form-control" id="cNumber">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-6">-->
<!--                        <div class="form-group">-->
<!--                            <label for="fName">First Name</label>-->
<!--                            <input type="text" v-model="firstName" class="form-control" id="fName">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-md-6">-->
<!--                        <div class="form-group">-->
<!--                            <label for="lName">Last Name</label>-->
<!--                            <input type="text" v-model="lastName" class="form-control" id="lName">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="row">-->
<!--                    <div class="col-md-3">-->
<!--                        <div class="form-group">-->
<!--                            <label for="expDate">Expires On</label>-->
<!--                            <input type="text" class="form-control" v-model="cardData.expMonth" placeholder="MM" id="expDate">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-md-3">-->
<!--                        <div class="form-group">-->
<!--                            <label for="year">&nbsp;</label>-->
<!--                            <input type="text" class="form-control" v-model="cardData.expYear" placeholder="YY" id="year">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="col-md-6">-->
<!--                        <div class="form-group">-->
<!--                            <label for="security">CVC</label>-->
<!--                            <input type="text" class="form-control" v-model="cardData.cvc" id="security">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="btn-modal">-->
<!--                    <button @click="createCard" class="btn btn-submit">Continue</button>-->
<!--                </div>-->
            </b-modal>
        </div>
</div>
</template>

<script>
    import {saveCardData} from "../api/CardAndPayments";
    import {markDefaultCard} from "../api/CardAndPayments";
    import {retrieveCustomerAllCards} from "../api/CardAndPayments";
    import {EventBus} from "../../main";
    import {deleteCustomerCard} from "../api/CardAndPayments";
    import VueLoadingButton from 'vue-loading-button';
    let stripe = Stripe(`pk_test_TYPazNES7wQJ4WyN83oLTlEa`),
        elements = stripe.elements(),
        card = undefined;
    export default {
        name: "BillingAndPayments",
        components: {
            buttonSpinner: VueLoadingButton,
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                isLoading: false,
                baseImageURL: '../../../public/images/',
                endImageType: '.png',
                status: '',
                image: '',
                close: false,
                setOnce: false,
                disableCard: true,
                checked: false,
                isAvailable: false,
                cardData: {
                    CardNumber: '',
                    Brand: '',
                    IsDefault: false,
                    CardStripeId: '',
                    CustomerId: localStorage.getItem('id'),
                    Month: '',
                    Year: '',
                },
                card: {
                    CustomerId: null,
                    SourceId: "",
                    CardId: null,
                },
                owner: {
                    name: '',
                    address: '',
                },
                cusKey: 'cus_GT1hihViyDG0M2',
                response: {},
                allCards: [],
            }
        },
        computed: {
            getValue() {
                return
            }
        },
        methods: {
            // async createCard() {
            //     this.cardData.holderName =
            //
            //
            //     this.firstName + this.lastName;
            //     // this.response = createCardToken(this.cardData);
            //     // console.log('responseOfCardNow',this.response.token);
            //     // if(!(this.response.isEmpty())) {
            //     //     console.log('responseOfCardAfter',this.response);
            //     // }
            // },
            closeModal() {
              // return true;
            },
            deleteCard(id) {
                this.$dialog.confirm('Card will be deleted permanently. Continue?', {
                    loader: true
                })
                .then(dialog => {
                    dialog.loading(true);
                    deleteCustomerCard(id).then(response => {
                        if(response.HasErrors) {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('error', 'Error', 'Card deletion failed!');
                        } else {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('success', 'Success', 'Card Successfully Deleted');
                            this.fetchCustomerCards();
                        }
                    })
                }).catch(() => {
                    this.showNotification('info', 'Info', 'Card Deletion Cancelled');
                });
            },
            fetchCustomerCards() {
                retrieveCustomerAllCards(localStorage.getItem('id')).then(response => {
                    if(response.HasErrors) {
                        this.showNotification('error','Error','card retrieval failed!');
                    } else {
                        this.showNotification('success','Success', 'All cards are fetched and shown');
                        this.allCards = response.CustomerCards;
                        this.isAvailable = true;
                    }
                })
            },
            markDefaultCard(response) {
                this.card.CustomerId = response.CustomerId;
                this.card.SourceId = response.CardStripeId;
                this.card.CardId = response.Id;
                markDefaultCard(this.card).then(response => {
                    if(response.HasErrors) {
                        this.showNotification('error', 'Error', 'Error occurred please try again later!');
                    } else {
                        this.showNotification('success','Success', 'Card is now set as default!');
                        this.fetchCustomerCards();
                    }
                })
            },
            getImgUrl(cardImage) {
                var images = require.context('../../../public/images/', false, /\.png$/)
                return images('./' + cardImage + ".png")
            },
            SaveAndShowCards() {
                saveCardData(this.cardData).then(response => {
                    if(response.HasErrors) {
                       this.showNotification('error','Error','Card is created but not saved');
                    } else {
                        if(this.checked) {
                            this.card.CustomerId = response.CustomerId;
                            this.card.SourceId = response.CardStripeId;
                            this.card.CardId = response.Id;
                            markDefaultCard(this.card).then(response => {
                                if(response.HasErrors) {
                                    this.showNotification('error', 'Error', 'Error occurred please try again later!');
                                } else {
                                    this.showNotification('success','Success', 'Card is now set as default!');
                                    this.fetchCustomerCards();
                                    this.$bvModal.hide('modal-1');
                                    this.isAvailable = true;
                                }
                            })
                        } else {
                            this.fetchCustomerCards();
                            this.$bvModal.hide('modal-1');
                        }
                    }
                })
            },
            assignResponseToCardObj(response) {
                this.cardData.CardNumber = response.source.card.last4;
                this.cardData.Brand  = response.source.card.brand;
                this.cardData.IsDefault = this.checked;
                this.cardData.CardStripeId = response.source.id;
                this.cardData.CustomerId = localStorage.getItem('id');
                this.cardData.Month = response.source.card.exp_month;
                this.cardData.Year = response.source.card.exp_year;
            },
            async showToken() {
                this.isLoading = true;
                console.log('cardOwnerData', card);
                   await stripe.createSource(card).then(response => {
                        if(response.error) {
                            this.showNotification('error','Error', 'Card creation failed!');
                        } else {
                            this.cardData.CardNumber = response.source.card.last4;
                            this.cardData.Brand  = response.source.card.brand;
                            this.cardData.IsDefault = this.checked;
                            this.cardData.CardStripeId = response.source.id;
                            this.cardData.CustomerId = localStorage.getItem('id');
                            this.cardData.Month = response.source.card.exp_month;
                            this.cardData.Year = response.source.card.exp_year;
                            console.log('afterAssign',this.cardData);
                            this.SaveAndShowCards();

                        }
                        this.isLoading = false;
                        console.log('sourceResponse',response);
                    })
                    // stripe.createPaymentMethod({
                    //     type: 'card',
                    //     card: card,
                    //     billing_details: {
                    //         name: 'Aqib Javed',
                    //     }
                    // }).then(response => {
                    //     console.log('createPaymentMethod',response);
                    //     stripe.payment_method.attach(
                    //         response.id,
                    //         {customer: 'cus_GT1hihViyDG0M2'}).then(response => {
                    //             console.log('paymentMethodAttached',response);
                    //     })
                    // })
                    // stripe.createToken(card,'cus_GT1hihViyDG0M2').then(response => {
                    //     // Access the token with result.token
                    //     //card.disable(this.disableCard);
                    //     console.log('responseCard',response);
                    //     this.isLoading = false;
                    //     this.status = true;
                    //     this.$bvModal.hide('modal-1');
                    // });
            },
            createCard() {
                setTimeout(()=> {
                    if(this.setOnce) {
                        card.mount(this.$refs.card);
                        this.showNotification('info','Info','Card is setted as once');
                    } else {
                        if(localStorage.getItem('creationCounter') === '0') {
                            this.showNotification('info','Info','Card is not created firstly');
                            card = elements.create('card');
                            card.mount(this.$refs.card);
                            localStorage.setItem('creationCounter', '1');
                        } else {
                            this.showNotification('info','Info','Card is not creation counter already started');
                            card = elements.create('card');
                            card.mount(this.$refs.card);
                        }
                        localStorage.setItem('setOnce', true);
                    }
                    this.setOnce = true;
                },200)
            },
            destroyCard() {
                // console.log('method Called');
                // card.destroy();
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
        },
        created() {
            localStorage.setItem('setOnce', false);
            console.log('chere');
        },
        mounted() {
            localStorage.setItem('setOnce', false);
           this.fetchCustomerCards();
            console.log('here');
            // card.mount(this.$refs.card);
        },
        updated() {
            console.log('2here')
        },
        destroyed() {
            localStorage.setItem('destroyed', true);
            console.log('3here')
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
