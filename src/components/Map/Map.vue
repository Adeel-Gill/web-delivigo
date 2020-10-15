<template>
        <div id="map"></div>
</template>

<script>
    import mapboxgl from "../../../node_modules/mapbox-gl/dist/mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css'
    export default {
        name: "Map",
        data() {
          return {
              map: null,
              longitude: '',
              latitude: '',
              geojson: {},
              el: null,
              name: '',
              address: '',
          }
        },
            methods: {
                initGeoJson() {
                        this.geojson = {
                                type: 'FeatureCollection',
                                features: [{
                                        type: 'Feature',
                                        geometry: {
                                                type: 'Point',
                                                coordinates: [this.longitude, this.latitude]
                                        },
                                        properties: {
                                                title: 'Delivigo',
                                                description: 'Restaurant Name'
                                        }
                                }]
                        };
                }
            },
        mounted() {

            this.longitude = this.$route.query.long;
            this.latitude = this.$route.query.lat;
            this.name = this.$route.query.name;
            this.address = this.$route.query.resaddress;
            console.log(this.longitude+' '+this.latitude + ' '+ this.name+ ' '+ this.address);
            this.initGeoJson();
            mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
             this.map =  new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                     center: [this.longitude, this.latitude],
                 zoom: 9
            });
             this.map.on('load', () => {
                    let el = document.createElement('div');
                //     switch()
                     el.className = 'marker';
                     console.log(el);
                     new mapboxgl.Marker()
                             .setLngLat([this.longitude, this.latitude])
                             .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                                     '<h3>' + this.name + '</h3><hr><p>'
                                     + this.address + '</p>'
                             ))
                             .addTo(this.map);
             });
        }
    }
</script>

<style scoped>
#map{
        height: 900px;
}
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
