import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as mapboxgl from 'mapbox-gl';
import {actions} from "../../../../services";
import {MAPBOX_TOKEN} from "../../../../config";

const styles = {
    map: {
        flex: 1,
        height: '100%'
    }
};

class RidesMap extends Component {

    driver_markers = [];

    componentDidMount() {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        this.map = new mapboxgl.Map({
            container: document.getElementById('rides-map'),
            style: 'mapbox://styles/lacustech/cj8ej2qjha5942qpbaojqr6q1?optimize=true',
            center: [-73.935242, 40.730610], // starting position
            zoom: 10,
            pitch: 0,
            bearing: 0
        });

        this.map.on('load', () => {
            this.map.addControl(new mapboxgl.NavigationControl());

            this.map.addSource('ride-route-source', {
                'type': 'geojson',
                'lineMetrics': true,
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                    }
                }
            });

            this.map.addLayer({
                'id': 'ride-route',
                'type': 'line',
                'source': 'ride-route-source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 3,
                    'line-color': '#3c7eff',

                    'line-gradient': [
                        'interpolate',
                        ['linear'],
                        ['line-progress'],
                        0, 'rgba(60, 126, 255, 1)',
                        0.5, 'rgba(60, 126, 255, 0.5)',
                        1, 'rgba(60, 126, 255, 0.1)'
                    ]
                }
            });

            this.map.loadImage('assets/map/pin/pickup.png', (error, image) => {
                this.map.addImage('pickup-marker', image);
            });
            this.map.loadImage('assets/map/pin/dropoff.png', (error, image) => {
                this.map.addImage('dropoff-marker', image);
            });
            this.map.loadImage('assets/map/cars/suv.png', (error, image) => {
                this.map.addImage('car-regular', image);
            });
            this.map.loadImage('assets/map/cars/wav.png', (error, image) => {
                this.map.addImage('car-wav', image);
            });
            this.map.loadImage('assets/map/cars/standard.png', (error, image) => {
                this.map.addImage('car-marker', image);
            });

            this.map.addSource('available_drivers', {
                type: 'geojson',
                data: {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });
            this.map.addLayer({
                'id': 'available_drivers',
                'source': 'available_drivers',
                'type': 'symbol',
                'layout': {
                    'icon-image': {'type': 'identity', 'property': 'image'},
                    'icon-size': 0.4,
                    'icon-padding': 1,
                    'icon-allow-overlap': true,
                    'icon-rotate': {'type': 'identity', 'property': 'heading'},

                    "text-font": ["Lato Black"],
                    "text-padding": 20,
                    "text-anchor": "top",
                    "text-offset": [0, -2],
                    "text-size": 17,
                    "text-allow-overlap": true,
                    'text-field': {'type': 'identity', 'property': 'title'},
                    "text-justify": "center",
                    "icon-offset": [0, -22],
                    "text-letter-spacing": 0.15
                },
                "paint": {
                    "text-color": "#000000",
                    "text-halo-color": "#fff",
                    "text-halo-width": 2

                }
            });

            // PICKUP
            this.map.addSource('pickup-marker', {
                'type': 'geojson',
                'data': {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: []
                    }
                }
            });
            this.map.addLayer({
                'id': `pickup-marker`,
                'type': 'symbol',
                'source': 'pickup-marker',
                'layout': {
                    'icon-image': 'pickup-marker',
                    'icon-size': 0.4,
                    'icon-padding': 1,
                    'icon-allow-overlap': true
                }
            });

