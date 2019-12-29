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
    .m-top{
        margin-top: 100px;
    }
    .nav-color{
        background-color: #f2f2f2;
    }

    .col-md-4{
        padding: 0;
    }

</style>
