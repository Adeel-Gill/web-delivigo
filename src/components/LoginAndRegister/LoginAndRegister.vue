<template>
    <div class="row">
        <div class="col-md-6 shadow" >
            <img src="../../../public/images/loginregister.png" class="side-image" alt="image not available">
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5">
            <app-top-nav></app-top-nav>
            <div>
                <router-view @updateTheCounter="emitCounter"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import TopNav from "./TopNav";
    export default {
        name: "Index",
        components: {
            appTopNav: TopNav
        },
        methods: {
            emitCounter() {
                this.$emit("changeCounter",0);
            }
        }
    }
</script>

<style scoped>
.side-image{
    margin-left: 50px;
    height: 640px;
    width: 500px;
}
    .shadow{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .col-md-1{
        margin-left: -70px;
    }
</style>
