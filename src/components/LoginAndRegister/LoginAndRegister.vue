<template>
    <div class="row">
        <div class="col-md-6 col-12 shadow" >
            <div class="img-shadow">
            <img src="../../../public/images/loginregister.png" class="side-image" alt="image not available">
            </div>
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
    /*height: 640px;*/
    /*width: 100%;
    height: 100%;*/
    margin-left: 77px;
    margin-top: 60px;
    height: 371px;
    width: 77%;
    border: 1px solid gray;
    transform: rotate(-9deg);
    box-shadow: 10px 10px 3px 5px rgba(0,0,0,0.2);
    -moz-box-shadow: 10px 10px 3px 5px rgba(0,0,0,0.2);
    -webkit-box-shadow: 10px 10px 3px 5px rgba(0,0,0,0.2);
}
/*.img-shadow{
    margin-left: 77px;
    margin-top: 60px;
    height: 371px;
    width: 77%;
    border: 1px solid gray;
    transform: rotate(-9deg);
    box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.2);
    z-index: -1;
}*/
/*.img-shadow img:after{
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: -20px;
    left: 0px;
    box-shadow: 10px 10px 10px 1px rgba(0,0,0,0.2);
    transform: rotate(-3deg);
}*/
/*img.side-image:after{
    transform: rotate(3deg);
}*/
    .shadow{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .col-md-1{
        margin-left: -70px;
    }
</style>
