<template>
        <div id="map"></div>
</template>

<script>
    import mapboxgl from "../../../node_modules/mapbox-gl/dist/mapbox-gl";
    export default {
        name: "Map",
        data() {
          return {
              map: null,
              longitude: '',
              latitude: ''
          }
        },
        mounted() {
            this.longitude = this.$route.query.long;
            this.latitude = this.$route.query.lat;
            console.log(this.longitude+' '+this.latitude);
            mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
             this.map =  new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                 center: [this.longitude, this.latitude],
                 zoom: 10
            });
            // this.map.on('load', () => {
            //     this.map.addLayer({
            //         id: 'points',
            //         source: 'pointsSource',
            //         type: 'circle'
            //     });
            //     this.map.addSource('pointsSource', {
            //         type: 'geojson',
            //         data: {
            //             'type': 'FeatureCollection',
            //             'features': [
            //                 {
            //                     'type': 'features',
            //                     'properties': {},
            //                     'geometry': {
            //                         'type': 'Point',
            //                         'coordinates': [
            //                             37.7510,
            //                             -97.8220
            //                         ]
            //                     }
            //                 }
            //             ]
            //         }
            //     })
            // })

        }
    }
</script>

<style scoped>

</style>
