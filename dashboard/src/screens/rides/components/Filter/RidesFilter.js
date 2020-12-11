import React, {Component} from 'react';
import {
    withStyles,
} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {actions} from "../../../../services";
import {connect} from "react-redux";

const statuses = [
    {value: 'pending',          label: 'Pending'},
    {value: 'accepted',         label: 'Accepted'},
    {value: 'assigned',         label: 'Assigned'},
    {value: 'arriving',         label: 'On Location'},
    {value: 'in_progress',      label: 'In Progress'},
    {value: 'finished',         label: 'Finished'},
    {value: 'user_canceled',    label: 'User Canceled'},
    {value: 'driver_canceled',  label: 'Driver Canceled'},
    {value: 'company_canceled', label: 'Comp Canceled'}
];

const styles = theme => (
    {
        root: {
            backgroundColor: theme.palette.background.default,
            height: '48px',
            maxWidth: '1600px',
            marginRight: '-1px',
            borderBottom: '2px solid #e9ecf1',
            display: 'flex',
            justifyContent: 'space-between',
            '& .MuiButtonBase-root':{
                flex: 'auto',
                minWidth: '40px',
                border: '0.5px solid rgba(191,193,201,0.20)',
            },

            '& .MuiBottomNavigationAction-label':{
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontSize: '10px',
                letterSpacing: '0.33px',
                fontWeight: 700,
                lineHeight: '16px',
                color: theme.palette.text.secondary.dark,
            },
            '& .selected': {
                backgroundColor: theme.palette.background.selected,
                border: 'none',
                '& .MuiBottomNavigationAction-label':{
                    color: theme.palette.text.secondary,
                }
            },
        },
    }
);

class RidesFilter extends Component {


    updateFilter = (filters, type = 'search_options') => {
        if(type === 'search_options'){
            this.props.updateRidesFilters(filters);
        }else{
            this.props.updateRideFilters(filters);
        }
    };

    render() {
        const { classes , search_options} = this.props;
        const status = search_options.statuses;

        return (
            <BottomNavigation
                value={status}
                onChange={(event, newValue) => {
                    if (newValue === 0) {
                        this.updateFilter({'statuses': ''});
                        return;
                    }
                    newValue = newValue - 1;
                    let new_statuses = status;
                    if (status.indexOf(statuses[newValue].value) === -1) {
                        new_statuses = new_statuses + ',' + statuses[newValue].value
                    } else {
                        new_statuses = new_statuses.replace(statuses[newValue].value, '')
                    }
                    this.updateFilter({'statuses': new_statuses})
                }}
                className={classes.root}
                showLabels
            >
                <BottomNavigationAction label={'All'} className={status === '' ? 'selected' : ''}/>
                {
                    statuses.map((stat, index) => (
                        <BottomNavigationAction key={index}
                                                label={stat.label}
                                                className={status.indexOf(stat.value) !== -1 || status === '' ? 'selected' : ''}                       />
                    ))
                }
            </BottomNavigation>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateRideFilters: (filters) => dispatch(actions.RidesActions.updateRideFilters(filters)),
        updateRidesFilters: (filters) => dispatch(actions.RidesActions.updateFilters(filters)),
    }
}

function mapStateToProps(state)
{
    return {
        search_options      : state.rides.search_options,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RidesFilter));
