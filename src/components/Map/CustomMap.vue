<template>
    <div id="map"></div>
</template>

<script>
    import mapboxgl from "../../../node_modules/mapbox-gl/dist/mapbox-gl";
    import 'mapbox-gl/dist/mapbox-gl.css'
    export default {
        name: "CustomMap",
        props: ['res','cus','driver'],
        data() {
            return {
                map: null,
                longitude: '',
                latitude: '',
                geojson: {},
                restaurantData: this.res,
                customerData: this.cus,
                driverData: this.driver,
                el: null,
                name: '',
                address: '',
            }
        },
        methods: {
            initGeoJson() {
                this.geojson = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [this.customerData.longitude, this.customerData.latitude]
                            },
                            properties: {
                                title: 'Delivigo',
                                description: 'Customer'
                            }
                        },
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [this.restaurantData.longitude, this.restaurantData.latitude]
                            },
                            properties: {
                                title: 'Delivigo',
                                description: 'Restaurant'
                            }
                        },
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [this.driverData.longitude, this.driverData.latitude]
                            },
                            properties: {
                                title: 'Delivigo',
                                description: 'Driver'
                            }
                        },
                    ]
                };
            }
        },
        mounted() {
            this.initGeoJson();
            mapboxgl.accessToken = 'pk.eyJ1IjoiYXFpYmphdmVkMSIsImEiOiJjazRtZ3Z5YXUwNG9vM21wNTRoODFicnZtIn0.UjSkEQkYpVOmS0QUYpXoHg';
            this.map =  new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.customerData.longitude, this.customerData.latitude],
                zoom: 9
            });
            this.map.on('load', () => {
                let el = document.createElement('div');
                el.className = 'marker';
                console.log(el);
                console.log(this.customerData,this.restaurantData,this.driverData);
                // new mapboxgl.featureLayer().setGeoJSON(this.geojson).addTo(this.map);
                var marker1 = new mapboxgl.Marker()
                        .setLngLat([this.customerData.longitude, this.customerData.latitude])
                        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                                '<h3>' + 'Customer' + '</h3><hr><p>'
                                + 'Delivigo' + '</p>'
                        ))
                        .addTo(this.map);
                var marker2 = new mapboxgl.Marker()
                        .setLngLat([this.restaurantData.longitude, this.restaurantData.latitude])
                        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                                '<h3>' + 'Restaurant' + '</h3><hr><p>'
                                + 'Delivigo' + '</p>'
                        ))
                        .addTo(this.map);
                var marker3 = new mapboxgl.Marker()
                        .setLngLat([this.driverData.longitude, this.driverData.latitude])
                        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
                                '<h3>' + 'Driver' + '</h3><hr><p>'
                                + 'Delivigo' + '</p>'
                        ))
                        .addTo(this.map);
            });
        }
    }
</script>

<style scoped>
    #map{
        height: 648px;
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
