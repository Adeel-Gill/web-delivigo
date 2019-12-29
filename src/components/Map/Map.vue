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
                     // mapboxgl.resize();

                     // console.log( 'here'+this.geojson.geometry.coordinates);
                     // console.log('elBefore'+this.el);
                     // this.el = document.createElement('div');
                     // console.log('elAfter'+this.el);
                     // this.el.className = 'marker';
                     // console.log('elClass'+this.el.className);
                     let el = document.createElement('div');
                     el.className = 'marker';
                     console.log(el);
                     new mapboxgl.Marker()
                             .setLngLat([this.longitude, this.latitude])
                             .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                                     '<h3>' + this.name + '</h3><hr><p>'
                                     + this.address + '</p>'
                             ))
                             .addTo(this.map);
                     // this.geojson.features.forEach((marker) => {

                     //
                     //         new mapboxgl.Marker(this.el)
                     //                 .setLngLat(marker.geometry.coordinates)
                     //                 .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                     //                         '<h3>' + marker.properties.title + '</h3><p>'
                     //                         + marker.properties.description + '</p>'
                     //                 ))
                     //                 .addTo(this.map);
                     // });
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
