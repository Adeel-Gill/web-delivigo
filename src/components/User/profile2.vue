<template>
    <div class="col-12 col-sm-12 col-md-9">
    <div class="container-md mt-4 pt-3 pb-5">
        <div class="card p-5">
            <div class="row py-2">
            <div class="col-md-3 col-sm-12 col-12 profile-pic">
                <div class="pic-container">
                    <img :src="getImage(userData.UrlImage)" @error="getImage('')" id="showImage" class="w-100 h-100">
                    <div class="overlay"><!--@change="showImage(e)"-->
                        <input type="file"  id="image-upload" accept="image/*" @change="onFileChange" hidden>
                        <button class="btn" :disabled="!isEditable" @click="imageUpload()"><i class="fas fa-camera"></i>&nbsp;Upload picture</button>
                    </div>
                </div>
                <button v-b-modal.change-password :disabled="isFbUser" class="btn password-btn">Change Password</button>
            </div>
            <div class="col-md-9 col-sm-12 col-12">
                <div class="heading line">
                    <h1 class="profile-heading d-inline">My Profile</h1>
                    <button  class="btn edit-btn" @click="enableEditable" :style="{display: [!isEditable? 'block': 'none']}">Edit</button>
                    <button  class="btn edit-btn" @click="changeValidated" :disabled="disableSave" :style="{display: [isEditable? 'block': 'none']}">Save</button>
                    <button  class="btn edit-btn" @click="disableEditable" :style="{display: [isEditable? 'block': 'none']}">Cancel</button>
                </div>
                <div class="form-field mt-5 pr-3">
                    <form>
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" 
                                id="fullName" 
                                 v-if="!isEditable" 
                                :value="userData.FullName" 
                                :disabled = "validated">
                                 <input type="text" class="form-control" 
                                id="name"
                                 v-else  
                                v-model="user.fullName"
                                v-on:input="checkName()"
                                >
                                 <label class="errorMessage" id="nameError"></label>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" :value="userData.Email" disabled >
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 col-form-label">Phone No</label>
                            <div class="col-sm-10">
                                <input type="text" 
                                class="form-control" 
                                id="phoneNumber" 
                                v-if="!isEditable"
                                :value="userData.Mobile" 
                                :disabled = "validated">
                                <input type="text" 
                                class="form-control" 
                                id="number" 
                                v-else
                                v-on:input="checkMobileNumber()"
                                v-model="user.mobile"  
                                >
                                <label class="errorMessage" id="numberError"></label>
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label for="address" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="address" value="River Lake street no 67">
                            </div>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
        </div>
        <b-modal id="change-password" size="300px" centered title="Change Password">
            <div class="form-field">
                <form>
                     <div class="form-group row">
                        <label for="oldPassword" class="col-sm-4 col-form-label">Old Password</label>
                        
                        <div class="col-sm-8">
                            <input type="password" 
                            class="form-control" 
                            v-model="changePasswordObj.OldPassword"
                             v-on:input="checkOldPassword()"
                            id="oldPassword" placeholder="Old password...!">
                            <label class="errorMessage" id="oldPasswordError"></label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="newPassword" class="col-sm-4 col-form-label">New Password</label>
                        
                        <div class="col-sm-8">
                            <input type="password" 
                            class="form-control" 
                            v-model="changePasswordObj.NewPassword"
                             v-on:input="checkNewPassword()"
                            id="newPassword" placeholder="New password...!">
                            <label class="errorMessage" id="newPasswordError"></label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="confirmPassword" class="col-sm-4 col-form-label">Confirm Password</label>
                        <div class="col-sm-8">
                            <input type="password" 
                            class="form-control"  
                            v-model="changePasswordObj.ConfirmPassword" 
                             v-on:input="checkConfirmPassword()"
                            id="confirmPassword" placeholder="Repeat password...!">
                            <label class="errorMessage" id="confirmPasswordError"></label>
                        </div>
                    </div>
                </form>
            </div>
            <template v-slot:modal-footer="{ ok}">
                <b-button size="sm" variant="primary" @click="updatePassword()" :disabled="disableButton">
                    Change Password
                </b-button>
            </template>
        </b-modal>
    </div>
    </div>
</template>

