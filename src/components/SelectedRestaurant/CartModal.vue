<template>
    <div>
        <vue-drawer-layout
                ref="drawer"
                drawer-position="right"
                reverse="true"
                drawer-width="100"
                drawer-height="100"
                @mask-click="handleMaskClick">
            <div class="drawer" slot="drawer">
                <div @click = "handleToggleDrawer" style="margin-top: 60px; margin-right: 50px" >
                    <fab
                            style="margin-top: 60px; margin-right: 50px"
                            position="top-right"
                            position-type="absolute"
                            ripple-show="true"
                            ripple-color="dark"
                            bg-color="#8ba939"
                            main-tooltip="Cart"
                            main-icon="shopping_cart"
                            enable-rotation="false"
                    ></fab>
                    <router-link to="/checkout"><button btn btn-submit>Proceed to checkout</button></router-link>
                </div>
                <div class="text"  style=" margin-top: 50px">

                </div>
            </div>
        </vue-drawer-layout>
    </div>
</template>

<script>
    import fab from 'vue-fab'
    export default {
        name: "CartModal",
        component: {
            fab
        },
        methods: {
            handleToggleDrawer() {
                console.log('insideToggle',this.$refs.drawer);
                this.$refs.drawer.toggle();
            },
            handleMaskClick() {
                console.info('mask-click');
                this.$refs.drawer.toggle(false);
            },
        }
    }
</script>

<style scoped>

</style>
