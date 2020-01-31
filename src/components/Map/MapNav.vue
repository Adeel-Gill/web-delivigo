<template>
    <div>
        <div id="map"></div>
        <div id="geocoder" class="geocoder" placeholder="Address" @select="showValues"></div>
    </div>
</template>

<script>
    import mapboxgl from "mapbox-gl/dist/mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css'
    import '@mapbox/mapbox-gl-geocoder/dist/new.css'
    export default {
        name: "MapNav",
        props: ['mapData'],
        data() {
            return {
                map: null,
                geocoder: null,
                mapDetail: this.mapData
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
            // let inputs = document.getElementsByTagName('input');
            // console.log('inputs',inputs);
            // inputs[4].setAttribute("placeholder","Search your address!");
        }
    }
</script>

<style scoped>
    .marker {
        background-image: url('../../../public/images/mapbox-icon.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
    .mapboxgl-popup {
        max-width: 200px;
    }
    .mapboxgl-marker {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border:1px solid gray;
        background-color:lightblue;
    }
    .mapboxgl-popup-content {
        text-align: center;
        font-family: 'Open Sans', sans-serif;
    }
</style>
