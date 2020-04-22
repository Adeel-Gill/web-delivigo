<template>
    <div class="col-12 p-0" style="min-height: 409px;">
        <app-side-nav></app-side-nav>
        <main id="page-wrap">
        <router-view @changeTheCounter = "checking"></router-view>
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
import { EventBus } from '../../main';
    export default {
        name: "Profile",
        components: {
            appSideNav: SideNav,
            appProfile: Profile,
            appDeliveryAddress: DeliveryAddress
        },
        methods: {
            checking(n) {
                console.log("here it is",n);
                this.$emit("changeCounter", n);
            }
        },
        updated() {
            this.$on("changeTheCounter", response => {
                console.log("hereUSer",repsonse);
            })
        },
        mounted() {
            localStorage.setItem("isAddress", "false");
                this.$emit("changeCounter",0);
        }
    }
</script>

<style scoped>
   /* @font-face {
        font-family: pantonb;
        !*src:url("../../assets/fonts/Panton-Bold.ttf");*!
    }
    @font-face {
        font-family: pantonl;
        !*src:url("../../assets/fonts/PantonNarrowDemo-Light.otf");*!
        font-weight: 300;
    }
    .row{
        !*font-family:pantonb ;*!
    }*/
    .nav-color{
        background-color: #f2f2f2;
    }
    @media  {

    }
</style>
