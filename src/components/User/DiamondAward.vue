<template>
    <div>
    <div class="container-fluid">
    <div class="row text-center my-5">
        <div class="col-md-6 btn-tab active-btn" id="btn1">
            <a href="#currentOrder" id="cOrder"><h3>Current Order</h3></a>
        </div>
        <div class="col-md-6 btn-tab" id="btn2">
            <a href="#previousOrder" id="pOrder"><h3>Previous Order</h3></a>
        </div>
    </div>
    </div>
    <div class="tab-content">
        <div class="container fade show d-block" id="currentOrder">
            <div class="card mb-5">
                <div class="card-body">
                    <div class="row mx-3 mt-3">
                        <div class="col-md-6">
                            <div class="sec1">
                                <h6>Burger Point</h6>
                                <p class="text-muted">22nd jan 2019</p>
                            </div>
                            <div class="sec1">
                                <p class="mt-4">2 E Broadway #200, New York, NY 10038, USA</p>
                            </div>
                            <div class="">
                                <div class="rating mt-4 mb-3">
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>

<!--                                    <star-rating :increment="0.5"></star-rating>-->
                                </div>
                                <div class="form-group">
                                    <textarea  class="form-control review" placeholder="your review"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="collapse-tab" role="tablist">
                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-1><div class="numberCircle">1</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-2><div class="numberCircle">2</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                        <p class="text-muted">thin Crust</p>
                                        <p class="text-muted">Spicy</p>
                                        <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-3><div class="numberCircle">3</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="total">
                                <span class="float-right">$90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="card mb-5">
                <div class="card-body">
                    <div class="row mx-3 mt-3">
                        <div class="col-md-6">
                            <div class="sec1">
                                <h6>Burger Point</h6>
                                <p class="text-muted">22nd jan 2019</p>
                            </div>
                            <div class="sec1">
                                <p class="mt-4">2 E Broadway #200, New York, NY 10038, USA</p>
                            </div>
                            <div class="">
                                <div class="rating mt-4 mb-3">
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>

                                    <!--                                    <star-rating :increment="0.5"></star-rating>-->
                                </div>
                                <div class="form-group">
                                    <textarea  class="form-control review" placeholder="your review"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="collapse-tab" role="tablist">
                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-1><div class="numberCircle">1</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-2><div class="numberCircle">2</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-3><div class="numberCircle">3</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="total">
                                <span class="float-right">$90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div class="container fade show d-none" id="previousOrder">
            <div class="card mb-5">
                <div class="card-body">
                    <div class="row mx-3 mt-3">
                        <div class="col-md-6">
                            <div class="sec1">
                                <h6>Burger Point</h6>
                                <p class="text-muted">22nd jan 2019</p>
                            </div>
                            <div class="sec1">
                                <p class="mt-4">2 E Broadway #200, New York, NY 10038, USA</p>
                            </div>
                            <div class="">
                                <div class="rating mt-4 mb-3">
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>

                                    <!--                                    <star-rating :increment="0.5"></star-rating>-->
                                </div>
                                <div class="form-group">
                                    <textarea  class="form-control review" placeholder="your review"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="collapse-tab" role="tablist">
                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-1><div class="numberCircle">1</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-2><div class="numberCircle">2</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-3><div class="numberCircle">3</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="total">
                                <span class="float-right">$90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="card mb-5">
                <div class="card-body">
                    <div class="row mx-3 mt-3">
                        <div class="col-md-6">
                            <div class="sec1">
                                <h6>Burger Point</h6>
                                <p class="text-muted">22nd jan 2019</p>
                            </div>
                            <div class="sec1">
                                <p class="mt-4">2 E Broadway #200, New York, NY 10038, USA</p>
                            </div>
                            <div class="">
                                <div class="rating mt-4 mb-3">
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>

                                    <!--                                    <star-rating :increment="0.5"></star-rating>-->
                                </div>
                                <div class="form-group">
                                    <textarea  class="form-control review" placeholder="your review"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="collapse-tab" role="tablist">
                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-1><div class="numberCircle">1</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-2><div class="numberCircle">2</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>

                                <div class="line">
                                    <div class="px-1 ml-1 collapse-head" role="tab">
                                        <a v-b-toggle.accordion-3><div class="numberCircle">3</div>FarmHouse</a>
                                        <span class="float-right">$33</span>
                                    </div>
                                    <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
                                        <div class="pl-3 sub-catg pb-3">
                                            <p class="text-muted">thin Crust</p>
                                            <p class="text-muted">Spicy</p>
                                            <p class="d-inline-block text-muted">paul Crisp</p><span class="float-right text-muted">$44</span>
                                        </div>
                                    </b-collapse>
                                </div>
                            </div>
                            <div class="total">
                                <span class="float-right">$90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: "DiamondAward"
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
    $(document).ready(function() {
        $("#cOrder").click(function (e) {
            e.preventDefault();
            $("#previousOrder").removeClass("d-block");
            $("#previousOrder").addClass("d-none");
            $("#currentOrder").removeClass("d-none");
            $("#currentOrder").addClass("d-block");
            $("#btn1").addClass("active-btn");
            $("#btn2").removeClass("active-btn");
        });
    });

    $(document).ready(function() {
        $("#pOrder").click(function (e) {
            e.preventDefault();
            $("#currentOrder").removeClass("d-block");
            $("#currentOrder").addClass("d-none");
            $("#previousOrder").removeClass("d-none");
            $("#previousOrder").addClass("d-block");
            $("#btn2").addClass("active-btn");
            $("#btn1").removeClass("active-btn");
        });
    });
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

</style>
