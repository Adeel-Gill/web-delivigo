<template>
    <div class="pl-5 m-top">
        <h1 class="profile-heading d-inline">My Profile</h1>
        <a  class="edit-btn" @click="changeValidated"><i class="fa fa-pencil-alt"></i></a>
<!--        <h1 class="profile-heading">My Profile</h1>-->
        <div class="row">
            <div class="col-md-8">
                <!--                    <app-profile></app-profile>-->
                <form action="" class="myProfile">
                    <div class="form-group">
                        <label for="fullname">Full Name</label>
                        <input type="text" class="form-control" ref="fn" :value="userData.FullName" :disabled = "validated" id="fullname">
                    </div>
                    <div class="form-group">
                        <label for="number">Mobile Number</label>
                        <input type="text" class="form-control" :value="userData.Mobile" :disabled = "validated" id="number">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" :value="userData.Email" :disabled = "validated" id="email">
                    </div>
                    <div class="form-group">
                        <label for="npwd">New Password</label>
                        <input type="password" class="form-control" value="12345654" :disabled = "validated" id="npwd">
                    </div>
                    <div class="form-group">
                        <label for="cpwd">Confirm Password</label>
                        <input type="password" class="form-control" value="12345654" :disabled = "validated" id="cpwd">
                    </div>
                    <div class="button">
                        <button type="submit" class="btn btn-submit">Save</button>
                        <button type="submit" class="btn btn-cancel">Cancel</button>
                    </div>
                </form>
            </div>
            <div class="col-md-4 pl-5">
                <h4>Picture</h4>
                <div class="profile-pic">
                    <img :src="baseUrl + userData.UrlImage" class="rounded-circle img-fluid" alt="userpic"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {fetchUserProfile} from "../api/Profile";
    import {baseAddress} from "../../main";
    export default {
        name: "Profile",
        data() {
            return {
                validated: true,
                baseUrl: baseAddress,
                userData: {}
            }
        },
        methods: {
            changeValidated() {
                this.validated = !this.validated
                if(!this.validated) {
                    alert('fields are editable');
                    this.$refs.fn.$el.focus();
                }
                else{
                    alert('fields are not editable');
                }
            },
            async fetchUserProfile() {
                fetchUserProfile().then(response => {
                    this.userData = response
                })
            }
        },
        mounted() {
            this.fetchUserProfile()
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

    .col-md-4{
        padding: 0;
    }
    .profile-heading{
        color: #5860ff;
        font-size: 38px;
        margin-bottom: 50px;
    }
    .form-group label{
        font-size: 21px;
        margin-top: 20px;
    }
    .myProfile input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        border-radius: 0;
        font-size: 18px;
        background:none;
    }
    .myProfile input:focus{
        border-bottom: 1px solid #5860ff;
    }
    .profile-pic{
        height: 200px;
        width: 200px;
    }
    .profile-pic img{
        height: 100%;
        width: 100%;
    }
    .button .btn-submit{
        margin-right: 50px;
        background-color: #5860ff;
        color: white;

    }
    .button .btn-cancel{
        border: 2px solid #5860ff;
        color: #5860ff;
    }
    .button{
        margin-top: 50px;
        margin-bottom: 100px;
    }
    .button button{
        border-radius: 30px;
        width: 150px;
    }
    .form-control:focus{
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .edit-btn i{
        margin-left:20px ;
        font-size: 25px;
        color: #9c9c9c;
    }
    .edit-btn i:hover{
        color: #5860ff;
    }
</style>
