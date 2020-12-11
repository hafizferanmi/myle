import React, {PureComponent} from 'react';
import Moment from 'moment-timezone';
import {TextField, Icon, IconButton, FormControlLabel, Checkbox, InputAdornment, Tooltip, withStyles} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import '../rides.scss';
import CanceledDialog from '../dialog/cancel/CanceledDialog';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {actions} from '../../../services';
import * as FuseActions from "../../../services/fuse/actions";
import ContainerDialog from "../dialog/ContainerDialog";
import PreviewRide from "../../rides/dialog/preview/PreviewRide";
import ifvisible from "ifvisible.js";
import moment from 'moment-timezone';
import ReviveDialog from "../dialog/revive/ReviveDialog";
import Skeleton from 'react-loading-skeleton';


const status_container = {
    display: 'flex',
    padding: '5px 15px',
    height: '44px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .reference_id': {
        fontSize: '17px',
        color: 'rgba(0,0,0,0.60)',
        letterSpacing: '0.25px',
        lineHeight: '16px',
    },
    '& .status': {
        fontSize: '10px',
        letterSpacing: '0.33px',
        lineHeight: '12px',
        textTransform: 'uppercase'
    }
};

const styles = theme =>  ({
    draft: {
        ...status_container,
        backgroundColor: theme.palette.status.draft,
        '& .status': {
            color: theme.palette.status.color.draft,
        }
    },
    pending: {
        ...status_container,
        backgroundColor: theme.palette.status.pending,
        '& .status': {
            color: theme.palette.status.color.pending,
        }
    },
    assigned: {
        ...status_container,
        backgroundColor: theme.palette.status.assigned,
        '& .status': {
            color: theme.palette.status.color.assigned,
        }
    },
    in_progress:{
        ...status_container,
        backgroundColor: theme.palette.status.in_progress,
        '& .status': {
            color: theme.palette.status.color.in_progress,
        }
    },
    finished:{
        ...status_container,
        backgroundColor: theme.palette.status.finished,
        '& .status': {
            color: theme.palette.status.color.finished,
        }
    },
    accepted: {
        ...status_container,
        backgroundColor: theme.palette.status.accepted,
        '& .status': {
            color: theme.palette.status.color.accepted,
        }
    },
    arriving: {
        ...status_container,
        backgroundColor: theme.palette.status.arriving,
        '& .status': {
            color: theme.palette.status.color.arriving,
        }
    },
    driver_canceled: {
        ...status_container,
        backgroundColor: theme.palette.status.driver_canceled,
        '& .status': {
            color: theme.palette.status.color.driver_canceled,
        }
    },
    user_canceled: {
        ...status_container,
        backgroundColor: theme.palette.status.user_canceled,
        '& .status': {
            color: theme.palette.status.color.user_canceled,
        }
    },
    company_canceled: {
        ...status_container,
        backgroundColor: theme.palette.status.company_canceled,
        '& .status': {
            color: theme.palette.status.color.company_canceled,
        }
    },
    passenger: {
        padding: '15px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
    },
    confirmed: {
        '& .MuiButtonBase-root': {
            height: '36px',
            width: '36px',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '16px',
            color: 'rgba(0,0,0,0.54)',
            marginBottom: '3px',
        },
        '& .MuiTypography-root': {
            fontSize: '16px',
            color: 'rgba(0,0,0,0.60)',
            letterSpacing: '0.33px',
            lineHeight: '16px',
        }
    },
    passanger_icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px',
        width: '48px',
        background: '#F5F6FB',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '50%',
        fontSize: '12px',
        color: 'rgba(0,0,0,0.30)',
        letterSpacing: '0.4px',
        lineHeight: '16px',
    },
    edit_btn: {
        height: '32px',
        width: '32px',
        border: '1px solid #E9E9E9',
        '& .MuiIcon-root': {
            fontSize: '18px'
        }
    },
    passanger_name_container: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingRight: 70,
        '& .filter-list-btn': {
            position: 'absolute',
            right: 0,
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            '& .MuiButtonBase-root': {
                height: '32px',
                width: '32px',
                border: '1px solid #E9E9E9',
                '& .MuiIcon-root': {
                    fontSize: '18px'
                }
            }
        }
    },
    passanger_name: {
        fontSize: '16px',
        fontWeight: 700,
        color: 'rgba(0,0,0,0.87)',
        letterSpacing: '0.25px',
        lineHeight: '28px',
        textAlign: 'center',
        margin: '10px auto 5px'
    },
    passanger_phone: {
        display: 'flex',
        justifyContent: 'center',
        '& .MuiIcon-root': {
            fontSize: '14px',
            color: '#000000',
            margin: '2px 5px 0 0',
        },
    },
    driver_container: {
        display: 'flex',
        padding: '15px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        '& .photo': {
            width: '32px',
            height: '30px',
            borderRadius: '50%',
            overflow: 'hidden',
            margin: 'auto 0',
            marginRight: '15px',
        },
        '& .driver-name': {
            fontSize: '12px',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.87)',
            letterSpacing: '0.25px',
            lineHeight: '16px',
        },
        '& .driver-phone': {
            display: 'flex',

            '& .MuiIcon-root': {
                fontSize: '14px',
                color: '#000000',
                margin: '2px 5px 0 0',
            },
        },
    },
    car_container: {
        display: 'flex',
        padding: '15px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        '& .car-icon': {
            margin: 'auto 0',
            marginRight: '15px',
            '& img': {
                width: '32px',
                height: 'auto',
            }
        },
        '& .plate-number': {
            fontSize: '12px',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.87)',
            letterSpacing: '0.25px',
            lineHeight: '16px',
        },
        '& .car-title': {
            fontSize: '12px',
            color: 'rgba(0,0,0,0.60)',
            letterSpacing: '0.25px',
            lineHeight: '16px',
        }
    },
    destinations: {
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        '& .time': {
            fontSize: '16px',
            fontWeight: 700,
            color: 'rgba(0,0,0,0.87)',
            letterSpacing: '0.25px',
            lineHeight: '16px',
            marginBottom: '4px',
        },
        '& .address': {
            fontSize: '16px',
            color: 'rgba(0,0,0,0.60)',
            letterSpacing: '0.25px',
            lineHeight: '16px',
            marginBottom: '16px',
        },
        '& .pool': {
            fontSize: '16px',
            color: 'rgba(0,0,0,0.60)',
            letterSpacing: '0.4px',
            lineHeight: '16px',
            marginBottom: '16px',

        }
    },

    textFieldNote: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '0 0 4px 4px',
            '& .MuiInputBase-input': {
                fontSize: '14px',
                padding: '17.9px 14px'
            }
        },
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderTopWidth: 'inherit'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderTopWidth: 'inherit'
        }
    },

    buttons_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '15px',
        marginTop: '15px',
        marginBottom: '30px',
        '& .not-interested': {
            color: '#EF5350',
        },
        '& button': {
            boxShadow: '0px 0px 10px -4px rgba(0,0,0,0.3)'
        }
    }

});

