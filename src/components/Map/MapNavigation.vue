<template>
   <div>
       <div id="map" style="display: none;"></div>
       <div id="geocoder" class="geocoder" placeholder="Address" @select="showValues"></div>
   </div>
</template>

<script>
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css'
    import '@mapbox/mapbox-gl-geocoder/dist/new.css'
    export default {
        name: "MapNavigation",
        data() {
            return {
                map: null,
                geocoder: null,
            }
        },
        methods: {
            showValues() {
                console.log('query',this.geocoder.inputString,'lastSelected',this.geocoder.lastSelected);
                this.$root.$emit('mapData',this.geocoder.lastSelected);
                this.$emit('mapObj',this.geocoder.lastSelected);
            }
        },
        mounted() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
            this.map =  new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                zoom: 9
            });
            console.log('maphere',this.map);
            let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
            this.geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            });
            document.getElementById("geocoder").appendChild(this.geocoder.onAdd(this.map));
            console.log('map',this.map,'geo',this.geocoder,'Map',MapboxGeocoder);
            let inputs = document.getElementsByTagName('input');
            console.log('inputs',inputs);
            inputs[4].setAttribute("placeholder","Search your address!");
        }
    }
</script>

<style scoped>
    .mapboxgl-ctrl-geocoder {
        width: 100% !important;
        font-size: 15px;
        line-height: 20px;
        max-width: 100% !important;
    }
</style>
