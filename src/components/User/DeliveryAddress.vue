@@ -0,0 +1,15 @@
<template>
    <div class="pl-5 m-top">
        <h1 class="profile-heading">Saved Address</h1>
        <div class="col-md-8">
            <form action="" class="myProfile">
                <div class="form-group">
                    <label for="home">Full Name</label>
                    <div class="input-group">
                        <input type="text" class="form-control" value="john Doe" id="home">
                        <div class="input-group-append">
                            <i class="fa fa-pencil-alt"></i>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="office">Full Name</label>
                    <input type="text" class="form-control" value="john Doe" id="office">
                </div>
                <div class="form-group">
                    <label for="home2">Full Name</label>
                    <input type="text" class="form-control" value="john Doe" id="home2">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeliveryAddress"
    }
</script>

<style scoped>

</style>
