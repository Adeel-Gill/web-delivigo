<template>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <h1>Sign in</h1>
                    <hr>
                    <div class="form-group">
                        <label for="mail">Email</label>
                        <input
                            type="text"
                            id="mail"
                            class="form-control"
                            v-model="userData.mail">
                    </div>
                    <div class="form-group">
                        <label for="pass">Password</label>
                        <input
                            type="password"
                            id="pass"
                            class="form-control"
                            v-model="userData.pass">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <div class="form-group">
                        <label for="stayLoggedIn" style="margin-right: 5px"></label>
                        <input
                            type="checkbox"
                            id="stayLoggedIn"
                            value="userData.login"
                            checked="userData.login"
                            v-model="userData.stayLoggedIn"> Remember Me!
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button
                            class="btn btn-primary"
                            @click.prevent = "submitted">Submit!
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userData: {
                    mail: '',
                    pass: '',
                    login: true,
                    stayLoggedIn: true,
                }
            }
        },
        methods: {
            submitted() {
                alert(this.userData.mail + " " + this.userData.pass)
            }
        }
    }
</script>

<style>

</style>
