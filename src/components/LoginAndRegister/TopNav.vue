<template>
    <div>
        <nav class="navbar ">
            <ul class="navbar-nav flex-row">
                <router-link class="nav-item"
                to="/signin"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">Sign In</a>
                </router-link>
            <router-link class="nav-item"
                to="/signup"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">Sign Up</a>
                </router-link>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "TopNav"
    }
</script>

<style scoped>
    @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }
    a.nav-link{
        font-family: pantonb;
        color: #b3b3b3 !important;
    }
    .nav-link{
        font-family: Panton-Bold;
        font-size: 15px;
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
        color: #5860ff;
    }
</style>
