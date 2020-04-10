@@ -0,0 +1,15 @@
<template>
    <div>
    <div class="pad m-top p-bottom col-md-8">
        <div class="row">
            <div class="col-md-10">
                <h1 class="profile-heading d-inline-block">Saved Address</h1>
                <button class="btn btn-submit float-right" @click="showModal"><i class="fas fa-plus mr-3"></i>Add Address</button>
                    <!--                    <button type="submit" class="btn btn-submit"><i class="fas fa-plus mr-3"></i>Add Address</button>-->
            </div>
        </div>
        <div class="col-md-10">
            <div class="address-block row" v-for="address in allAddresses" :key="address.Id">
                <div class="col-md-9">
                <h6 class="address-heading">{{address.Apartment}}</h6>
                <p class="address-par text-muted">{{address.AddressLine}}</p>
                </div>
                <div class="col-md-2 icon">
                    <button @click="deleteAddress(address.Id)" :disabled="address.IsDefault"><i class="fas fa-times-circle cancel"></i></button>
                    <div class="radio">
                        <input type="radio" id="rad" :checked="address.IsDefault" @click="setDefaultAddress(address.Id)">
                        <label>Default</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <b-modal size="lg" hide-footer class="my-modal" id="modal-1" title="Add new Address">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Address</label>
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
                            :loading="isLoading"
                            :disabled="isLoading"
                            :styled="true"
                            @click.native="saveAddress">Save
                    </buttonSpinner>
                </div>
            </div>
        </b-modal>
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
                    this.showNotification('error','Error','Please enter nearby address!');
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
                            this.showNotification('error','Error','Saving Address failed');
                            this.isLoading = false;
                        } else {
                            this.$store.dispatch('setAddressID', response.Id);
                            setDefaultAddress(Number(localStorage.getItem('id')), this.$store.state.addressId).then(response => {
                                if(response.HasError) {
                                    this.showNotification('error','Error', 'Address is not setted as default');
                                    this.isLoading = false;
                                } else {
                                    getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                                        if(response.HasError) {
                                            this.showNotification('error','Error','Address fetch failed!');
                                            this.isLoading = false;
                                        } else {
                                            if(response.length <= 0) {
                                                this.isLoading = false;
                                                this.showNotification('error','Error','No address is available to show please add address');
                                            } else {
                                                this.isLoading = false;
                                                this.allAddresses = response;
                                                console.log('allAddresses',this.allAddresses);
                                                this.showNotification('success', 'Success', 'Address saved and setted as default!');
                                                this.hideModal();
                                            }
                                        }
                                    }, error => {
                                        console.log(error);
                                        this.isLoading = false;
                                        this.showNotification('error','Error','Error occurred while fetching address please try later');
                                    })
                                }
                            }, error => {
                                console.log(error);
                                this.isLoading = false;
                                this.showNotification('error','Error','Address not has been default');
                            })
                        }
                    }, error => {
                        console.log(error);
                        this.isLoading = false;
                        this.showNotification('error','Error','Saving address failed')
                    })
                }
            },
            setDefaultAddress(id) {
              setDefaultAddress(Number(localStorage.getItem('id')), id).then(response => {
                  if(response.HasErrors) {
                      this.showNotification('error','Error', 'Card is not set as default!');
                  } else {
                      getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                          if(response.HasErrors) {
                              this.showNotification('error','Error', 'Address fetching failed!');
                          } else {
                              if(response.length <= 0) {
                                  this.isLoading = false;
                                  this.showNotification('error','Error','No address is available to show please add address');
                              } else {
                                  this.allAddresses = response;
                                  this.showNotification('success','Success','Address is now default!');
                              }
                          }
                      }, error => {
                          console.log(error);
                          this.showNotification('error','Error','Address is default but fetching address failed try later!')
                      })
                  }
              }, error => {
                  console.log(error);
                  this.showNotification('error','Error', 'Card is not setted as default!');
              })
            },
            showAllAddresses() {
                console.log('here');
              getAllCustomerAddresses(Number(localStorage.getItem('id'))).then(response => {
                  if(response.HasErrors ) {
                      this.showNotification('error','Error', 'Address fetching failed!');
                  } else {
                      if(response.length <= 0) {
                          this.isLoading = false;
                          this.showNotification('error','Error','No address is available to show please add address');
                      } else {
                          this.showNotification('success','Success', 'All addresses are shown!');
                          this.allAddresses = response;
                      }
                  }
              }, error => {
                  console.log(error);
                  this.showNotification('')
              })
            },
            deleteAddress(id) {
                this.$dialog.confirm('Address will be deleted permanently. Continue?',{
                    loader: true
                }).then(dialog => {
                    dialog.loading(true);
                    deleteAddress(id).then(response => {
                        if(response.HasErrors) {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('error','Error','Error occurred deletion of address is failed!');
                        } else {
                            dialog.loading(false);
                            dialog.close();
                            this.showNotification('success', 'Success', 'Address is successfully deleted!');
                            this.showAllAddresses();
                        }
                    }, error => {
                        console.log(error);
                        this.showNotification('error','Error','Error occurred please try later!')
                    })
                }).catch(() => {
                    this.showNotification('info', 'Info', 'Address deletion cancelled');
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
   /* @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }
    .row{
        font-family:pantonb ;
    }*/
    .m-top{
        margin-top: 30px;
    }
    .pad{
        padding-left:40px;
        padding-right: 40px;
    }
    .p-bottom{
        padding-bottom: 100px;
    }
    /*.col-md-4{*/
    /*    padding: 0;*/
    /*}*/
    .profile-heading{
        color: #5860ff;
        font-size: 34px;
        font-weight: 500;
        margin-bottom: 50px;
    }
    .address-block{
        border-bottom: 1px solid #9C9C9C;
        margin-bottom: 10px;
    }
    .address-block h6{
        font-size: 19px;
        /*margin-top: 20px;*/
    }
    .address-block p{
        font-size: 16px;
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
        background-color: #007bff;
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
        background-color: #007bff;
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
        /*padding-right: 0;*/
        /*margin-top: 20px;*/
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
        .m-top{
            margin-top: 50px;
        }
    }
</style>
