<template>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="128"></v-progress-circular>
    </v-overlay>
</template>

<script>
    import {EventBus} from "../../main";

    export default {
        name: "Loader",
        data() {
            return {
                overlay: false
            }
        },
        created() {
          EventBus.$on('StartOverlay', response => {
              this.overlay = response;
          })
        },
        updated() {
          EventBus.$on('StopOverlay', response => {
              this.overlay = response;
          })
        }
    }
</script>

<style scoped>

</style>
