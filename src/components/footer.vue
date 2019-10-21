<template>
    <div class="footer">
        <div class="container-fluid">
            <div class="footer-top"></div>
            <div class="footer-data">
                <div class="copyright">
                    <p>© DeliviGo 2017 - 2018</p>
                </div>
                <div class="quickLinks">
                    <ul>
                        <li><a href="#">Jobs</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Merchants</a></li>
                        <li><a href="#">Couriers</a></li>
                    </ul>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.footer{
    background: #0b0d0f;
}
.footer-top{
    min-height: 280px;
    border-bottom: 1px solid #3c3d3f;
}
.footer-data{
    padding: 0 35px;
}
.copyright{
    float: left;
    margin-top: 48px;
    margin-bottom: 28px;
}
.copyright p{
    font-family: Panton;
    font-weight: normal;
    font-size: 18px;
    color: #cccccc;
    line-height: 43px;
    margin: 0;
}
.quickLinks{
    float: right;
    margin-top: 48px;
    margin-bottom: 28px;
}
.quickLinks ul{
    padding: 0;
    margin: 0;
}
.quickLinks ul li{
    display: inline-block;
    padding: 0 25px 0 0;
}
.quickLinks a{
    font-family: Panton;
    font-weight: normal;
    font-size: 18px;
    color: #cccccc;
    line-height: 43px;
}

</style>