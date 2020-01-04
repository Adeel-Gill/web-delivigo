<template>
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3 nav-color">
            <app-side-nav></app-side-nav>
        </div>
        <div  class="col-md-9">
            <router-view></router-view>
        </div>
    </div>
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
</style>
