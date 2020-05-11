<template>
    <div class="row">
        <div class="col-md-6 col-12 shadow" >
            <img src="../../../public/images/loginregister.png" class="side-image" alt="image not available">
        </div>
<!--        <div class="col-md-1"></div>-->
        <div class="col-md-6 col-12">
            <app-top-nav :newLang= local ></app-top-nav>
            <div>
                <router-view @updateTheCounter="emitCounter" :newLang= local ></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import TopNav from "./TopNav";
    import {lang} from "../lang/lang";
    import {EventBus} from "../../main";
    export default {
        name: "Index",
        components: {
            appTopNav: TopNav
        },
        data() {
            return {
                local: lang.en,
            }
        },
        methods: {
            emitCounter() {
                this.$emit("changeCounter",0);
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
    }
</script>

<style scoped>
.side-image{
    /*margin-left: 50px;*/
    height: 640px;
    width: 100%;
}
    .shadow{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .col-md-1{
        margin-left: -70px;
    }
</style>
