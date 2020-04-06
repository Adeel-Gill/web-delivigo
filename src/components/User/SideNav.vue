<template>
    <div>

        <Push noOverlay isOpen disableOutsideClick>
            <nav class="navbar">
                <!-- Links -->
                <ul class="navbar-nav  m-top nav-pills mx-auto">
                    <router-link class="nav-item"
                                 to="/profile"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link">My Profile</a>
                    </router-link>
                    <router-link class="nav-item"
                                 to="/delivery"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link" >Delivery Address</a>
                    </router-link>
                    <router-link class="nav-item"
                                 to="/billing"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link">Billing And Payments</a>
                    </router-link>
                    <router-link class="nav-item"
                                 to="/currentOrder"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link">Order History</a>
                    </router-link>
                    <router-link class="nav-item"
                                 to="/discount"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link">Discount</a>
                    </router-link>
<!--                    <router-link class="nav-item"-->
<!--                                 to="/diamond"-->
<!--                                 tag="li"-->
<!--                                 active-class="active"-->
<!--                                 exact>-->
<!--                        <a class="nav-link">Diamond Award</a>-->
<!--                    </router-link>-->
<!--                    <router-link class="nav-item"-->
<!--                                 to="/support"-->
<!--                                 tag="li"-->
<!--                                 active-class="active"-->
<!--                                 exact>-->
<!--                        <a class="nav-link">Support</a>-->
<!--                    </router-link>-->
                    <router-link class="nav-item"
                                 to="/privacy?docType=p"
                                 tag="li"
                                 active-class="active"
                                 exact>
                        <a class="nav-link">Legal</a>
                    </router-link>
                </ul>
            </nav>
        </Push>
        <!--<nav class="navbar">
            &lt;!&ndash; Links &ndash;&gt;
            <ul class="navbar-nav  m-top nav-pills mx-auto">
                <router-link class="nav-item"
                to="/profile"
                tag="li"
                active-class="active"
                exact>
                    <a class="nav-link">My Profile</a>
                </router-link>
                <router-link class="nav-item"
                             to="/delivery"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link" >Delivery Address</a>
                </router-link>
                <router-link class="nav-item"
                             to="/billing"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link">Billing And Payments</a>
                </router-link>
                <router-link class="nav-item"
                             to="/diamond"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link">Diamond Reward</a>
                </router-link>
                <router-link class="nav-item"
                             to="/support"
                             tag="li"
                             active-class="active"
                             exact>
                    <a class="nav-link">Support</a>
                </router-link>
            </ul>
        </nav>-->
    </div>
</template>

<script>
    import { Push } from 'vue-burger-menu';
    export default {
        name: "SideNav",
        components: {
            Push
        },
        data() {
            return {
                path: ''
            }
        },
        mounted() {
            this.path = this.$route.path;
            console.log(this.path);
        }
    }
</script>

<style scoped>
    /*@font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }*/
    /*.row{*/
    /*    font-family:pantonb ;*/
    /*}*/

    /*@font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Light.otf");
    }
    .row{
        font-family:pantonb ;
    }*/
    a.nav-link{
        /*font-family: PantonSemi;*/
        color: #000000;
    }
    .m-top{
        margin-top: 18px;
    }
    .navbar{
        height: 100%;
    }
    /*.nav-color{*/
    /*    background-color: #f2f2f2;*/
    /*}*/
    .nav-item a{
        color: #000000;
        font-size: 20px;
        text-align: left;
        /*margin-left: 60px;*/
    }
    .col-md-4{
        padding: 0;
    }
    .nav-item{
        width: 121%;
        /*margin: 0 auto;*/
        text-align: center;
        /*margin-left: 40px;*/
        /*padding-right: 28px;*/
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
    /*.profile-heading{*/
    /*    color: #5860ff;*/
    /*    font-size: 38px;*/
    /*    margin-bottom: 50px;*/
    /*}*/
    /*!*.myProfile{*!*/
    /*!*    margin-top: 50px;*!*/
    /*!*}*!*/
    /*.form-group label{*/
    /*    font-size: 21px;*/
    /*}*/
    /*.myProfile input{*/
    /*    border: 0;*/
    /*    border-bottom: 1px solid #e6e6e6;*/
    /*    border-radius: 0;*/
    /*    font-size: 18px;*/
    /*}*/
    /*.myProfile input:focus{*/
    /*    border-bottom: 1px solid #5860ff;*/
    /*}*/
    /*.button .btn-submit{*/
    /*    margin-right: 50px;*/
    /*    background-color: #5860ff;*/
    /*    color: white;*/

    /*}*/
    /*.button .btn-cancel{*/
    /*    border: 2px solid #5860ff;*/
    /*    color: #5860ff;*/
    /*}*/
    /*.button{*/
    /*    margin-top: 50px;*/
    /*    margin-bottom: 100px;*/
    /*}*/
    /*.button button{*/
    /*    border-radius: 30px;*/
    /*    width: 150px;*/
    /*}*/
    /*.form-control:focus{*/
    /*    box-shadow: none;*/
    /*    -webkit-box-shadow: none;*/
    /*}*/
</style>
