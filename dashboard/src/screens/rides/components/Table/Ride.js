import React from 'react';
import {
    TableCell,
    TableRow,
    Icon,
} from '@material-ui/core';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import {makeStyles} from '@material-ui/styles';
import { withTranslation } from 'react-i18next';

const before_icon = {
    content: 'close-quote',
    position: 'absolute',
    width: '20px',
    height: '20px',
    top: '1px',
    left: '1px',
    borderRadius: '50%',
    zIndex: -1
};

const useStyles = makeStyles(theme => ({
    pending: {
        backgroundColor: theme.palette.status.pending,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.pending,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.pending+' !important'
        }
    },
    assigned: {
        backgroundColor: theme.palette.status.assigned,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.assigned
        },
        '&:hover': {
            backgroundColor: theme.palette.status.assigned+' !important'
        }
    },
    in_progress:{
        backgroundColor: theme.palette.status.in_progress,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.in_progress,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.in_progress+' !important'
        }
    },
    finished:{
        backgroundColor: theme.palette.status.finished,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.finished,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.finished+' !important'
        }
    },
    accepted: {
        backgroundColor: theme.palette.status.accepted,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.accepted,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.accepted+' !important'
        }
    },
    arriving: {
        backgroundColor: theme.palette.status.arriving,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.arriving,
        },
        ':hover': {
            backgroundColor: theme.palette.status.arriving
        }
    },
    driver_canceled: {
        backgroundColor: theme.palette.status.driver_canceled,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.driver_canceled,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.driver_canceled+' !important'
        }
    },
    user_canceled: {
        backgroundColor: theme.palette.status.user_canceled,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.user_canceled,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.user_canceled+' !important'
        }
    },
    company_canceled: {
        backgroundColor: theme.palette.status.company_canceled,
        '&.Mui-selected': {
            backgroundColor: theme.palette.status.company_canceled,
        },
        '&:hover': {
            backgroundColor: theme.palette.status.company_canceled+' !important'
        }
    },
    status_icon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: '10px',
        '& .wav': {
            color: theme.palette.icon_color.wav,
        },
        '& .pending': {
            color: theme.palette.icon_color.pending,
        },
        '& .assigned': {
            color: theme.palette.icon_color.assigned,
        },
        '& .driver-canceled': {
            transform: 'rotate(90deg)',
            color: theme.palette.icon_color.driver_canceled,
        },
        '& .user-canceled': {
            transform: 'rotate(90deg)',
            color: theme.palette.icon_color.user_canceled,
        },
        '& .company-canceled': {
            transform: 'rotate(90deg)',
            color: theme.palette.icon_color.company_canceled,
        },
        '& .finished': {
            color: theme.palette.icon_color.finished,
        },
        '& .dropoff': {
            color: '#fff',
            position: 'relative',
            fontSize: '22px',
            zIndex: 1,
        },
        '& .dropoff:before': {
            ...before_icon,
            background: theme.palette.icon_color.dropoff,
        },
        '& .pickup': {
            color: '#fff',
            position: 'relative',
            fontSize: '22px',
            zIndex: 1,
        },
        '& .pickup:before': {
            ...before_icon,
            background: theme.palette.icon_color.pickup,
        },
        '& .arriving': {
            color: '#fff',
            position: 'relative',
            fontSize: '22px',
            zIndex: 1,
        },
        '& .arriving:before': {
            ...before_icon,
            background: theme.palette.icon_color.arriving,

        },
        '& .accepted': {
            color: '#FFFFFF',
            position: 'relative',
            fontSize: '22px',
            zIndex: 1,
        },
        '& .accepted:before': {
            ...before_icon,
            background: theme.palette.icon_color.accepted,
        },
        '& .alert': {
            color: 'red',
            position: 'relative',
            fontSize: '22px',
            zIndex: 1,
        },
        '& .alert:before': {
            ...before_icon,
            background: '#FFFFFF'
        },
    }
}));