class RideInfo extends PureComponent {

    refresh_interval = null;

    constructor(props) {
        super(props);
        this.state = {
            note: '',
            focused: false,
        };
        this.handleChange   = this._handleChange.bind(this);
        this.handleBlur     = this._handleBlur.bind(this);

        this.handleOpenCanceledDialog  = this._handleOpenCanceledDialog.bind(this);
        this.handleSendPreviewRideDialog = this._handleSendPreviewRideDialog.bind(this);
        this.call                      = this._call.bind(this);
        this.updateRide                = this._updateRide.bind(this);
        this.secondsToDatetime         = this._secondsToDatetime.bind(this);
    }

    componentDidMount() {
        let active = true;
        ifvisible.setIdleDuration(180);
        ifvisible.on("idle", function(){
            active = false;
        });
        ifvisible.on("wakeup", function(){
            active = true;
        });

        this.refresh_interval = setInterval(() => {
            if(this.props.ride && active && this.props.ride.driver !== null) {
                this.props.retrieveRideLocation(this.props.ride.id);
            }
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.refresh_interval);
    }

    _handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    _handleBlur() {
        this.setState({ focused: false });
    }

    showSearch = () => {
        this.setState({ focused: true });
        document.addEventListener('keydown', this.enterFunction, false);
    };

    enterFunction = (event) => {
        if ( this.state.note !== '' && event.keyCode === 13  && this.state.focused ) {
            this.props.updateRide(this.props.ride.id, {
                status : 'note',
                note   : this.state.note
            });
            document.querySelector('#note').blur();
            this.setState({
                focused: false,
                note: ''
            });
            event.preventDefault();
        }
    };

    addNote = () => {
        if(this.state.note !== ''){
            this.props.updateRide(this.props.ride.id, {
                status : 'note',
                note   : this.state.note
            });
            document.querySelector('#note').blur();
            this.setState({
                focused: false,
                note: ''
            });
        }
    };

    _call(phone_number) {
        document.location.href="tel:"+phone_number;
    }

    _handleOpenCanceledDialog() {
        this.props.dispatch(FuseActions.openDialog({
            children: <CanceledDialog ride_id={this.props.ride.id}/>
        }));
    }

    _secondsToDatetime(d) {
        if(d){
            let sec_num = parseInt(d, 10);

            let hours   = Math.floor(sec_num / 3600);
            let minutes = Math.floor((sec_num - (hours * 3600)) / 60);

            let hr,min;
            if (hours === 0) {hr  = ''}
            else {
                if (hours === 1) {hr  = hours+'hour '}
                else{hr = hours+'hours '}
            }
            if (minutes < 10) { min = minutes}else{min = minutes}
            return hr+min;
        }
    }

    _updateRide(options){
        this.props.updateRide(this.props.ride.id, options);
    }

    revive = () => {
        this.props.dispatch(FuseActions.openRidesDialog({
            children: <ReviveDialog ride_id={this.props.ride.id}/>
        }));
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.ride !== this.props.ride){
            this.setState({
                confirmed: nextProps.ride ? nextProps.ride.confirmed === 1 : null
            })
        }
    }

