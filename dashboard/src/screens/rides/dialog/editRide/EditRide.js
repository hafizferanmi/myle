import React, {Component} from 'react';
import {
    FormControl,
    TextField,
    InputLabel,
    MenuItem,
    Icon
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DateTime from "../../components/DateTime";
import Geocoder from 'react-mapbox-gl-geocoder'
import Button from '../../../../components/Button/Button';
import moment from "moment/moment";
import {connect} from "react-redux";
import {actions} from "../../../../services/index";

import '../createRide/index.scss';


const mapAccess = {
    mapboxApiAccessToken: 'pk.eyJ1IjoibGFjdXN0ZWNoIiwiYSI6ImNqM3p5djBnaDA2YmsycXA4aGhuM2lvejMifQ.dL2fI1F87JZo1VZiWP3HTQ'
};

const styles = {
    edit_ride:{
        overflowY: "auto",
        overflowX: "hidden",
        minWidth: "410px",
        margin: "0 auto",
        background: "#fff",
        width: "410px",
        border: "1px solid #E6E7F0",
        borderTop: "none",
        borderBottom: "none",
        padding: "25px"
    },
    title: {
        color: "#2B2D39",
        fontSize: "20px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        lineHeight: "24px"
    },
    subtitle: {
        color: "#2B2D39",
        fontSize: "16px",
        letterSpacing: "0.5px",
        lineHeight: "19px",
        margin: "9px 0 25px 0",
    },
    btn_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px 0 70px"
    }
};

class EditRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "step-1",
            first_name: this.props.ride && this.props.ride.user ? this.props.ride.user.first_name : '',
            last_name: this.props.ride && this.props.ride.user ? this.props.ride.user.last_name : '',
            number: this.props.ride && this.props.ride.user ? this.props.ride.user.phone_number : '',
            pickup: this.props.ride && this.props.ride.start_address ? this.props.ride.start_address : '',
            drop_off: this.props.ride && this.props.ride.destination_address ? this.props.ride.destination_address : '',
            start_lat: this.props.ride && this.props.ride.start_lat ? this.props.ride.start_lat : '',
            start_lon: this.props.ride && this.props.ride.start_lon ? this.props.ride.start_lon : '',
            end_lat: this.props.ride && this.props.ride.destination_lat ? this.props.ride.destination_lat : '',
            end_lon: this.props.ride && this.props.ride.destination_lon ? this.props.ride.destination_lon : '',
            note:  this.props.ride && this.props.ride.note ? this.props.ride.note : '',
            error: false,
            focus_pick_up: false,
            focus_drop_off: false,
            firstStepValid: false,

            type: '',
            datetime: this.props.ride && this.props.ride.pickup_at ? this.props.ride.pickup_at : '',
            viewport: {},
            alignment: (moment().format("YYYY-MM-DD HH:mm:ss") === this.props.ride.pickup_at) ? 'now' : 'schedule',
        };
        this.handleChange = this._handleChange.bind(this);
        this.handleDateChange = this._handleDateChange.bind(this);
        this.handleNext = this._handleNext.bind(this);
        this.handleBack = this._handleBack.bind(this);
        this.handleEditRequest = this._handleEditRequest.bind(this);
        this.handleChangeBtn = this._handleChangeBtn.bind(this);
        this.onFocusPickup = this._onFocusPickup.bind(this);
        this.onFocusDropOff = this._onFocusDropOff.bind(this);
        this.handleBlur = this._handleBlur.bind(this);

    }
    componentDidMount() {
        if(this.props.ride && this.props.ride.start_address){
            let el = document.querySelector("#geocoder > div > input");
            el.value = this.props.ride.start_address;
        }
        if(this.props.ride && this.props.ride.destination_address){
            let el = document.querySelector("#geocoder-drop-off > div > input");
            el.value = this.props.ride.destination_address;
        }

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.estimates && nextProps.estimates !== this.props.estimates){
            this.setState({
                step: "step-2",
                type: nextProps.estimates[0].ride_type
            });
        }
    }

    _handleChange(event) {
        this.setState({
            error: false,
            [event.target.name]: event.target.value
        })
    }
    onSelectedPickup = (viewport, item) => {
        let element = document.querySelector("#geocoder > div > input");
        element.value = item.place_name;
        this.setState({
            error: false,
            pickup: item.place_name,
            start_lat: viewport.latitude,
            start_lon: viewport.longitude,
        });
        this.props.setPickupMarker({
            lat: viewport.latitude,
            lon: viewport.longitude,
        });
    };
    onSelectedDropOff = (viewport, item) => {
        let element = document.querySelector("#geocoder-drop-off > div > input");
        element.value = item.place_name;
        this.setState({
            error: false,
            drop_off: item.place_name,
            end_lat: viewport.latitude,
            end_lon: viewport.longitude,
        });
        this.props.setDropOffMarker({
            lat: viewport.latitude,
            lon: viewport.longitude,
        });
    };
    _onFocusPickup(){
        if(document.querySelector("#geocoder > div > div")){
            let element = document.querySelector("#geocoder > div > div");
            element.style.zIndex = 9999999;
        }
        this.setState({
            focus_pick_up: true,
            focus_drop_off: false,
        })
    }
    _onFocusDropOff(){
        if(document.querySelector("#geocoder-drop-off > div > div")){
            let element = document.querySelector("#geocoder-drop-off > div > div");
            element.style.zIndex = 9999999;
        }
        this.setState({
            focus_pick_up: false,
            focus_drop_off: true,
        })
    }
    _handleBlur(event) {
        this.setState({
            focus_pick_up: false,
            focus_drop_off: false,
        });
        setTimeout(()=>{
            if(document.querySelector("#geocoder > div > div")){
                let element = document.querySelector("#geocoder > div > div");
                element.style.zIndex = -9999999;
            }
            if(document.querySelector("#geocoder-drop-off > div > div")) {
                let element = document.querySelector("#geocoder-drop-off > div > div");
                element.style.zIndex = -9999999;
            }
        }, 300);
    }
    firstStepValid() {
        let pickup = document.querySelector("#geocoder > div > input");
        let drop_off = document.querySelector("#geocoder-drop-off > div > input");
        return  (pickup.value !== '' &&
            drop_off.value !== '' &&
            this.state.start_lat !== '' &&
            this.state.start_lon !== '' &&
            this.state.end_lat !== '' &&
            this.state.end_lon !== '')
    }

    _handleNext(){
        if(this.firstStepValid()){
            let  data = {
                start_lat: this.state.start_lat,
                start_lon: this.state.start_lon,
                end_lat: this.state.end_lat,
                end_lon: this.state.end_lon
            };
            this.props.getEstimates(data);
        }else {
            this.setState({
                error: true,
            })
        }
    }

    _handleBack(){
        setTimeout(()=>{
            let pickup = document.querySelector("#geocoder > div > input");
            pickup.value = this.state.pickup;
            let drop_off = document.querySelector("#geocoder-drop-off > div > input");
            drop_off.value = this.state.drop_off;
        }, 300);

        this.setState({
            type: "",
            datetime: null,
            step: "step-1"
        });
    }
    _handleDateChange(value){
        this.setState({
            error: false,
            datetime: value
        })
    }
    _handleEditRequest() {
        let date = {
            ride_estimate_id: this.state.type,
            payment_method_id: "",
            pickup_at: this.state.datetime,
            pickup_note: this.state.note,
            passenger_name: `${this.state.first_name} ${this.state.last_name}`,
            passenger_phone_number: this.state.number
        };
        this.props.edit(date, this.props.ride.id).then(() => {
            this.props.onCancel();
        }, () => {
            this.props.onCancel();
        });
    }


    _handleChangeBtn(event, newAlignment){
        this.setState({
            alignment: newAlignment
        });
    }

    render() {
        const { processing_estimates, estimates } = this.props;
        const {step, first_name, last_name, number, note, focus_pick_up, focus_drop_off, error, viewport, type, datetime, alignment} = this.state;

        let firstStep = () => {
            if(step==='step-1'){
                return (
                    <div className="flex flex-col justify-center w-full">
                        <div style={styles.title}>Edit ride</div>
                        <div style={styles.subtitle}>First up, we’ll need rider details</div>
                        <div className="flex">
                            <FormControl style={{marginRight: "4px"}}>
                                <TextField
                                    id="outlined-full-width"
                                    label="First name"
                                    value={first_name}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="first_name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl style={{marginLeft: "4px"}}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Last name"
                                    value={last_name}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="last_name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                        </div>
                        <FormControl fullWidth={true}>
                            <TextField
                                id="outlined-full-width"
                                label="Mobile number"
                                value={number}
                                onChange={this.handleChange}
                                type="text"
                                name="number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth={true} variant="outlined" className={`${focus_pick_up ? "geocoder-focus" : ""} ${error ? "error" : ""}`} style={{marginTop: "16px", marginBottom: "8px"}}>
                            <InputLabel shrink={true} htmlFor="component-outlined">Pickup address</InputLabel>
                            <div id="geocoder" className="geocoder-container" onClick={this.onFocusPickup} onBlur={this.handleBlur}>
                                <fieldset aria-hidden="true"
                                          className="fieldset">
                                    <legend className="legend" style={{width: "95px"}}><span>​</span></legend>
                                </fieldset>
                                <Geocoder
                                    {...mapAccess}
                                    onSelected={this.onSelectedPickup}
                                    viewport={viewport}
                                    hideOnSelect={true}
                                    className={'Pickup'}
                                />
                            </div>
                        </FormControl>
                        <FormControl fullWidth={true} variant="outlined" className={`${focus_drop_off ? "geocoder-focus" : ""} ${error ? "error" : ""}`} style={{marginTop: "16px", marginBottom: "8px"}}>
                            <InputLabel shrink={true} htmlFor="component-outlined">Drop off address</InputLabel>
                            <div id="geocoder-drop-off" className="geocoder-container" onClick={this.onFocusDropOff} onBlur={this.handleBlur}>
                                <fieldset aria-hidden="true"
                                          className="fieldset">
                                    <legend className="legend" style={{width: "100px"}}><span>​</span></legend>
                                </fieldset>
                                <Geocoder
                                    {...mapAccess}
                                    onSelected={this.onSelectedDropOff}
                                    viewport={viewport}
                                    hideOnSelect={true}
                                />
                            </div>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <TextField
                                id="outlined-full-width"
                                label="Note for driver"
                                value={note}
                                onChange={this.handleChange}
                                type="text"
                                name="note"
                                placeholder="Do not include any personal information"
                                helperText="Try to keep your messages short- drivers will be on the road and focused on safety"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <div className="btn-container" style={styles.btn_container}>
                            <Button color={'gray'} width={'158px'} clicked={this.props.onCancel}>
                                Cancel
                            </Button>
                            <Button color={'blue'} width={'100%'} clicked={this.handleNext}
                                    processing={this.props.processing_estimates}>
                                Ride details
                                <Icon className='pending' style={{marginLeft: "5px", fontSize: "20px"}}>arrow_forward</Icon>
                            </Button>
                        </div>
                    </div>
                );
            }
        };

        let secondStep = () => {
            if(!processing_estimates && (step==='step-2')){
                return (
                    <div className="flex flex-col justify-center w-full">
                        <div className="btn-back" onClick={this.handleBack}><Icon className='pending'>arrow_back</Icon> Edit rider details</div>

                        <ToggleButtonGroup className="toggle-button-group" size="small" value={alignment} exclusive onChange={this.handleChangeBtn}>
                            {[
                                <ToggleButton key={1} className="flex flex-1" value="now">Now</ToggleButton>,
                                <ToggleButton key={2} className="flex flex-1" value="schedule">Schedule</ToggleButton>,
                                <ToggleButton key={3} disabled={true} className="flex flex-1" value="flexible">Flexible</ToggleButton>,
                            ]}
                        </ToggleButtonGroup>

                        {
                            alignment === 'schedule' && <DateTime value={datetime} onChange={this.handleDateChange}/>
                        }
                        <FormControl fullWidth={true}>
                            <TextField
                                id="outlined-select-currency"
                                label="Type"
                                value={type}
                                onChange={this.handleChange}
                                type="text"
                                name="type"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                select
                            >
                                {estimates.map((estimate, index) => (
                                    <MenuItem key={index} value={estimate.ride_type}>
                                        {`${estimate.display_name} (${estimate.seats} seats) - $${estimate.amount}`}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </FormControl>
                        <Button color={'blue'} clicked={this.handleEditRequest}
                            // processing={this.props.processing_estimates}
                        >
                            Edit ride
                        </Button>
                    </div>
                );
            }
        };

        return (
            <div style={styles.edit_ride}>
                {firstStep()}
                {secondStep()}
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getEstimates: (data) => dispatch(actions.RidesActions.getEstimates(data)),
        edit: (data, id) => dispatch(actions.RidesActions.updateRide(data, id)),
        setPickupMarker: (value) => dispatch(actions.MapActions.setPickupMarker(value)),
        setDropOffMarker: (value) => dispatch(actions.MapActions.setDropOffMarker(value)),
    }
}
function mapStateToProps(state)
{
    return {
        processing                  : state.rides.processing,
        processing_estimates        : state.rides.processing_estimates,
        estimates                   : state.rides.estimates,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRide);
