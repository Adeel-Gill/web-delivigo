<template>
    <div class="col-12 p-0" style="min-height: 409px;">
        <app-side-nav></app-side-nav>
        <main id="page-wrap">
        <router-view></router-view>
        </main>
    </div>
</template>

<!--<template>
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
</template>-->

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
    @font-face {
        font-family: pantonl;
        src:url("../../assets/fonts/PantonNarrowDemo-Light.otf");
        font-weight: 300;
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
