<template>
    <div class="col-12 col-sm-12 col-md-9">
        <div class="container-md mt-4 pt-3 pb-5">
            <div class="card p-2 p-md-5 ">
                <div class="row justify-content-center">
            <!--<div class="row">
                <div class="col-md-10">
                    <h1 class="profile-heading d-inline-block">Billing and Payments</h1>
                    <b-button class="btn btn-submit float-right" @click="createCard" ><i class="fas fa-plus mr-3"></i>Add Card</b-button>
                </div>
            </div>-->
            <div class="col-md-10 col-12" v-if="">
                <div class="heading line">
                    <h1 class="profile-heading d-inline">{{newLang.billingAndPayment}}</h1>
                    <button class="btn btn-submit float-right" @click="createCard" ><i class="fas fa-plus mr-3"></i>{{newLang.addCard}}</button>
                </div>
                <div v-if="allCards.length">
                    <div class="address-block row pt-4 m-0 w-100" v-for="card in allCards" :key="card.Id">
                        <div class="col-sm-10" >
                            <div class="card-image">
                                <img :src="getImgUrl(card.Brand.toLowerCase())">
                            </div>
                            <p class="address-par">{{card.Brand}} .... .... {{card.CardNumber}}</p>
                            <p class="address-par">{{newLang.expiresIn}} {{card.Month}}/{{card.Year}}</p>
                        </div>
                        <div class="col-sm-2 icon">
                            <div class="cross" v-if="!card.IsDefault">
                            <button @click="deleteCard(card.Id)" ><i class="fas fa-times-circle cancel"></i></button>
                            </div>
                                <div class="radio">
                                <input type="radio" :checked = card.IsDefault @click="markDefaultCard(card)" >
                                <label>{{newLang.default}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="address-block row pt-4 m-0 w-100">
                   <emptyError></emptyError>
                </div>
            </div>
            <!-- Modal -->
        </div>
        <div>
            <b-modal hide-footer centered refs="modal" class="my-modal"  @exit="close" id="modal-1" :title="newLang.createCard">
                <div ref="card" :disabled = "isLoading"></div>
                <hr>
                <div class="btn-modal">
                <buttonSpinner
                        class="btn btn-submit"
                        :loading="isLoading"
                        :disabled="isLoading"
                        :styled="true"
                        @click.native="showToken">{{newLang.saveCard}}
                </buttonSpinner>
                </div>
            </b-modal>
            <b-modal hide-footer centered refs="modal" class="my-modal"  @exit="close" id="modal-2" :title="newLang.updateEmail">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="email">{{newLang.email}}</label>
                                <label class="errorMessage" id="emailError"></label>
                                <input type="text" required class="form-control" v-model="Email" v-on:input="validateEmail()" id="email">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-modal">
                    <hr>
                    <buttonSpinner
                            class="btn btn-submit"
                            :loading="isLoading"
                            :disabled="disableButton"
                            :styled="true"
                            @click.native="saveEmail">{{newLang.saveEmail}}
                    </buttonSpinner>
                </div>
            </b-modal>
        </div>
</div>
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
    import {checkIfStripeExist, verifyStripe} from "../api/CheckStripe"
    import {validEmail} from "../util/validate"
    import emptyError from "../error/emptyError.vue"
    import {updateEmail} from "../api/UpdateEmail"
    let stripe = Stripe(`pk_test_TYPazNES7wQJ4WyN83oLTlEa`),
        elements = stripe.elements(),
        card = undefined;
    export default {
        name: "BillingAndPayments",
        props: ['newLang'],
        components: {
            buttonSpinner: VueLoadingButton,
            emptyError
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
                Email: '',
                setOnce: false,
                disableCard: true,
                checked: false,
                isAvailable: false,
                disableButton: true,
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
                this.$dialog.confirm(this.newLang.cardDeleteAlert, {
                    loader: true
                })
                .then(dialog => {
                    dialog.loading(true);
                    deleteCustomerCard(id).then(response => {
                        if(response.HasErrors) {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('error', this.newLang.error, this.newLang.cardDeletionFailed);
                        } else {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('success', this.newLang.success, this.newLang.cardDeletionSuccess);
                            this.fetchCustomerCards();
                        }
                    })
                }).catch(() => {
                    this.showNotification('info', this.newLang.info, this.newLang.cardDeletionCancelled);
                });
            },
            fetchCustomerCards() {
                retrieveCustomerAllCards(localStorage.getItem('id')).then(response => {
                    if(response.CustomerCards.HasErrors) {
                        this.showNotification('error',this.newLang.error,this.newLang.cardRetrievalFailed);
                    } else {
                        console.log('length',response.CustomerCards.length)
                        if(response.CustomerCards.length>0) {
                            this.showNotification('success',this.newLang.success, this.newLang.cardsFetched);
                            this.allCards = response.CustomerCards;
                            this.isAvailable = true;
                        } else {
                            this.showNotification('error',this.newLang.error, this.newLang.cardsNotAvailable);
                        }
                    }
                }, error => {
                    onsole.log(error);
                    this.showNotification('error',this.newLang.error,this.newLang.cardsFetchError);
                })
            },
            markDefaultCard(response) {
                this.card.CustomerId = response.CustomerId;
                this.card.SourceId = response.CardStripeId;
                this.card.CardId = response.Id;
                markDefaultCard(this.card).then(response => {
                    if(response.HasErrors) {
                        this.showNotification('error', this.newLang.error, this.newLang.errorOccurred);
                    } else {
                        this.showNotification('success',this.newLang.success, this.newLang.cardIsDefault);
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
                       this.showNotification('error',this.newLang.error,this.newLang.cardCreatedNotSaved);
                    } else {
                        if(this.checked) {
                            this.card.CustomerId = response.CustomerId;
                            this.card.SourceId = response.CardStripeId;
                            this.card.CardId = response.Id;
                            markDefaultCard(this.card).then(response => {
                                if(response.HasErrors) {
                                    this.showNotification('error', this.newLang.error, this.newLang.errorOccurred);
                                } else {
                                    this.showNotification('success',this.newLang.success, this.newLang.cardIsDefault);
                                    this.fetchCustomerCards();
                                    this.$bvModal.hide('modal-1');
                                    this.isAvailable = true;
                                }
                            }, error => {
                                onsole.log(error);
                                this.showNotification('error',this.newLang.error,this.newLang.cardDefaultError);
                            })
                        } else {
                            this.fetchCustomerCards();
                            this.$bvModal.hide('modal-1');
                        }
                    }
                }, error => {
                    console.log(error);
                    this.showNotification('error',this.newLang.error,this.newLang.cardCreatedNotSaved);
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
                            this.showNotification('error',this.newLang.error, this.newLang.cardCreatedNotSaved);
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
            checkStripe() {
                checkIfStripeExist(localStorage.getItem('id')).then(response => {
                    return response.IsSripeId
                }, error => {
                    return 2;
                })
            },
            saveEmail() {
                this.isLoading = true;
                updateEmail(localStorage.getItem('id'),this.Email).then(response => {
                    
                    if(response.HasErrors == true) {
                        this.isLoading = false;
                        this.showNotification("error",this.newLang.error,this.newLang.errorOccurred);
                    } else {
                        // this.isLoading = false;
                        verifyStripe(localStorage.getItem('id')).then(response => {
                            console.log("hereInVerify");
                            if(response.HasErrors == true) {
                                this.isLoading = false;
                                this.showNotification("error",this.newLang.error,this.newLang.errorOccurred);
                            } else {
                                this.isLoading = false;
                                this.showNotification("success",this.newLang.success,this.newLang.emailUpdated);
                                this.$bvModal.hide("modal-2");
                                this.createCard();
                            }
                        }, error => {
                            this.isLoading = false;
                            this.showNotification("error",this.newLang.error,this.newLang.errorOccurred);
                        })
                    }
                }, error => {
                    this.isLoading = false;
                    this.showNotification("error",this.newLang.error,this.newLang.errorOccurred);
                })
            },
            validateEmail() {
                console.log(this.Email);
                console.log('::',this.disableButton);
                if(validEmail(this.Email)) {
                    document.getElementById('emailError').style.visibility = "hidden";
                   document.getElementById('emailError').innerHTML = "";
                   document.getElementById('email').style.borderColor = "white";
                   this.disableButton = false;
                   return true;
                } else {
                   document.getElementById('emailError').style.visibility = "visible";
                   document.getElementById('emailError').innerHTML = this.newLang.emailError;
                   document.getElementById('email').style.borderColor = "red";
                   this.disableButton = true;
                   return false;
                }
            },
            createCard() {
                var res = this.checkStripe();
                if(res == 2) {
                    this.showNotification('error',this.newLang.error,this.newLang.errorOccurred);
                } else {
                    if(res == false) {
                        this.$bvModal.show('modal-2');
                    } else {
                        this.$bvModal.show('modal-1');
                        setTimeout(()=> {
                            if(this.setOnce) {
                                card.mount(this.$refs.card);
                                // this.showNotification('info','Info','Card is setted as once');
                            } else {
                                if(localStorage.getItem('creationCounter') === '0') {
                                    // this.showNotification('info','Info','Card is not created firstly');
                                    card = elements.create('card');
                                    card.mount(this.$refs.card);
                                    localStorage.setItem('creationCounter', '1');
                                } else {
                                    // this.showNotification('info','Info','Card is not creation counter already started');
                                    card = elements.create('card');
                                    card.mount(this.$refs.card);
                                }
                                localStorage.setItem('setOnce', true);
                            }
                            this.setOnce = true;
                        },200)
                    }
                }
                
            },
            destroyCard() {
                // console.log('method Called');
                // card.destroy();
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
    .container-md{
        background-color: rgb(247,248,250);
    }
    .profile-heading{
        color: #5860ff;
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 50px;
    }
    .line{
        border-bottom: 1px solid #BCBDBF;
        padding-bottom:12px;
    }
    .address-block{
        border-bottom: 1px solid #9C9C9C;
        margin-bottom: 10px;
    }
    .address-block h6{
        font-size: 18px;
        color: #000;
        font-weight: 400;
    }
    .address-block p{
        font-size: 16px;
        padding-left: 5px;
        display: inline-block;
        margin-bottom: 0;
        color: #000;
    }
    .btn-submit:hover{
        background-color: #4F55C2;
        color: white;
    }

    .btn-submit{
        background-color: #5860ff;
        color: white;
        border-radius: 30px;
    }
    .btn-modal .btn-submit{
        background-color: #5860ff!important;
        color: white !important;
        border-radius: 7px !important;
        padding: 0.5rem 1rem;
        line-height: 1.5;
        font-size: 18px;
    }
    .card-image{
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-right: 5px;
    }
    .card-image img{
        width: 100%;
        height: 100%;
    }
    .icon{
        display: inline-block;
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
        margin-right: 15px;
    }
    .edit:hover{
        color: #4F55C2;
    }
    .radio{
        display: flex;
        margin-top: 10px;
        float: right;
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
    @media screen and (max-width: 760px){
        .profile-heading{
            font-size: 27px;
        }
    }
    @media screen and (max-width: 576px) {
        .radio{
            display: inline-block;
            margin-left: 15px;
            margin-top: -6px;
        }
        .radio input{
            position: relative;
            top: 4px;
        }
        .cross{
            display: inline-block;
        }
        .heading button{
            float: none !important;
        }
    }
</style>
