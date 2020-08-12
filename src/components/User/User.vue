<template>
    <div class="col-12 p-0" style="min-height: 409px;">
        <app-side-nav :newLang = local></app-side-nav>
        <main id="page-wrap">
        <router-view @changeTheCounter = "checking" :newLang = local></router-view>
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
    import {lang} from "../lang/lang";
    export default {
        name: "Profile",
        components: {
            appSideNav: SideNav,
            appProfile: Profile,
            appDeliveryAddress: DeliveryAddress
        },
        data() {
            return {
                local: lang.en,
            }
        },
        methods: {
            checking(n) {
                console.log("here it is",n);
                this.$emit("changeCounter", n);
            },
            checkLang() {
            console.log("hereItIs");
                var temp = localStorage.getItem("lang");
                if(temp == null || temp === "EN") {
                localStorage.setItem("lang", "EN");
                this.local = lang.en;
                } else if(temp === "FN" ) {
                this.local = lang.fn;
                localStorage.setItem("lang", "FN");
                } else {
                this.local = lang.sp;
                localStorage.setItem("lang", "ES");
                }
            },
        },
        created() {
             this.checkLang();
        EventBus.$on("changeLang", () => {
            this.checkLang();
            })
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
   
    .nav-color{
        background-color: #f2f2f2;
    }
    @media  {

    }
</style>
