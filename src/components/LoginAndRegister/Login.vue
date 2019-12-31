<template>
    <div class="pl-5 m-top">
        <div class="row">
            <form action="" class="myProfile">
                <div class="form-group">
                    <label for="email">EMAIL ADDRESS</label>
                    <input type="email" class="form-control" placeholder="abc@mail.com" :disabled = "validated" id="email">
                </div>
                <div class="form-group">
                    <label for="npwd">PASSWORD</label>
                    <input type="password" class="form-control" placeholder="Password Here...!" :disabled = "validated" id="npwd">
                </div>
                <div class="button">
                    <button type="submit" class="btn btn-submit">SIGN IN</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
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
        margin-top: 30px;
    }
    .myProfile input{
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        padding-left: 0;
        width: 400px;
        border-radius: 0;
        color: #999999;
        font-size: 16px;
        background:none;
    }
    .myProfile input:focus{
        border-bottom: 1px solid #5860ff;
    }
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
    .form-control:focus{
        box-shadow: none;
        -webkit-box-shadow: none;
    }
    .edit-btn i{
        margin-left:20px ;
        font-size: 25px;
        color: #9c9c9c;
    }
    .edit-btn i:hover{
        color: #5860ff;
    }
</style>
