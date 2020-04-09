<template>
    <div class="col-12 col-sm-12 col-md-9">
    <div class="container-md mt-4 pt-3 pb-5">
        <div class="card p-5">
            <div class="row py-2">
            <div class="col-md-3 col-sm-12 col-12 profile-pic">
                <div class="pic-container">
                    <img src="/images/user-pic.png" id="showImage" class="img-fluid" alt="user">
                    <div class="overlay"><!--@change="showImage(e)"-->
                        <input type="file"  id="image-upload" hidden>
                        <button class="btn" @click="imageUpload()"><i class="fas fa-camera"></i>&nbsp;Upload picture</button>
                    </div>
                </div>
                <button v-b-modal.change-password class="btn password-btn">Change Password</button>
            </div>
            <div class="col-md-9 col-sm-12 col-12">
                <div class="heading line">
                    <h1 class="profile-heading d-inline">My Profile</h1>
                    <button  class="btn edit-btn" @click="changeValidated">Edit</button>
                </div>
                <div class="form-field mt-5 pr-3">
                    <form>
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" value="Tatian Shah">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" id="email" value="tatian@gmail.com">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 col-form-label">Phone No</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="phone" value="0343843343">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="address" class="col-sm-2 col-form-label">Address</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="address" value="River Lake street no 67">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        <b-modal id="change-password" size="300px" centered title="Change Password">
            <div class="form-field">
                <form>
                    <div class="form-group row">
                        <label for="newPassword" class="col-sm-4 col-form-label">New Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="newPassword" value="12333">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="confirmPassword" class="col-sm-4 col-form-label">Confirm Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="confirmPassword" value="12333">
                        </div>
                    </div>
                </form>
            </div>
            <template v-slot:modal-footer="{ ok}">
                <b-button size="sm" variant="primary" @click="ok()">
                    Change Password
                </b-button>
            </template>
        </b-modal>
    </div>
    </div>
</template>

<script>
    export default {
        name: "profile2",
        methods:{
            imageUpload() {
                document.getElementById('image-upload').click();
            }/*,
             showImage(event) {
                alert(event);
                var image = document.getElementById('showImage');
                image.src = URL.createObjectURL(event.target.files[0]);
            }*/
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
        bottom: 80px;
        background-color:#5860ff;
        color: #fff;
        margin: 0 10px;
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