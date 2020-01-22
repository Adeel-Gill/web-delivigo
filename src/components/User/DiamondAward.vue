<template>
    <div class="container">
        <div class="col-12 col-md-9 diamond-sec">
        <h1>Share DeliviGo and earn  free
            deliveries</h1>
            <div class="img-container">
                <img src="../../../public/images/diamond.png" alt="Diamond">
                <div class="line">
                    <p class="m-0">12 DIAMOND</p>
                <span>Owened</span>
                </div>
            </div>

            <p class="detail">Get upto 4 DeliviGo Diamonds for each person who joins DeliviGo with your referral code. Each token worth a</p>
            <div class="form-group">
                <label for="refferal" class="text-muted">Your Refferal code here</label>
                <input class="form-control" type="text" id="refferal">
            </div>
        </div>
        <div class="col-12 col-md-9 text-justify step-sec">
            <h6>How does DeliviGo Diamonds works ?</h6>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
                dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
                praesent luptatum zzril dele
            </p>

            <p class="head">Step 1</p>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                iriure dolor in hendrerit in vulputat
            </p>

            <p class="head">Step 2</p>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                iriure dolor in hendrerit in vulputat
            </p>

            <p class="head">Step 3</p>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                iriure dolor in hendrerit in vulputat
            </p>

            <p class="head">Step 4</p>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                iriure dolor in hendrerit in vulputat
            </p>

            <p class="head">Please Note</p>
            <p class="pargraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
                ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
                nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
                zzril delenit augue duis
            </p>

            <span class="head">Stay Tuned ! Happy Sharing !</span>
        </div>
        <!--<div class="col-6">
            <div class="img-container">
                <img src="../../../public/images/diamond.png" alt="Diamond">
            </div>
        </div>-->
    </div>
</template>

<script>
    export default {
        name: "DiamondAward"
    }
</script>

<style scoped>
.diamond-sec{

}
.diamond-sec h1{
    display: inline-block;
    width: 60%;
}
    .img-container{
        display: inline-block;
        float: right;
    }
    .img-container img{
        margin-top: 20px;
    }
    .img-container .line{
        margin-right: 20px;
        border-right: 2px solid #4F55C2;
        padding-right: 10px;
        font-weight: 500;
        margin-top: 50px;
        font-size: 19px;
        text-align: right;
    }
    .detail{
        width: 60%;
        margin-top: 50px;
        margin-bottom: 80px;
    }
    .form-group{
        width: 60%;
    }
    .form-control{
        height: 70px;
        font-size: 19px;
    }

    .step-sec{
        margin-top: 100px;
        margin-bottom: 70px;
    }
    .step-sec .pargraph{
        margin-bottom: 50px;
        font-size: 17px;
    }
    .head{
        font-size: 19px;
        font-weight: 600;
    }
    .step-sec h6{
        color: #4F55C2;
        margin-bottom: 30px;
        font-size: 21px;
    }


@media screen and (max-width: 576px) {
    .img-container{
        float: left;
        display: block;
        /*margin: auto;*/
        width: 100%;
        text-align: center;
        margin-bottom: 50px;
    }
    .diamond-sec h1{
        width: 100%;
        padding-top: 50px;
    }
    .detail{
        width: 100%;
    }
    .form-group{
        width: 100%;
    }

}
</style>