    previewRide = () => {
        const { dispatch } = this.props;
        dispatch(FuseActions.openDialog({
            maxWidth: "xl",
            children: <PreviewRide copy={_ => this.call(this.props.ride.phone_number)}
                                   close={_ => this.props.dispatch(FuseActions.closeRidesDialog())}
                                   send={this.handleSendPreviewRideDialog} />
        }))
    };

    _handleSendPreviewRideDialog(note){
        let id = this.props.ride.id;

        if(note) {
            this.props.updateRide(id, {
                status: 'note',
                note   : note
            });
        }
        this.props.dispatch(FuseActions.closeDialog())
    };

    viewClient = () => {
        window.open('/client/'+this.props.ride.user_id, '_blank');
    };


    viewClientRides = () => {
        const queryParams = [];
        queryParams.push('search=uid:' + encodeURIComponent(this.props.ride.user_id));
        queryParams.push('statuses=all');
        queryParams.push('time_range=all');
        const queryString =queryParams.join('&');
        window.open('/rides?' + queryString, '_blank');
    };

    getPhoneNumber = (phones) => {
        if( ! phones || phones.length === 0){
            return '';
        }
        let arr_phones = phones.split(",");
        let new_phones = arr_phones.map(user_phone => {
            if (user_phone !== "") {
                return (
                    <div key={user_phone} className='flex flex-row m-2 cursor-pointer'>
                        <a href={`tel:${user_phone}`}><Icon>phone</Icon></a>
                        <p className={'phone'} onClick={_ => this.call(user_phone)}>{user_phone}</p>
                    </div>
                )
            }
            return null;
        });

        return new_phones;
    };

