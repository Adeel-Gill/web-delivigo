<template>
    <div class="w-75">
    <div class="container-fluid">
    <div class="row text-center mb-5 mt-3">
        <div class="col-md-6 btn-tab" :class="[btnActive? 'active-btn' : '']"   id="btn1">
           <router-link to="/currentOrder"><a @click="changeActive('c')" id="cOrder"><h3>Current Order</h3></a></router-link>
        </div>
        <div class="col-md-6 btn-tab" :class="[!btnActive? 'active-btn' : '']"  id="btn2">
            <router-link to="/previousOrder"><a @click="changeActive('p')" id="pOrder"><h3>Previous Order</h3></a></router-link>
        </div>
    </div>
    </div>
    <div class="tab-content">
        <div class="container fade show d-block">
            <router-view></router-view>
<!--            <app-current-order></app-current-order>-->
        </div>
        <div class="container fade show d-none" id="previousOrder">
<!--            <app-previous-order v-for="index in 2" :key="index"></app-previous-order>-->
        </div>
    </div>
    </div>
</template>

<script>
    import CurrentOrder from "../Order/CurrentOrder";
    import PreviousOrder from "../Order/PreviousOrder";
    export default {
        name: "DiamondAward",
        components: {
          appCurrentOrder: CurrentOrder,
          appPreviousOrder: PreviousOrder
        },
        data() {
            return {
                btnActive: true,
            }
        },
        methods: {
            changeActive(oh) {
                if(oh === 'c') {
                    this.btnActive = true;
                } else {
                    this.btnActive = false;
                }
            }
        },
        created() {
            // this.$router.push('/currentOrder');
        },
        mounted() {
            // this.$router.push('/currentOrder');
        },
        updated() {
            // this.$router.push('/currentOrder');
        }
    }
    /*Vue.component('star-rating', VueStarRating.default)
    new Vue({
        el: '#app',
        methods: {
            setRating: function(rating) {
                this.rating = "You have Selected: " + rating + " stars";
            },
            showCurrentRating: function(rating) {
                this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
            },
            setCurrentSelectedRating: function(rating) {
                this.currentSelectedRating = "You have Selected: " + rating + " stars";
            }
        },
        data: {
            rating: "No Rating Selected",
            currentRating: "No Rating",
            currentSelectedRating: "No Current Rating",
            boundRating: 3,
        }
    });*/
    // $(document).ready(function() {
    //     $("#cOrder").click(function (e) {
    //         e.preventDefault();
    //         $("#previousOrder").removeClass("d-block");
    //         $("#previousOrder").addClass("d-none");
    //         $("#currentOrder").removeClass("d-none");
    //         $("#currentOrder").addClass("d-block");
    //         $("#btn1").addClass("active-btn");
    //         $("#btn2").removeClass("active-btn");
    //     });
    // });
    //
    // $(document).ready(function() {
    //     $("#pOrder").click(function (e) {
    //         e.preventDefault();
    //         $("#currentOrder").removeClass("d-block");
    //         $("#currentOrder").addClass("d-none");
    //         $("#previousOrder").removeClass("d-none");
    //         $("#previousOrder").addClass("d-block");
    //         $("#btn2").addClass("active-btn");
    //         $("#btn1").removeClass("active-btn");
    //     });
    // });
</script>

<style scoped>
.btn-tab{
    border-bottom: 1px solid #9C9C9C;
    color: black !important;
}
.btn-tab a{
    color: inherit;
}
.btn-tab:hover{
    color: #007bff !important;
    border-bottom: 2px solid #0056b3;
}
.btn-tab a:hover{
    text-decoration: none;

}
.active-btn{
    border-bottom: 2px solid #0056b3;
    color: #007bff !important;
}
    .sec1{
        border-bottom: 1px solid #9C9C9C;
    }
    .review{
        height: 70px;
        background-color: #f2f2f2;
    }
/*rating star*/
    .rating {
        unicode-bidi: bidi-override;
        direction: rtl;
    }
    .rating > span {
        display: inline-block;
        position: relative;
        font-size: 1.1em;
        color: #e6e6e6;
    }
    .rating > span:hover:before,
    .rating > span:hover ~ span:before {
        color: #fbb03b;
    }
/* end*/

/*.custom-text {*/
/*    font-weight: bold;*/
/*    font-size: 1.9em;*/
/*    border: 1px solid #cfcfcf;*/
/*    padding-left: 10px;*/
/*    padding-right: 10px;*/
/*    border-radius: 5px;*/
/*    color: #999;*/
/*    background: #fff;*/
/*}*/

.numberCircle {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    /*padding-bottom:2px;*/
    background: #5860ff;
    padding-top: 1px;
    /*border: 2px solid #5860ff;*/
    color: #fff;
    position: absolute;
    left: 14px;
    text-align: center;
    font-size: 11px;
    display: inline-block;
}
    .line{
        border-left: 1px solid #5860ff;
        margin-left: 10px;
        padding-left: 10px;
    }
    .sub-catg p,.sub-catg span{
        font-family: pantonl;
        text-transform: capitalize;
        margin-bottom: 0;
        font-size: 16px;
        /*font-weight: lighter;*/
    }
    .collapse-head{
        font-size: 19px;
    }
    .collapse-tab{
        padding-bottom: 10px;
        border-bottom: 1px solid #9C9C9C;
    }
    .total span{
        font-size: 19px;
        padding-top: 15px;
    }
    .card{
        box-shadow: 4px 1px 10px 1px #DEDEDE;
    }

    @media screen and (max-width: 576px) {
        .w-75{
            width: 100% !important;
        }
    }
</style>