const Ride = (props) => {
    const classes = useStyles(props);

    let ride_eta = null;
    if(props.ride.status === 'assigned' || props.ride.status === 'accepted' || props.ride.status === 'arriving' || props.ride.status === 'in_progress'){
        if(props.ride.eta) {
            ride_eta = <p>{props.ride.eta.toFixed(0)} min</p>
        }
    }

    const alertIcon = () => {
        if(props.ride.status !== 'accepted'){
            return;
        }
        if(props.ride.eta <= 5){
            return;
        }
        let pickup_at = moment(props.ride.pickup_at);
        let arrival_time = moment().add(props.ride.eta, 'seconds');
        if(arrival_time < pickup_at){
            return;
        }
        let difference = arrival_time.diff(pickup_at, 'seconds');
        if(difference < 10){
            return;
        }

        return (
            <Icon className='alert'>watch_later</Icon>
        )
    };

    return (
            <TableRow
                hover
                selected={props.isSelected}
                onClick={() => props.handleClickRide(props.ride)}
                tabIndex={-1}
                className={classes[props.ride.status]}
            >
                <TableCell align='left' className={'name'}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <p className='name'>{props.ride.first_name} {props.ride.last_name}</p>
                        {props.ride.confirmed === 1? <Icon style={{fontSize: 20}}>done</Icon> : null}
                    </div>
                </TableCell>
                <TableCell align='left' className={'address'}>
                    <p>{props.ride.start_address.substr(0, 20)}</p>
                    <p><Moment format={'M/D h:mm A'}>{props.ride.pickup_at}</Moment></p>
                </TableCell>
                <TableCell align='left' className={'address'}>
                    <p>{props.ride.destination_address.substr(0, 20)}</p>
                    <p><Moment format={'M/D h:mm A'}>{props.ride.dropoff_at}</Moment></p>
                </TableCell>
                <TableCell align='right' className={'action'}>{ride_eta}</TableCell>
                <TableCell align='right' className={'status'}>
                    <div className={'container'}>
                        <div className='time'>
                            <p className='subtitle'>
                                {props.ride.status === 'driver_canceled' && <span>{props.ride.driver_first_name} {props.ride.driver_last_name}</span> }
                                {props.ride.status !== 'driver_canceled' && <span>{props.t('rides.statuses.'+props.ride.status)}</span> }
                                {props.ride.status === 'accepted' && <span  className='accepted'><Moment format={'h:mm a'}>{props.ride.pickup_at}</Moment></span>}
                            </p>
                        </div>

                        <div className={classes.status_icon}>
                            {alertIcon()}
                            {props.ride.ride_type.indexOf('wav') !== -1 && <Icon className='wav'>accessible</Icon>}
                            {props.ride.status === 'pending' && <Icon className='pending'>watch_later</Icon>}
                            {props.ride.status === 'assigned' && <Icon className='assigned'>watch_later</Icon>}
                            {props.ride.status === 'accepted' && <Icon className='accepted'>keyboard_arrow_up</Icon>}
                            {props.ride.status === 'pickup' && <Icon className='pickup'>keyboard_arrow_up</Icon>}
                            {props.ride.status === 'arriving' && <Icon className='arriving'>keyboard_arrow_up</Icon>}
                            {props.ride.status === 'in_progress' && <Icon className='dropoff'>keyboard_arrow_down</Icon>}
                            {props.ride.status === 'driver_canceled' && <Icon className='driver-canceled'>not_interested</Icon>}
                            {props.ride.status === 'finished' && <Icon className='finished'>check_circle</Icon>}
                            {props.ride.status === 'user_canceled' && <Icon className='user-canceled'>not_interested</Icon>}
                            {props.ride.status === 'company_canceled' && <Icon className='company-canceled'>not_interested</Icon>}
                        </div>
                    </div>
                </TableCell>
            </TableRow>
    );
};


export default withTranslation()(React.memo(Ride));