<script>
    import {fetchUserProfile} from "../api/Profile";
    import {baseAddress, defaultUserPic} from "../../main";
    import {changePassword} from "../api/ChangePassword";
    import {mapActions} from "vuex";
    export default {
        name: "profile2",
        data() {
            return {
                validated: true,
                baseUrl: baseAddress,
                userData: {},
                image: '',
                isFbUser: false,
                disableButton: true,
                nameCheck: false,
                numberCheck: false,
                OldPasswordCheck: false,
                newPasswordCheck: false,
                confirmPasswordCheck: false,
                changePasswordObj: {
                    OldPassword: "",
                    NewPassword: "",
                    ConfirmPassword: "",
                    Id: 0
                },
                isEditable: false,
                disableSave: true,
                user: {
                    firstName: '',
                    lastName: '',
                    fullName: '',
                    mobile: '',
                    deviceToken: 'web',
                    deviceType: 'web',
                    deviceUniqueCode: 'web',
                },
            imageFile: null,
            }
        },
        methods:{
            onFileChange(e) {
                this.imageFile = e.target.files[0];
                this.userData.UrlImage = URL.createObjectURL(this.imageFile); 
            },
            enableEditable() {
                this.changeValidated();
                this.isEditable = !this.isEditable;
            },
            disableEditable() {
                this.changeValidated();
                this.hideErrors();
                this.isEditable = !this.isEditable;
            },
            ...mapActions([
                'cleanToken'
            ]),
             changeValidated() {
                this.validated = !this.validated
                
            },
            async fetchUserProfile() {
                if(localStorage.getItem('fbLogin') == "false" || localStorage.getItem('fbLogin') == null) {
                    this.isFbUser = false;
                } else {
                    this.isFbUser = true;
                }
                fetchUserProfile(localStorage.getItem('id')).then(response => {
                    console.log('profile',response);
                    this.userData = response;
                }, error => {
                    console.log(error);
                    this.showNotification('error','Error','Error occurred please try later!');
                })
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
            getImage(img) {
                // console.log('paramImage',img);
                if(img === '' || img === 'null' || img == null) {
                    return this.image = defaultUserPic;
                } else {
                    if(localStorage.getItem("fbLogin") === "true") {
                        return img;
                    } else {
                        return this.image =  baseAddress + img;
                    }
                }
            },
            imageUpload() {
                document.getElementById('image-upload').click();
            },
            checkOldPassword() {
                 var res = false;
                if(this.changePasswordObj.OldPassword === "") {
                    document.getElementById('oldPasswordError').style.visibility = "visible";
                    document.getElementById('oldPasswordError').innerHTML = "Password Cannot Be Empty...!";
                    document.getElementById('oldPassword').style.borderColor = "red";
                    this.oldPasswordCheck = false;
                } else if(!this.changePasswordObj.OldPassword.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('oldPasswordError').style.visibility = "visible";
                    document.getElementById('oldPasswordError').innerHTML = "Wrong Input alphabets only...!";
                    document.getElementById('oldPassword').style.borderColor = "red";
                    this.oldPasswordCheck = false;
                } else if(this.changePasswordObj.OldPassword.length < 6) {
                    document.getElementById('oldPasswordError').style.visibility = "visible";
                    document.getElementById('oldPasswordError').innerHTML = "Password must be upto 6 ..!";
                    document.getElementById('oldPassword').style.borderColor = "red";
                    this.oldPasswordCheck = false;
                }  else {
                    document.getElementById('oldPasswordError').style.visibility = "hidden";
                    document.getElementById('oldPasswordError').innerHTML = "";
                    document.getElementById('oldPassword').style.borderColor = "grey";
                    this.oldPasswordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkNewPassword() {
                 var res = false;
                if(this.changePasswordObj.NewPassword === "") {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = "Password Cannot Be Empty...!";
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(!this.changePasswordObj.NewPassword.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = "Wrong Input alphabets only...!";
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword.length < 6) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = "Password must be upto 6 ..!";
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword !== this.changePasswordObj.ConfirmPassword) {
                    document.getElementById('newPasswordError').style.visibility = "visible";
                    document.getElementById('newPasswordError').innerHTML = "Password must be equal ..!";
                    document.getElementById('newPassword').style.borderColor = "red";
                    this.newPasswordCheck = false;
                } else {
                    document.getElementById('newPasswordError').style.visibility = "hidden";
                    document.getElementById('newPasswordError').innerHTML = "";
                    document.getElementById('newPassword').style.borderColor = "grey";
                    this.newPasswordCheck = true;
                    document.getElementById('confirmPasswordError').style.visibility = "hidden";
                    document.getElementById('confirmPasswordError').innerHTML = "";
                    document.getElementById('confirmPassword').style.borderColor = "grey";
                    this.confirmPasswordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkConfirmPassword() {
                 var res = false;
                if(this.changePasswordObj.ConfirmPassword === "") {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = "Password Cannot Be Empty...!";
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(!this.changePasswordObj.ConfirmPassword.match(/^[a-zA-Z0-9\s#]+$/)) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = "Wrong Input alphabets only...!";
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(this.changePasswordObj.ConfirmPassword.length < 6) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = "Password must be upto 6 ..!";
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                } else if(this.changePasswordObj.NewPassword !== this.changePasswordObj.ConfirmPassword) {
                    document.getElementById('confirmPasswordError').style.visibility = "visible";
                    document.getElementById('confirmPasswordError').innerHTML = "Password must be equal ..!";
                    document.getElementById('confirmPassword').style.borderColor = "red";
                    this.confirmPasswordCheck = false;
                }  else {
                    document.getElementById('newPasswordError').style.visibility = "hidden";
                    document.getElementById('newPasswordError').innerHTML = "";
                    document.getElementById('newPassword').style.borderColor = "grey";
                    this.newPasswordCheck = true;
                    document.getElementById('confirmPasswordError').style.visibility = "hidden";
                    document.getElementById('confirmPasswordError').innerHTML = "";
                    document.getElementById('confirmPassword').style.borderColor = "grey";
                    this.confirmPasswordCheck = true;
                    res = true;
                }
                this.checkAll();
                return res;
            },
            checkName() {
                var res = false;
                if(this.user.fullName === "") {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = "Name Field Cannot Be Empty...!";
                    document.getElementById('name').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(!this.user.fullName.match(/^[a-zA-Z\s]+$/)) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = "Wrong Input Enter Alphabets Only...!";
                    document.getElementById('name').style.borderColor = "red";
                    this.nameCheck = false;
                } else if(this.user.fullName.length < 3) {
                    document.getElementById('nameError').style.visibility = "visible";
                    document.getElementById('nameError').innerHTML = "Wrong Input Enter minimum 3 Alphabets ..!";
                    document.getElementById('name').style.borderColor = "red";
                    this.nameCheck = false;
                } else {
                    document.getElementById('nameError').style.visibility = "hidden";
                    document.getElementById('nameError').innerHTML = "";
                    document.getElementById('name').style.borderColor = "grey";
                    res = true;
                    this.nameCheck = true;
                }
                this.checkForm();
                return res;
            },
            checkMobileNumber() {
                var res = false;
                if(this.user.mobile === "") {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = "Number Field Cannot Be Empty...!";
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                }else if(!this.user.mobile.match(/^[0-9]+$/)) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = "Wrong Input Enter Numbers Only...!";
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                } else if(this.user.mobile.length < 11) {
                    document.getElementById('numberError').style.visibility = "visible";
                    document.getElementById('numberError').innerHTML = "Wrong Input Enter minimum 11 Numbers ..!";
                    document.getElementById('number').style.borderColor = "red";
                    this.numberCheck = false;
                } else {
                    document.getElementById('numberError').style.visibility = "hidden";
                    document.getElementById('numberError').innerHTML = "";
                    document.getElementById('number').style.borderColor = "grey";
                    this.numberCheck = true;
                    res = true;
                }
                this.checkForm();
                return res;
            },
            hideErrors() {
                document.getElementById('numberError').style.visibility = "hidden";
                document.getElementById('numberError').innerHTML = "";
                document.getElementById('number').style.borderColor = "grey";
                document.getElementById('number').value = "";
                document.getElementById('nameError').style.visibility = "hidden";
                document.getElementById('nameError').innerHTML = "";
                document.getElementById('name').style.borderColor = "grey";
                document.getElementById('name').value = "";
                this.user.fullName = this.user.mobile = "";
                this.disableSave = true;
                
            },
            checkAll() {
               if(this.newPasswordCheck && this.confirmPasswordCheck && this.oldPasswordCheck) {
                   this.disableButton = false;
               } else {
                   this.disableButton = true;
               }
            },
            checkForm() {
                if(this.numberCheck || this.nameCheck) {
                    this.disableSave = false;
                } else {
                    this.disableSave = true;
                }
            },
            updatePassword() {
                this.disableButton = true;
                this.changePasswordObj.Id = localStorage.getItem("id");
                changePassword(this.changePasswordObj).then(response => {
                    if(response.HasErrors === true) {
                        this.showNotification("info","Error","Error occurred please try later!");
                    } else {
                        this.openDialog();
                    }
                }, error => {
                    console.log(error);
                    this.disableButton = false;
                    this.showNotification("info","Error","Error occurred please try later!");
                })
            },
            openDialog() {
                    this.$dialog.alert("Password reset successfully. Please login again with new password.", {
                        loader: true
                    })
                    .then(dialog => {
                        dialog.loading = false;
                        this.signOut();
                    })
            },
            signOut() {
                if(localStorage.getItem('cart') === 'null' || localStorage.getItem('cart') == null) {
                this.$store.dispatch('cleanToken');
                this.$store.dispatch('clearCart');
                this.showNotification('success','Success','Sign out successfully');
                this.$router.go();
                } else {
                this.$dialog.confirm('There are items in cart if you proceed the cart will be clear. Continue?', {
                    loader: true
                }).then(dialog => {
                    dialog.loading(true);
                    this.$store.dispatch('cleanToken');
                    this.$store.dispatch('clearCart');
                    this.showNotification('success','Success','Sign out successfully');
                    dialog.loading(false);
                    dialog.close();
                    this.$router.go();
                }).catch(() => {
                    this.openDialog();
                })
                }

            },
            /*,
             showImage(event) {
                alert(event);
                var image = document.getElementById('showImage');
                image.src = URL.createObjectURL(event.target.files[0]);
            }*/
        },
        mounted() {
            this.fetchUserProfile();
            
        }
    }
</script>
<style scoped>
.container-md{
    background-color: rgb(247,248,250);
}
.pic-container{
    height: 160px;
    width: 160px;
    /*border-radius: 50%;*/
    margin: auto;
    position: relative;
    top:20%;
    /*transform: translate(-50%,-50%);*/
}
   .pic-container img{
       /*border-radius: 50%;*/
       border-radius: 7px;
       display: block;text-align: center;
       /*box-shadow: 3px 3px 2px 2px #e6e6e6;*/
       box-shadow: 0 8px 6px -6px black;
   }
.pic-container:hover img{
    filter: opacity(0.8);
}
   .pic-container:hover .overlay{
       height: 40px;
   }
    .overlay{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        width: 100%;
        height: 0;
        transition: .5s ease;
        text-align: center;
        /*width: 50%;*/
        margin: auto;
    }
/*rgba(0,86,179,0.95)*/
    .overlay button{
        background-color:#BCBDBF;
        color: black;
        width: 100%;
    }

.profile-heading{
    color: #0b0d0f;
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 50px;
}
.edit-btn{
    background-color:#5860ff ;
    float: right;
    margin-right: 10px;
    color: white;
}
.edit-btn:hover{
    background-color: #494FC9;
    color: #fff;
}
    .line{
        border-bottom: 1px solid #BCBDBF;
        padding-bottom:10px;
    }
    .form-field label{
        align-self: center;
        color: black;
        font-weight: 500;
        font-size: 17px;
    }
.form-field input{
    border: 0;
    border-bottom: 1px solid #BCBDBF;
    border-radius: 0;
    font-size: 16px;
    background:none;
}
.form-field input:focus{
    border-bottom: 1px solid #5860ff;
}
.form-control:focus{
    box-shadow: none;
    -webkit-box-shadow: none;
}
    .password-btn{
        position: absolute;
        bottom: 40px;
        background-color:#5860ff;
        color: #fff;
        margin: 0 20px;
    }
    .password-btn:hover{
        background-color: #494FC9;
        color: #fff;
    }

    @media screen and (max-width: 960px) {
        .pic-container{
            top: 0;
            margin-bottom: 20px;
        }
        .password-btn{
            position: unset;
            margin-bottom: 10px;
        }
        .profile-pic{
            text-align: center;
        }
    }
</style>