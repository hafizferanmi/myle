import React, { Component, Fragment }from 'react';
import {
    DialogContent,
    DialogActions,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormGroup,
    TextField,
    Toolbar,
    Typography,
    Icon,
    AppBar
} from '@material-ui/core';
import moment from 'moment-timezone';
import Button from "../../../../components/Button/Button";
import CanceledDialog from '../cancel/CanceledDialog';
import './preview_ride.scss';
import {actions} from "../../../../services";
import {connect} from "react-redux";
import * as FuseActions from "../../../../services/fuse/actions";
import AddressAutocomplete from "../../../../components/AddressAutocomplete/AddressAutocomplete";

const styles = {
    textField: {
        width: '49%',
    },
    title: {
        flex: 1,
        color: '#000000',
    }
};
class PreviewRide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id              : 0,

            ride_type       : 0,

            first_name      : '',
            last_name       : '',
            phone_number    : '',

            type            : '',
            cost            : '',
            pickup_note     : '',
            pickup_at       : '',
            dropoff_at      : '',

            start_lat       : '',
            start_lon       : '',
            start_address   : '',

            end_lon     : '',
            end_lat     : '',
            end_address : '',

            error: false,
            focus_pick_up: false,
            focus_drop_off: false,

            rider_note: '',
            note: '',
            status: ''
        };

        this.confirm          = this._confirm.bind(this);
        this.cancel           = this._cancel.bind(this);
        this.cancelRide       = this._cancelRide.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if((!this.props.ride && nextProps.ride) || nextProps.ride.id !== this.props.ride.id){
            this.init(nextProps.ride)
        }
    }

    componentDidMount() {
        if(this.props.ride) {
            this.init(this.props.ride);
        }
    }

    _cancel() {
        this.props.dispatch(FuseActions.closeDialog());
    }

    _confirm(){
        this.props.updateRide(this.state.id, {
            ride_type_id        : this.state.ride_type.id,

            pickup_note         : this.state.pickup_note,
            pickup_at           : moment.tz(this.state.pickup_at, this.props.ride.ride_type_timezone).utc().format('YYYY-MM-DDTHH:mm'),
            dropoff_at          : moment.tz(this.state.dropoff_at, this.props.ride.ride_type_timezone).utc().format('YYYY-MM-DDTHH:mm'),

            start_lat           : this.state.start_lat,
            start_lon           : this.state.start_lon,
            start_address       : this.state.start_address,

            destination_lat     : this.state.end_lat,
            destination_lon     : this.state.end_lon,
            destination_address : this.state.end_address,

            rider_note      : this.state.rider_note,
            first_name      : this.state.first_name,
            last_name       : this.state.last_name,
            phone_number    : this.state.phone_number
        });
    }

    change = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    init = (ride) => {
        this.setState({
            id              : ride.id,
            ride_type       : ride.ride_type_display_name,

            first_name      : ride.first_name,
            last_name       : ride.last_name,
            phone_number    : ride.phone_number,

            type            : 'pool',
            cost            : ride.amount     ? ride.amount : '',
            pickup_note     : ride.pickup_note,
            pickup_at       : ride.pickup_at  ? moment.tz(ride.pickup_at, ride.ride_type_timezone).format('YYYY-MM-DDTHH:mm') : '',
            dropoff_at      : ride.dropoff_at ? moment.tz(ride.dropoff_at, ride.ride_type_timezone).format('YYYY-MM-DDTHH:mm') : '',


            start_lat       : ride.start_lat,
            start_lon       : ride.start_lon,
            start_address   : ride.start_address,

            end_lat         : ride.destination_lat,
            end_lon         : ride.destination_lon,
            end_address     : ride.destination_address,

            status          : ride.status,

            error: false,
            focus_pick_up: false,
            focus_drop_off: false,

            rider_note    : ride.rider_note
        });

    };

    createNote = () => {
        this.props.updateRide(this.state.id, {
            status : 'note',
            note   : this.state.note
        }).then(() => {
            this.setState({
                note: ''
            })
        });
    };

    _cancelRide() {
        const { dispatch } = this.props;
        dispatch(FuseActions.openRidesDialog({
            children: <CanceledDialog ride_id={this.props.ride.id} />
        }));
    };

    addressChanged = (options) => {
        if(options.name === 'start_address'){
            this.setState({
                start_address  : options.address,
                start_lat      : options.lat,
                start_lon      : options.lon
            })
        }else if(options.name === 'end_address') {
            this.setState({
                end_address  : options.address,
                end_lat      : options.lat,
                end_lon      : options.lon
            })
        }
    };

    render(){
        const { ride } = this.props;

        if(!ride) {
            return null;
        }

        return (
            <Fragment>
                <AppBar style={{
                    position: 'relative',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Toolbar className={'preview-dialog-toolbar'}>
                        <Typography variant='h6' style={styles.title}>Preview Ride # {ride.id} / {ride.reference_id}</Typography>
                        <Button color={'red'} width={'158px'} textTransform={true} clicked={this.cancelRide}>
                            CANCEL RIDE
                        </Button>
                        <Button color={'gray'} width={'158px'} textTransform={true} clicked={this.cancel}>
                            Cancel
                        </Button>
                        <Button color={'blue'} width={'158px'} textTransform={true} clicked={this.confirm} processing={this.props.processing}>
                            Update
                        </Button>
                    </Toolbar>
                </AppBar>


                <DialogContent className={'preview-dialog-content'}>
                    <div className={'information'}>
                        <div className='title'>Passenger</div>
                        <FormGroup>
                            <TextField
                                label='First Name'
                                value={this.state.first_name}
                                onChange={this.change}
                                type='text'
                                name='first_name'
                                margin='normal'
                                variant='outlined'
                                style={styles.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label='Last Name'
                                value={this.state.last_name}
                                onChange={this.change}
                                type='text'
                                name='last_name'
                                margin='normal'
                                variant='outlined'
                                style={styles.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label='Phone number'
                                value={this.state.phone_number}
                                onChange={this.change}
                                type='text'
                                name='phone_number'
                                margin='normal'
                                variant='outlined'
                                style={styles.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="Note"
                                multiline
                                rows="5"
                                value={this.state.rider_note}
                                variant="outlined"
                                style={{marginTop: 15, width: '49%'}}
                                onChange={this.change}
                                name={'rider_note'}

                            />
                        </FormGroup>
                        <div className='title'>Trip info</div>
                        <br />
                        <FormGroup>
                            <TextField
                                id="datetime-local"
                                label="Pickup time"
                                type="datetime-local"
                                value={this.state.pickup_at}
                                name='pickup_at'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.change}
                                style={styles.textField}
                            />

                            <TextField
                                id="datetime-local"
                                label="Dropoff Time"
                                type="datetime-local"
                                value={this.state.dropoff_at}
                                name='dropoff_at'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.change}
                                style={styles.textField}
                            />
                        </FormGroup>
                        <FormGroup>

                            <AddressAutocomplete
                                style={{marginTop: 15, width: '49%'}}
                                onChange={this.addressChanged}
                                placeholder={'Pick Up'}
                                name={'start_address'}
                                value={this.props.ride.start_address}
                                disabled={false}
                            />

                            <AddressAutocomplete
                                style={{marginTop: 15, width: '49%'}}
                                onChange={this.addressChanged}
                                placeholder={'Destination address'}
                                name={'end_address'}
                                value={this.props.ride.destination_address}
                                disabled={false}
                            />

                        </FormGroup>
                    </div>
                    <div className={'container-table-and-form'}>
                        <div className={'notes'}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Pickup Note"
                                multiline
                                rows="5"
                                value={this.state.pickup_note}
                                variant="outlined"
                                style={{width: '96%',
                                    marginTop: 15,
                                    marginBottom: 15,
                                    marginLeft: '2%',
                                    marginRight: '2%'
                                }}
                                onChange={this.change}
                                name={'pickup_note'}
                            />
                            <Table size='small' stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'date'} align='left'>Date</TableCell>
                                        <TableCell className={'body'} align='left'>Event</TableCell>
                                        <TableCell className={'admin'} align='left'>Admin</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ride.hasOwnProperty('events') && ride.events.map(event => (
                                        <TableRow key={event.id}>
                                            <TableCell className={'date'} component='th' scope='row'>
                                                {moment(event.created_at).format('MM/DD h:mm A')}
                                            </TableCell>
                                            <TableCell className={'body'}>{event.body}</TableCell>
                                            <TableCell className={'admin'}>{event.admin_first_name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <DialogActions className={'send-note-container'}>
                            <TextField
                                fullWidth
                                label={'Type and Press enter'}
                                placeholder='Type and Press enter'
                                id='note-field'
                                margin='normal'
                                variant='outlined'
                                name='note'
                                className={'note-input'}
                                onChange={this.change}
                            />
                            <Button color={'blue'}
                                    textTransform={true}
                                    clicked={this.createNote}
                                    disabled={this.state.note.length === 0}>
                                SEND
                                <Icon className='pending' style={{marginLeft: "5px", fontSize: "20px"}}>send</Icon>
                            </Button>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Fragment>
        )
    }
}




function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateRide: (ride_id, options) => dispatch(actions.RidesActions.updateRide(ride_id, options))
    }
}

function mapStateToProps(state)
{
    return {
        processing     : state.rides.update_ride_processing,
        ride           : state.rides.ride,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewRide);
