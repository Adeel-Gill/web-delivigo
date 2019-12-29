<template>
    <div>
        <nav class="navbar">
            <!-- Links -->
            <ul class="navbar-nav  m-top nav-pills mx-auto">
                <router-link class="nav-item active"
                to="/profile"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">My Profile</a>
                </router-link>
                <router-link class="nav-item active"
                             to="/delivery"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link" >Delivery Address</a>
                </router-link>
                <router-link class="nav-item active"
                             to="/diamond"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link">Diamond Reward</a>
                </router-link>
                <router-link class="nav-item active"
                             to="/support"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link">Support</a>
                </router-link>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "SideNav"
    }
</script>

<style scoped>
    @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }

    a.nav-link{
        font-family: pantonb;
    }
    .m-top{
        margin-top: 100px;
    }
    .nav-item a{
        color: #000000;
        font-size: 20px;
    }
    .col-md-4{
        padding: 0;
    }
    .nav-item{
        width: 319px;
        /*margin: 0 auto;*/
        text-align: center;
    }
    .active{
        border-right: 3px solid blue;
    }
    .active a{
        color: #5860ff;
    }
    .nav-item a:hover{
        /*border-right: 2px solid blue;*/
        color: #5860ff;
    }
</style>
