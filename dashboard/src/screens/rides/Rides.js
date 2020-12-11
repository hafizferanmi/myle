import React, {PureComponent} from 'react';
import {actions} from '../../services';
import {connect} from 'react-redux';
import HeaderRidesPage from "./components/Header/HeaderRidesPage";
import RidesMap from './components/Map/RidesMap';
import RidesTable from './components/Table/RidesTable';
import RideInfo from './components/RideInfo';
import moment from 'moment-timezone';
import {FILTERS_STORAGE_KEY, RIDE_OPTIONS_STORAGE_KEY} from "../../services/rides/actions";

import './rides.scss';
import RidesFilter from "./components/Filter/RidesFilter";


class Rides extends PureComponent {
    state = {
        mapCreateRide: true,
    };
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        let search = '';
        let time = {
            from_datetime : moment.utc().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            to_datetime   : moment.utc().add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        };
        let statuses = {};
        for ( let param of query.entries() ) {
            if (param[0] === 'search') {
                search = param[1];
            }
            if (param[0] === 'time_range' && param[1] === 'all'){
                time = {
                    from_datetime : '',
                    to_datetime   : '',
                    range: 0
                };
            }
            if (param[0] === 'statuses' && param[1] === 'all'){
                statuses = {
                    statuses: ''
                };
            }
        }

        let storage_filters = JSON.parse(localStorage.getItem(FILTERS_STORAGE_KEY));

        this.props.updateRidesFilters({
            ...storage_filters,
            search: search,
            ...statuses,
            ...time,
        }).then(() => {
            this.props.getRides();
        });
        let ride_options = JSON.parse(localStorage.getItem(RIDE_OPTIONS_STORAGE_KEY));
        this.props.updateRideFilters({
            ...ride_options,
        });


    }

    onRideView = (ride) => {
        this.props.retrieveRide(ride);
        this.setState({
            mapCreateRide: false
        })
    };

    render() {

        return (
            <div className='rides-container'>
                <HeaderRidesPage />
                <RidesFilter />
                <div className='wrapper'>
                    <RidesTable onRideView={this.onRideView} />
                    <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'relative'}}>
                       <RideInfo />
                       <RidesMap aciveMap={!this.state.mapCreateRide}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getRides: () => dispatch(actions.RidesActions.getRides()),
        retrieveRide: (ride) => dispatch(actions.RidesActions.retrieveRide(ride)),
        updateRidesFilters: (filters) => dispatch(actions.RidesActions.updateFilters(filters)),
        updateRideFilters: (filters) => dispatch(actions.RidesActions.updateRideFilters(filters))
    }
}

export default connect(null, mapDispatchToProps)(Rides);
