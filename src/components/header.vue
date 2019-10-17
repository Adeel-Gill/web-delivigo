<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <div class="container">
            <b-navbar-brand to="/"><img class="img-width" src="/images/logo.png" /></b-navbar-brand>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="ENG" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/login" activClass="active" class="singin">Sign In</b-nav-item>
                <b-nav-item to="/register" activClass="active" class="register">Register</b-nav-item>
            </b-navbar-nav>
        </div>
    </b-navbar>
</div>
</template>