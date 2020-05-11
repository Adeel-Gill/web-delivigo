@@ -0,0 +1,15 @@
<template>
        <div class="col-12 col-sm-12 col-md-9">
            <div class="container-md mt-4 pt-3 pb-5">
                <div class="card p-2 p-md-5 ">
            <div class="row justify-content-center">
        <div class="col-md-10 col-12">
            <div class="heading line">
                <h1 class="profile-heading d-inline">{{newLang.deliveryAddress}}</h1>
                <button class="btn btn-submit float-right" @click="showModal"><i class="fas fa-plus mr-3"></i>{{newLang.addAddress}}</button>
            </div>
            <div class="address-block row pt-4 m-0 w-100" v-for="address in allAddresses" :key="address.Id">

                <div class="col-sm-10">
                <h6 class="address-heading">{{address.Apartment}}</h6>
                <p class="address-par">{{address.AddressLine}}</p>
                </div>
                <div class="col-sm-2 icon">
                    <div class="cross" v-if="!address.IsDefault"><button @click="deleteAddress(address.Id)"><i class="fas fa-times-circle cancel"></i></button></div>
                    <div class="radio">
                        <input type="radio" id="rad" :checked="address.IsDefault" @click="setDefaultAddress(address.Id)">
                        <label>{{newLang.default}}</label>
                    </div>
                </div>
            </div>
        </div>

    </div>
        <b-modal size="lg" hide-footer centered class="my-modal" id="modal-1" :title="newLang.addNewAddress">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>{{newLang.address}}</label>
                            <app-map-nav @mapObj = "setMapData"></app-map-nav>
    <!--                        <div id="map" style="display: none;"></div>-->
    <!--                        <div id="geocoder" class="geocoder col-md-12" @select="showValues"></div>-->
                        </div>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="zipCode">City</label>
                            <input type="text"  disabled class="form-control" :value="city" id="zipCode">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="city">State</label>
                            <input type="text" disabled class="form-control" :value="state" id="city">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="state">Country</label>
                            <input type="text" disabled class="form-control" :value="country" id="state">
                        </div>
                    </div>
                </div> -->
                <div class="btn-modal">
                    <buttonSpinner
                            class="btn btn-submit btn-sm"
                            :loading="isLoading"
                            :disabled="isLoading"
                            :styled="true"
                            @click.native="saveAddress">{{newLang.save}}
                    </buttonSpinner>
                </div>
            </div>
        </b-modal>
    </div>
            </div>
        </div>
</template>