    render() {
        const { classes, t, ride} = this.props;
        const { note } = this.state;

        if(!ride){
            return (
                <div className='ride-info'>
                    <Skeleton height={44}/>
                    <div className={classes.passenger}>
                        <div className={'flex row'}>
                            <div className={'flex justify-center flex-1'}>
                                <Skeleton width={48} height={48} circle={true}/>
                            </div>
                        </div>
                        <div className={'flex flex-col my-5 items-center justify-between'}>
                            <Skeleton width={200} height={20}/>
                            <Skeleton width={300} height={20}/>
                        </div>
                        <div className={'flex flex-row my-2 justify-between mx-16'}>
                            <Skeleton width={100} height={20}/>
                            <Skeleton width={100} height={20}/>
                            <Skeleton width={100} height={20}/>
                        </div>
                    </div>
                    <div className={classes.driver_container}>
                        <div className='photo'><Skeleton width={30} height={30} circle={true}/></div>
                        <div className={'flex flex-col my-5 justify-between'}>
                            <Skeleton width={200} height={14}/>
                            <Skeleton width={300} height={14}/>
                        </div>
                    </div>
                    <div className={classes.car_container}>
                        <div className='car-icon'><Skeleton width={30} height={30} circle={true}/></div>
                        <div className={'flex flex-col my-5 justify-between'}>
                            <Skeleton width={200} height={14}/>
                            <Skeleton width={300} height={14}/>
                        </div>
                    </div>
                    <div className={classes.destinations}>
                        <div className={'flex flex-col my-5 justify-between'}>
                            <Skeleton width={200} height={14}/>
                            <Skeleton width={350} height={14}/>
                        </div>
                        <div className={'flex flex-col my-5 justify-between'}>
                            <Skeleton width={100} height={14}/>
                            <Skeleton width={400} height={14}/>
                        </div>
                        <Skeleton width={250} height={14}/>
                    </div>

                    <div className={'flex mx-5 my-5'}>
                        <Skeleton height={100} width={414}/>
                    </div>
                    <div className={'flex flex-row my-16 justify-between mx-20'}>
                        <Skeleton width={50} height={50} circle={true}/>
                        <Skeleton width={50} height={50} circle={true}/>
                        <Skeleton width={50} height={50} circle={true}/>
                    </div>
                </div>
            )
        }

        let initials = [...ride.first_name][0] + [...ride.last_name][0];

        let note_events = [];
        if(ride.hasOwnProperty('events')) {
            note_events = [...ride.events].filter((event) => event.admin_id !== null);
        }

        return (
            <div className='ride-info'>

                <div className={classes[ride.status]}>
                    <p className='reference_id'> # {ride.id}  {ride.reference_id > 0 && `/ ${ride.reference_id}`}</p>
                    <div className='flex flex-col justify-end justify-center text-right'>
                        <p className='status'>
                            {t('rides.statuses.'+ride.status)}
                        </p>
                        {ride.company && <p className='company'>{ride.company.name}</p>}
                    </div>
                </div>
                <div className={classes.passenger}>
                    <div className={'flex row'}>
                        <div className={'flex-1'}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={_ => this.updateRide({
                                            status: 'rider_confirmed',
                                            value: ride.confirmed === 1 ? 0 : 1,
                                        })}
                                        checked={ride.confirmed === 1}

                                        color='primary'
                                    />
                                }
                                className={classes.confirmed}
                                label='Confirmed'
                            />
                        </div>
                        <div className={'flex justify-center flex-1'}>
                            <div className={classes.passanger_icon}>{initials}</div>
                        </div>
                        <div className={'flex justify-end flex-1'}>
                            <IconButton className={classes.edit_btn} size={'small'} color='primary' onClick={this.previewRide}>
                                <Icon>edit</Icon>
                            </IconButton>
                        </div>
                    </div>

                    <div className={classes.passanger_name_container}>
                        <div className={classes.passanger_name}>{ride.first_name} {ride.last_name} {ride.rider_reference_id ? '('+ride.rider_reference_id+')' : ''}</div>
                        <div className={'filter-list-btn'}>
                            <IconButton size={'small'} color='primary' onClick={this.viewClient} style={{marginRight: 10}}>
                                <Icon>visibility</Icon>
                            </IconButton>
                            <IconButton size={'small'} color='primary' onClick={this.viewClientRides}>
                                <Icon>filter_list</Icon>
                            </IconButton>
                        </div>
                    </div>
                    <div className={classes.passanger_phone}>{this.getPhoneNumber(ride.phone_number)}</div>
                    <br />
                    {ride.rider_note && <div style={{textAlign: 'center',border: '0.5px dashed #000',
                        paddingTop: 10,
                        paddingBottom: 10}}>
                        <p style={{fontWeight:'bold'}}>{ride.rider_note}</p>
                    </div>}
                </div>
                {ride.driver_id > 0 &&
                <div className={classes.driver_container}>
                    <div className='photo'><img src={ride.driver_selfie_thumbnail_url} alt='driver'/></div>
                    <div>
                        <p className={'driver-name'}>{ride.driver_first_name}</p>
                        <div className={'driver-phone'}>
                            <div className='flex flex-row m-2 cursor-pointer'>
                                <a href={`tel:${ride.driver_phone_number}`}><Icon>phone</Icon></a>
                                <p className={'phone'} onClick={_ => this.call(ride.driver_phone_number)}>{ride.driver_phone_number}</p>
                            </div>
                            {ride.connecting_phone_number && <div className='flex flex-row m-2 cursor-pointer'>
                                <a href={`tel:${ride.connecting_phone_number}`}><Icon>phone</Icon></a>
                                <p className={'phone'} onClick={_ => this.call(ride.connecting_phone_number)}>{ride.connecting_phone_number}</p>
                            </div>}
                        </div>
                    </div>
                </div>
                }
                {ride.car_id > 0 &&
                <div className={classes.car_container}>
                    <div className='car-icon'>
                        <img alt="" src={'../assets/img/cars/car_placeholder_'+ride.car_color+'.png'} />
                    </div>
                    <div>
                        <p className='plate-number'>{ride.car_plate_number}</p>
                        <p className='car-title'>{ride.title} · {ride.car_color.charAt(0).toUpperCase() + ride.car_color.slice(1)} · {ride.car_reference_id}</p>
                    </div>
                </div>
                }

                {ride.ride_type_display_name &&
                <div className={classes.car_container}>
                    <div className='car-icon'>
                        <img alt="" src={ride.ride_type_image} />
                    </div>
                    <div>
                        <p className='plate-number'>{ride.ride_type_display_name}</p>
                        <p className='car-title'>{ride.ride_type_short_description}</p>
                    </div>
                </div>
                }

                <div className={classes.destinations}>
                    <p className={'time'}>Arrived · {Moment(ride.arrived_at).format('LT')} | Pick up · {Moment(ride.pickup_at).format('LT')}</p>
                    <p className={'address'}>{ride.start_address}</p>
                    <p className={'time'}>Drop off · {Moment(ride.dropoff_at).format('LT')}</p>
                    <p className={'address'}>{ride.destination_address}</p>
                    {ride.car &&
                    <p className='pool'>{this.secondsToDatetime(ride.duration)}min · {ride.distance.toFixed(2)}mi  · ${parseFloat(ride.amount).toFixed(2)}</p>
                    }
                </div>


                <div>
                    <div className='note-container flex flex-col items-center '>
                        <div className={'pickup_note'} >
                            <div style={{ padding: "15px 15px 10px" }}>
                                {note_events.length > 0 ?
                                    note_events.map((event) => {
                                        return (
                                            <div className={'container'} key={event.id}>
                                                <div className={'date'}>
                                                    {moment(event.created_at).format('MM/DD h:mm A')}
                                                </div>
                                                <div className={'body'}>{event.body}</div>
                                                <div className={'admin'}>{event.admin_first_name}</div>
                                            </div>
                                        )
                                    }) : <div className={'container no-note'}>No note</div>

                                }
                            </div>
                        </div>
                        <TextField
                            fullWidth
                            className={classes.textFieldNote}
                            variant="outlined"
                            type={'text'}
                            placeholder="Leave comment..."
                            value={note}
                            InputProps={{
                                onChange       : this.handleChange,
                                onFocus        : this.showSearch,
                                onBlur         : this.handleBlur,
                                name           : 'note',
                                id             : 'note',
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            aria-label="Toggle password visibility"
                                            onClick={this.addNote}
                                        >
                                            {<Send />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>

                <div className={classes.buttons_container}>

                    {ride.status !== 'pending' && <Tooltip title="Revive">
                        <IconButton size={'medium'} color='primary' onClick={this.revive} disabled={ride.status === 'pending'}>
                            <Icon fontSize={'large'}>history</Icon>
                        </IconButton>
                    </Tooltip>}


                    {(ride.status === 'assigned' || ride.status === 'accepted' || ride.status === 'arriving' || ride.status === 'pending') &&
                    <Tooltip title="Cancel">
                        <IconButton className={'not-interested'} size={'medium'} color='primary' onClick={this.handleOpenCanceledDialog}>
                            <Icon fontSize={'large'}>not_interested</Icon>
                        </IconButton>
                    </Tooltip>
                    }
                    <ContainerDialog />
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        alert      : (title, body, variant) => dispatch(actions.NotificationsActions.alert(title, body, variant)),
        updateRide : (ride_id, options) => dispatch(actions.RidesActions.updateRide(ride_id, options)),
        retrieveRide: (ride) => dispatch(actions.RidesActions.retrieveRide(ride)),
        retrieveRideLocation: (ride_id) => dispatch(actions.RidesActions.retrieveRideLocation(ride_id)),
        updateFilters: (filters) => dispatch(actions.RidesActions.updateFilters(filters)),
    }
}

function mapStateToProps(state)
{
    return {
        ride              : state.rides.ride,
    }
}

export default (withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RideInfo))));
