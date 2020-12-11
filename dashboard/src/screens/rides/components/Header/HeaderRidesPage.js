import React, {Component} from 'react';
import {FormControlLabel, Checkbox, LinearProgress} from '@material-ui/core'
import {actions} from "../../../../services";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import VerticalBorder from "../../../../components/Border/VerticalBorder";
import Search from "../Search/Search";
import Button from '@material-ui/core/Button';

class HeaderRidesPage extends Component {

    update = (event) => {
        this.props.updateRidesFilters({
            [event.target.name]: event.target.value
        })
    };

    updateFilter = (filters) => {
        this.props.updateRidesFilters(filters);
    };

    render() {
        const props = this.props;

        return (
            <div>
                {props.processing && <LinearProgress className={'linear-progress'}/>}
                <div className='panel'>
                    <Search updateFilters={this.updateFilter}
                            search_value={props.search_options.search}
                            page={props.search_options.page}
                    />

                    <VerticalBorder />
                    <Button variant="contained" color="primary" style={{marginRight: 15, marginLeft: 5}} onClick={_ => this.updateFilter({'statuses': 'draft,pending,assigned,accepted,arriving,in_progress'})}>
                        Active rides
                    </Button>

                    <VerticalBorder />

                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={_ => this.updateFilter({'all_rides': !props.search_options.all_rides})}
                                checked={props.search_options.all_rides}
                                color='primary'
                            />
                        }
                        label='All Rides'
                    />
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateRidesFilters: (filters) => dispatch(actions.RidesActions.updateFilters(filters)),
        updateRideFilters: (filters) => dispatch(actions.RidesActions.updateRideFilters(filters)),
    }
}

function mapStateToProps(state)
{
    return {
        search_options      : state.rides.search_options,
        processing          : state.rides.processing
    }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(HeaderRidesPage));