<script>
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css';
    import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
    import VueLoadingButton from 'vue-loading-button';
    import MapNavigation from "../Map/MapNavigation";
    import {saveAddress, setDefaultAddress, getAllCustomerAddresses, deleteAddress} from "../api/DeliveryAddress";
    import {EventBus, map} from '../../main'
    export default {
        name: "DeliveryAddress",
        props: ['newLang'],
        components: {
            buttonSpinner: VueLoadingButton,
            appMapNav: MapNavigation,
        },
        data() {
            return {
                map: null,
                geocoder: null,
                city: '',
                state: '',
                allAddresses: [],
                country: '',
                isLoading: false,
                mapData: {},
                addressObj: {
                    "AddressLine": "string",
                    "Longitude": "string",
                    "Latitude": "string",
                    "CustomerId": 0,
                    "BludingNumber": "string",
                    "Apartment": "string",
                    "Floor": "string",
                    "IsDefault": true,
                }
            }
        },
        methods: {
            showValues() {
                console.log('query',this.geocoder.inputString,'lastSelected',this.geocoder.lastSelected);
            },
            setMapData(obj) {
                this.mapData = JSON.parse(obj);
                if(this.mapData.place_type[0] === "poi") {
                    this.city = this.mapData.context[1].text;
                    this.state = this.mapData.context[2].text;
                    this.country = this.mapData.context[3].text;
                    console.log(this.mapData,this.city,this.state,this.country);
                } else {
                    this.showNotification('error',this.newLang.error,this.newLang.nearByAddress);
                    this.mapData = {};
                    this.city = this.state = this.country = '';
                }

            },
            async saveAddress() {
                if(this.mapData != null || Object.entries(this.mapData).length > 0) {
                    this.isLoading = true;
                    this.addressObj.AddressLine = this.mapData.place_name;
                    this.addressObj.Longitude = this.mapData.geometry.coordinates[0];
                    this.addressObj.Latitude = this.mapData.geometry.coordinates[1];
                    this.addressObj.CustomerId = Number(localStorage.getItem('id'));
                    this.addressObj.Apartment = this.mapData.text;
                    saveAddress(this.addressObj).then(response => {
                        if(response.HasErrors ) {
                            this.showNotification('error',this.newLang.error,this.newLang.addressSaveError);
                            this.isLoading = false;
                        } else {
                            this.$store.dispatch('setAddressID', response.Id);
                            setDefaultAddress(Number(localStorage.getItem('id')), this.$store.state.addressId).then(response => {
                                if(response.HasError) {
                                    this.showNotification('error',this.newLang.error, this.newLang.addressDefaultError);
                                    this.isLoading = false;
                                } else {
                                    getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                                        if(response.HasError) {
                                            this.showNotification('error',this.newLang.error,this.newLang.addressFetchError);
                                            this.isLoading = false;
                                        } else {
                                            if(response.length <= 0) {
                                                this.isLoading = false;
                                                this.showNotification('error',this.newLang.error,this.newLang.addressesNotAvailable);
                                            } else {
                                                this.isLoading = false;
                                                this.allAddresses = response;
                                                console.log('allAddresses',this.allAddresses);
                                                this.showNotification('success', this.newLang.success, this.newLang.addressSaved);
                                                this.hideModal();
                                            }
                                        }
                                    }, error => {
                                        console.log(error);
                                        this.isLoading = false;
                                        this.showNotification('error',this.newLang.error,this.newLang.addressFetchFailed);
                                    })
                                }
                            }, error => {
                                console.log(error);
                                this.isLoading = false;
                                this.showNotification('error',this.newLang.error,this.newLang.addressNotDefault);
                            })
                        }
                    }, error => {
                        console.log(error);
                        this.isLoading = false;
                        this.showNotification('error',this.newLang.error,this.newLang.addressSaveError)
                    })
                }
            },
            setDefaultAddress(id) {
              setDefaultAddress(Number(localStorage.getItem('id')), id).then(response => {
                  if(response.HasErrors) {
                      this.showNotification('error',this.newLang.error, this.newLang.addressFetchError);
                  } else {
                      getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                          if(response.HasErrors) {
                              this.showNotification('error',this.newLang.error, this.newLang.addressFetchError);
                          } else {
                              if(response.length <= 0) {
                                  this.isLoading = false;
                                  this.showNotification('error',this.newLang.error,this.newLang.addressesNotAvailable);
                              } else {
                                  this.allAddresses = response;
                                  this.showNotification('success',this.newLang.success,this.newLang.addressIsDefault);
                              }
                          }
                      }, error => {
                          console.log(error);
                          this.showNotification('error',this.newLang.error,this.newLang.addressIsSavedNotDefault)
                      })
                  }
              }, error => {
                  console.log(error);
                  this.showNotification('error',this.newLang.error, this.newLang.addressDefaultError);
              })
            },
            showAllAddresses() {
                console.log('here');
              getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                  if(response.HasErrors ) {
                      this.showNotification('error',this.newLang.error, this.newLang.addressFetchError);
                  } else {
                      if(response.length <= 0) {
                          this.isLoading = false;
                          this.showNotification('error',this.newLang.error,this.newLang.addressesNotAvailable);
                      } else {
                          this.showNotification('success',this.newLang.success, this.newLang.addressShown);
                          this.allAddresses = response;
                      }
                  }
              }, error => {
                  console.log(error);
                  this.showNotification('')
              })
            },
            deleteAddress(id) {
                this.$dialog.confirm(this.newLang.addressDeleteAlert,{
                    loader: true
                }).then(dialog => {
                    dialog.loading(true);
                    deleteAddress(id).then(response => {
                        if(response.HasErrors) {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('error',this.newLang.error,this.newLang.addressDeleteError);
                        } else {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('success', this.newLang.success, this.newLang.addressDeleted);
                            this.showAllAddresses();
                        }
                    }, error => {
                        console.log(error);
                        this.showNotification('error',this.newLang.error,this.newLang.errorOccurred)
                    })
                }).catch(() => {
                    this.showNotification('info', this.newLang.info, this.newLang.addressDeleteCancel);
                })
            },
            showModal() {
                this.$bvModal.show('modal-1');
                this.state = this.city = this.country = '';

            },
            hideModal() {
                this.$bvModal.hide('modal-1');
                this.state = this.city = this.country = '';
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
            }
        },
        mounted() {
            this.showAllAddresses();
            this.$root.$on('mapData', response => {
                this.mapData = response;
            })

        },
        updated() {
            this.$root.$on('mapData', response => {
                this.mapData = response;
            })
        }
    }
</script>

<style scoped>
    .container-md{
        background-color: rgb(247,248,250);
    }
    .profile-heading {
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
        font-size: 17px;
        color: #000;
        font-weight: 400;
    }
    .address-block p{
        font-size: 16px;
        padding-left: 5px;
        display: inline-block;
        margin-bottom: 0;
        color: #000;
        font-weight: lighter;
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
        border: 2px solid #007bff;
        color: #007bff;
    }
    .btn-submit:hover{
        background-color: #0056b3;
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
    }
    .btn-modal .btn-submit{
        background-color: #5860ff!important;
        color: white !important;
        border-radius: 7px !important;
        padding: 0.5rem 1rem;
        line-height: 1.5;
        font-size: 18px;
    }
    .icon{
        display: inline-block;
        text-align: right;
    }
    .icon i{
        /*margin: 0 15px 0 0;*/
        font-size: 18px;
        text-align: right;
    }
    .icon .cancel{
        color: red;
    }
    .cancel:hover{
        color: #9C0000;
    }
    .edit{
        color: #007bff;
        margin-right: 15px;
    }
    .edit:hover{
        color: #0056b3;
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
    .btn:focus{
        box-shadow: none;
        -webkit-box-shadow: none;
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
