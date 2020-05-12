<template>
    <div class="top-nav">
        <nav class="navbar ">
            <ul class="navbar-nav flex-row">
                <router-link class="nav-item"
                to="/signin"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">{{newLang.signin}}</a>
                </router-link>
            <router-link class="nav-item"
                to="/signup"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">{{newLang.signUp}}</a>
                </router-link>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "TopNav",
        props: ['newLang']
    }
</script>

<style scoped>
   /* @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }*/
    a.nav-link{
        /*font-family: pantonb;*/
        font-weight: bold;
        color: #b3b3b3 !important;
    }
    .nav-link{
        /*font-family: Panton-Bold;*/
        font-size: 15px;
        font-weight: bold;
        color: #5860ff !important;
    }
    .nav-item a{
        color: #000000;
        font-size: 20px;
        text-align: center;
        margin-left: 40px;
    }
    .active{
        border-bottom: 1px solid blue;
    }
    .navbar{
        display: flex
    }
    .nav-item{
        margin-right: 5px;
        width: content-box;
        padding-right: 40px;
        /*margin: 0 auto;*/
        text-align: left;
    }
    .active a{
        color: #5860ff !important;
    }
    .top-nav{
        display: table;
        margin: 0 auto;
    }
</style>
