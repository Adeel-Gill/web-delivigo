<template>
    <div class="row">
    <div class="col-md-3 nav-color">
        <nav class="navbar">
            <!-- Links -->
            <ul class="navbar-nav  m-top nav-pills mx-auto">
                <li class="nav-item active">
                    <a class="nav-link"  href="#">My Profile</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile/delivery">Delivery Address</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Diamond Reward</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Support</a>
                </li>
            </ul>
        </nav>
    </div>
        <div class="col-md-7 pl-5 m-top">
            <h1 class="profile-heading">My Profile</h1>
            <div class="row">
            <div class="col-md-8">
                    <form action="" class="myProfile">
                        <div class="form-group">
                            <label for="fullname">Full Name</label>
                            <input type="text" class="form-control" value="john Doe" id="fullname">
                        </div>
                        <div class="form-group">
                            <label for="number">Mobile Number</label>
                            <input type="text" class="form-control" value="99199929922" id="number">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" value="abc@mail.com" id="email">
                        </div>
                        <div class="form-group">
                            <label for="npwd">New Password</label>
                            <input type="password" class="form-control" value="12345654" id="npwd">
                        </div>
                        <div class="form-group">
                            <label for="cpwd">Confirm Password</label>
                            <input type="password" class="form-control" value="12345654" id="cpwd">
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
                    <img src="../../../public/images/user-pic.png" class="rounded-circle" alt="userpic"/>
                </div>
            </div>
            </div>
        </div>
        <!-- saved address page-->
        <div class="col-md-7 pl-5 m-top">
            <h1 class="profile-heading">Saved Address</h1>
            <div class="col-md-8">
                <form action="" class="myProfile">
                    <div class="form-group">
                        <label for="home">Full Name</label>
                        <div class="input-group">
                        <input type="text" class="form-control" value="john Doe" id="home">
                        <div class="input-group-append">
                            <i class="fa fa-pencil-alt"></i>
                        </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="office">Full Name</label>
                        <input type="text" class="form-control" value="john Doe" id="office">
                    </div>
                    <div class="form-group">
                        <label for="home2">Full Name</label>
                        <input type="text" class="form-control" value="john Doe" id="home2">
                    </div>
                </form>
            </div>
        </div>
        <!-- End-->
    </div>
</template>

<script>
    export default {
        name: "Profile"
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
    a.nav-link{
        font-family: pantonb;
    }
    .m-top{
        margin-top: 100px;
    }
    .nav-color{
    background-color: #f2f2f2;
}
    .nav-item a{
        color: #000000;
        font-size: 20px;
    }
    .col-md-4{
        padding: 0;
    }
    .nav-item{
        width: 319px;
        /*margin: 0 auto;*/
        text-align: center;
    }
    .active{
        border-right: 3px solid blue;
    }
    .active a{
        color: #5860ff;
    }
    .nav-item a:hover{
        /*border-right: 2px solid blue;*/
        color: #5860ff;
    }
    .profile-heading{
        color: #5860ff;
        font-size: 38px;
        margin-bottom: 50px;
    }
    /*.myProfile{*/
    /*    margin-top: 50px;*/
    /*}*/
    .form-group label{
        font-size: 21px;
    }
    .myProfile input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        border-radius: 0;
       font-size: 18px;
    }
    .myProfile input:focus{
        border-bottom: 1px solid #5860ff;
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
</style>
