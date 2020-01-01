@@ -0,0 +1,15 @@
<template>
    <div class="pl-5 m-top m-bottom">
        <div class="row">
            <div class="col-md-8">
            <h1 class="profile-heading">Saved Address</h1>
            </div>
                <div class="col-md-4">
                    <button type="submit" class="btn btn-submit"><i class="fas fa-plus mr-3"></i>Add Address</button>
                </div>
        </div>
        <div class="col-md-10">
            <div class="address-block row">
                <div class="col-md-8">
                <h6 class="address-heading">Home</h6>
                <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#"><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
            <div class="address-block row">
                <div class="col-md-8">
                    <h6 class="address-heading">Office1</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#"><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
            <div class="address-block row">
                <div class="col-md-8">
                    <h6 class="address-heading">Home2</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#"><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
            <div class="address-block row">
                <div class="col-md-8">
                    <h6 class="address-heading">Office</h6>
                    <p class="address-par text-muted">2 E Broadway #200, New York, NY 10038, USA</p>
                </div>
                <div class="col-md-2 icon">
                    <a href="#"><i class="fas fa-pencil-alt edit"></i></a>
                    <a href="#"><i class="fas fa-times-circle cancel"></i></a>
                    <div class="radio">
                        <input type="radio">
                        <label>Default</label>
                    </div>
                </div>
            </div>
<!--            <div class="form-group">-->
<!--&lt;!&ndash;                        <label for="home">Full Name</label>&ndash;&gt;-->
<!--                <label for="office">Office</label>-->
<!--                        <div class="input-group">-->
<!--                            <input type="text" class="form-control" value="2 E Broadway #200, New York, NY 10038, USA" id="office">-->
<!--&lt;!&ndash;                            <input type="text" class="form-control" value="john Doe" id="home">&ndash;&gt;-->
<!--                            <div class="input-group-append">-->
<!--                                <i class="fa fa-pencil-alt"></i>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="form-group">-->
<!--                        <label for="home2">Home2</label>-->
<!--                        <div class="input-group">-->
<!--                            <input type="text" class="form-control" value="2 E Broadway #200, New York, NY 10038, USA" id="home2">-->
<!--                            <div class="input-group-append">-->
<!--                                <i class="fa fa-pencil-alt"></i>-->
<!--                            </div>-->
<!--                        </div>-->
<!--&lt;!&ndash;                        <label for="office">Full Name</label>&ndash;&gt;-->
<!--&lt;!&ndash;                        <input type="text" class="form-control" value="john Doe" id="office">&ndash;&gt;-->
<!--                    </div>-->
<!--                    <div class="form-group">-->
<!--                        <label for="home3">Home3</label>-->
<!--                        <div class="input-group">-->
<!--                            <input type="text" class="form-control" value="2 E Broadway #200, New York, NY 10038, USA" id="home3">-->
<!--                            <div class="input-group-append">-->
<!--                                <i class="fa fa-pencil-alt"></i>-->
<!--                            </div>-->
<!--                        </div>-->
<!--&lt;!&ndash;                        <label for="home2">Full Name</label>&ndash;&gt;-->
<!--&lt;!&ndash;                        <input type="text" class="form-control" value="john Doe" id="home2">&ndash;&gt;-->
<!--                    </div>-->
<!--                </form>-->
            </div>
    </div>
</template>

<script>
    export default {
        name: "DeliveryAddress"
    }
</script>

<style scoped>
    @font-face {
        font-family: pantonb;
        src:url("../../assets/fonts/Panton-Bold.ttf");
    }
    .row{
        font-family:pantonb ;
    }
    .m-top{
        margin-top: 100px;
    }
    .m-bottom{
        margin-bottom: 100px;
    }
    .col-md-4{
        padding: 0;
    }
    .profile-heading{
        color: #5860ff;
        font-size: 38px;
        margin-bottom: 50px;
    }
    .address-block{
        border-bottom: 1px solid #9C9C9C;
        margin-bottom: 10px;
    }
    .address-block h6{
        font-size: 21px;
        /*margin-top: 20px;*/
    }
    .address-block p{
        font-size: 18px;
        padding-left: 5px;
        display: inline-block;
        margin-bottom: 0;
    }
    /*.input-group-append{*/
    /*    !*color: #1c0095;*!*/
    /*    margin-right: 30px;*/
    /*}*/
    .button .btn-submit{
        margin-right: 50px;
        background-color: #5860ff;
        color: white;

    }
    .button .btn-cancel{
        border: 2px solid #5860ff;
        color: #5860ff;
    }
    .button{
        margin-top: 50px;
        margin-bottom: 100px;
    }
    .button button{
        border-radius: 30px;
        width: 150px;
    }
    .btn-submit{
        background-color: #5860ff;
        color: white;
        border-radius: 30px;
        /*width: 150px;*/
        padding-right: 25px;
        padding-left: 25px;
    }
    .icon{
        display: inline-block;
        position: absolute;
        right: 0;
        text-align: right;
        /*margin-top: 20px;*/
    }
    .icon i{
        margin: 0 10px 0 0;
        font-size: 20px;
    }
    .icon .cancel{
        color: red;
    }
    .edit{
        color: #5860ff;
    }
    .radio{
        display: flex;
        margin-top: 10px;
    }
    .radio input{
        margin-top: 1px;
        height:20px;
        width: 20px;
        margin-right: 10px;
    }
    .radio label{
        font-size: 17px;
    }
</style>
