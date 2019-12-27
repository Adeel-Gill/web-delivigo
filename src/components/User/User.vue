<template>
    <div class="row">
        <div class="col-md-3 nav-color">
            <app-side-nav></app-side-nav>
        </div>
        <div  class="col-md-7">
            <router-view></router-view>
        </div>
        <!-- saved address page-->
<!--        <div class="col-md-7">-->
<!--            <app-delivery-address></app-delivery-address>-->
<!--&lt;!&ndash;            <h1 class="profile-heading">Saved Address</h1>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="col-md-8">&ndash;&gt;-->
<!--&lt;!&ndash;                <form action="" class="myProfile">&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="form-group">&ndash;&gt;-->
<!--&lt;!&ndash;                        <label for="home">Full Name</label>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="input-group">&ndash;&gt;-->
<!--&lt;!&ndash;                            <input type="text" class="form-control" value="john Doe" id="home">&ndash;&gt;-->
<!--&lt;!&ndash;                            <div class="input-group-append">&ndash;&gt;-->
<!--&lt;!&ndash;                                <i class="fa fa-pencil-alt"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="form-group">&ndash;&gt;-->
<!--&lt;!&ndash;                        <label for="office">Full Name</label>&ndash;&gt;-->
<!--&lt;!&ndash;                        <input type="text" class="form-control" value="john Doe" id="office">&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="form-group">&ndash;&gt;-->
<!--&lt;!&ndash;                        <label for="home2">Full Name</label>&ndash;&gt;-->
<!--&lt;!&ndash;                        <input type="text" class="form-control" value="john Doe" id="home2">&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </form>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--        </div>-->
        <!-- End-->
    </div>
</template>

<script>
    import SideNav from "./SideNav";
    import Profile from "./Profile";
    import DeliveryAddress from "./DeliveryAddress";
    export default {
        name: "Profile",
        components: {
            appSideNav: SideNav,
            appProfile: Profile,
            appDeliveryAddress: DeliveryAddress
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