            // DROPOFF
            this.map.addSource('dropoff-marker', {
                'type': 'geojson',
                'data': {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: []
                    }
                }
            });
            this.map.addLayer({
                'id': 'dropoff-marker',
                'type': 'symbol',
                'source': 'dropoff-marker',
                'layout': {
                    'icon-image': 'dropoff-marker',
                    'icon-size': 0.4,
                    'icon-padding': 1,
                    'icon-allow-overlap': true,
                }
            });
        });
    }

    componentDidUpdate(prevProps) {
        if( (this.props.ride && prevProps.ride === null) || (this.props.ride && this.props.ride.id !== prevProps.ride.id)){
            this.center();
            this.renderPickupMarker();
            this.renderDropoffMarker();
            this.addRoute(this.props.location_states);
            this.eta();
        }
        if(this.props.drivers && prevProps.drivers !== this.props.drivers) {
            this.initCars();
        }
        if(this.map.getLayer('current-location-marker')){
            this.map.removeLayer('current-location-marker')
        }
        if(this.props.driver_location !== prevProps.driver_location) {
            if(this.props.ride.driver !== null) {
                this.renderCarMarker();
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return  nextProps.ride !== this.props.ride ||
            nextProps.drivers !== this.props.drivers ||
            nextProps.driver_location !== this.props.driver_location ||
            nextProps.location_states !== this.props.location_states;
    }

    renderCarMarker = () => {
        let driver_location = this.props.driver_location;
        let data = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [driver_location.lon, driver_location.lat]
            },
            properties: {
                heading: driver_location.heading
            }
        };
        if(this.map.getSource('current-location') === undefined){
            this.map.addSource('current-location', {
                'type': 'geojson',
                'data': data
            });
        }else{
            this.map.getSource('current-location').setData(data);
        }

        if(this.map.getLayer('current-location-marker') === undefined){
            this.map.addLayer({
                'id': 'current-location-marker',
                'source': 'current-location',
                'type': 'symbol',
                'layout': {
                    'icon-image': 'car-marker',
                    'icon-size': 0.4,
                    'icon-padding': 1,
                    'icon-allow-overlap': true,
                    'icon-rotate': {'type': 'identity', 'property': 'heading'}
                },
            });
        }
    };

    renderPickupMarker = () => {
        const {start_lon, start_lat} = this.props.ride;
        let source = this.map.getSource('pickup-marker');
        if(source !== undefined){
            source.setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [start_lon, start_lat]
                }
            })
        }
    };

    renderDropoffMarker = () => {
        const {destination_lon, destination_lat} = this.props.ride;
        let source = this.map.getSource('dropoff-marker');
        if(source !== undefined){
            source.setData({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [destination_lon, destination_lat]
                }
            })
        }
    };

    addRoute = (location_states) => {
        if(!location_states){
            return;
        }
        let latLngs = [];
        for(let i = 0; i < location_states.length; i++) {
            latLngs.push([location_states[i].longitude, location_states[i].latitude]);
        }

        this.map.getSource('ride-route-source').setData({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': latLngs
            }
        });
    };

    initCars() {
        let drivers = this.props.drivers;
        let ride = this.props.ride;

        for(let i = 0; i < this.driver_markers.length; i++){
            this.driver_markers[i].remove();
        }

        let drivers_data = [];

        if(ride !== null && ['pending', 'assigned', 'accepted'].indexOf(ride.status) !== -1) {
            drivers.map((driver) => (
                drivers_data.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [driver.lon, driver.lat]
                    },

                    properties: {
                        heading : driver.heading,
                        image   : driver.wav ? 'car-wav' : 'car-regular'
                    }
                })
            ));
        }

        let available_drivers = this.map.getSource('available_drivers');
        if (available_drivers) {
            available_drivers.setData({
                'type': 'FeatureCollection',
                'features': drivers_data
            });
        }
    }

    center = () => {
        let coordinates = [
            [this.props.ride.start_lon, this.props.ride.start_lat],
            [this.props.ride.destination_lon, this.props.ride.destination_lat]
        ];
        if(this.props.ride.driver) {
            coordinates.push([this.props.ride.driver.lon, this.props.ride.driver.lat]);
        }

        this.map.fitBounds(coordinates, {
            padding: {
                top: 100,
                left: 100,
                right: 100,
                bottom: 100
            },
            maxZoom: 12
        })
    };

    eta = () => {
        this.props.eta(this.props.ride.ride_type.id, this.props.ride.start_lat, this.props.ride.start_lon);
    };

    render() {
        return (
            <div id='rides-map' style={styles.map} />
        )
    }
}

function mapStateToProps(state)
{
    return {
        company          : state.app.company,
        ride             : state.rides.ride,
        drivers          : state.rides.eta.drivers,
        location_states  : state.rides.location_states,
        driver_location  : state.rides.driver_location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        eta: (ride_type_id, lat, lon) => dispatch(actions.RidesActions.eta(ride_type_id, lat, lon))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RidesMap);
