import React, {Component} from 'react';
import {
    FormControl,
    TextField,
    MenuItem,
    Icon,
    Select,
    InputLabel,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    withStyles
} from '@material-ui/core';
import Button from "../../Button/Button";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const styles = {
    dayPicker: {
        '&.DayPicker .DayPicker-NavBar span': {
            backgroundImage: "url('../assets/img/createRide/Shape.png')"
        }
    }
};

class ThirdStep extends Component {

    render(){
        let card = null;

        if (this.props.payment_type === 'card'){
            card = (
                <div className='flex justify-between mt-16'>
                    <FormControl variant="outlined"  style={{width: '46%'}} disabled={this.props.estimates.length === 0}>
                        <InputLabel id="card" shrink={true}>Сard</InputLabel>
                        <Select
                            labelId="card"
                            value={this.props.estimate}
                            onChange={this.props.handleChange}
                            labelWidth={40}
                            inputProps={{
                                name: 'card'
                            }}
                            label="Card"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/*{this.props.estimates.filter((estimate) => estimate.ride_type.payment_types_supported.indexOf(this.props.payment_type) !== -1).map((estimate, index) => {*/}
                            {/*return (*/}
                            {/*<MenuItem key={index} value={estimate}>*/}
                            {/*{`${estimate.ride_type.display_name} (${estimate.seats} seats) - $${estimate.amount}`}*/}
                            {/*</MenuItem>*/}
                            {/*)*/}
                            {/*})}*/}
                        </Select>
                    </FormControl>
                    <FormControl style={{width: '46%', display: 'flex', alignItems: 'flex-start'}}>
                        <Button color={'without-background'}
                                width={'133px'}
                                className={'add-card-btn'}
                                textTransform={false}
                                clicked={this.props.handleAddCard}>
                            Add Card
                            <Icon style={{marginLeft: "20px", fontSize: "26px"}}>add_circle_outline</Icon>
                        </Button>
                    </FormControl>
                </div>
            )
        }

        return (
            <div className='flex-col justify-between w-full h-full' style={{display: this.props.step==='step-3' ? 'flex' : 'none'}}>
                <DayPicker
                    className={this.props.classes.dayPicker}
                    onDayClick={this.props.handleDayClick}
                    selectedDays={this.props.pickup_at_dates}
                />
                <div className='flex justify-between mt-5'>
                    <FormControl style={{width: '46%'}}>
                        <TextField
                            type="time"
                            label='Ride Time'
                            value={this.props.pickup_at_time}
                            onChange={this.props.handleChange}
                            name='pickup_at_time'
                            margin='normal'
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </FormControl>
                    <FormControl style={{width: '46%'}}>
                        <TextField
                            type="time"
                            label='Return time (If Needed)'
                            value={this.props.return_at}
                            onChange={this.props.handleChange}
                            name='return_at'
                            margin='normal'
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </FormControl>
                </div>
                <div className='flex justify-between'>
                    <FormControl variant="outlined"  style={{width: '46%', marginTop: '33px'}} disabled={this.props.estimates.length === 0}>
                        <InputLabel id="estimate" shrink={true}>Vehicle Type</InputLabel>
                        <Select
                            labelId="estimate"
                            value={this.props.estimates.length !== 0 ? this.props.estimate : ""}
                            onChange={this.props.handleChange}
                            labelWidth={95}
                            inputProps={{
                                name: "estimate"
                            }}
                            label="Vehicle Type"
                        >
                            {this.props.estimates.filter((estimate) => estimate.ride_type.payment_types_supported.indexOf(this.props.payment_type) !== -1).map((estimate, index) => {
                                return (
                                    <MenuItem key={index} value={estimate}>
                                        {`${estimate.ride_type.display_name} (${estimate.seats} seats) - $${estimate.amount}`}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <FormControl style={{width: '46%', display: 'flex', flexDirection: 'row', marginTop: '17px'}}>
                        <TextField
                            type="time"
                            label='Appointment time (If Needed)'
                            value={this.props.appointment_at}
                            onChange={this.props.handleChange}
                            name='appointment_at'
                            margin='normal'
                            variant='outlined'
                            classes={{root: 'appointmentAt'}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <Checkbox
                            checked={this.props.save_appointment_at}
                            value={this.props.save_appointment_at}
                            color="primary"
                            classes={{ root: 'checkboxAppointmentAt'}}
                            onChange={(event, checked) => this.props.handleChange({target: {name: 'save_appointment_at', value: checked}})}
                            inputProps={{
                                name :'save_appointment_at',
                            }}
                        />
                    </FormControl>
                </div>
                <div className='flex justify-between' style={{marginTop: 17}}>
                    <FormControl style={{width: '46%'}}>
                        <TextField
                            type="text"
                            label='Ride Price'
                            value={this.props.amount}
                            onChange={this.props.handleChange}
                            name='amount'
                            margin='normal'
                            variant='outlined'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                endAdornment: <InputAdornment position="start">
                                    <img alt="" src={'../assets/img/createRide/Create shape.png'} />
                                </InputAdornment>,
                            }}
                        />
                    </FormControl>
                    {this.props.estimates.length > 0 &&
                    <FormControl variant="outlined"  style={{width: '46%', marginTop: '15px'}} disabled={this.props.estimates.length === 0}>
                        <InputLabel id="method-of-payment" shrink={true}>Method of Payment</InputLabel>
                        <Select
                            labelId="method-of-payment"
                            value={this.props.payment_type}
                            onChange={this.props.handleChange}
                            labelWidth={150}
                            inputProps={{
                                name: 'payment_type'
                            }}
                            label="Method of Payment"
                        >
                            {this.props.estimates[0].ride_type.payment_types_supported.map((type, index) => {
                                return (
                                    <MenuItem key={index} value={type}>{type[0].toUpperCase() + type.slice(1)}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                    }
                </div>
                {card}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.props.save_as_draft}
                            value={this.props.save_as_draft}
                            color="primary"
                            onChange={(event, checked) => this.props.handleChange({target: {name: 'save_as_draft', value: checked}})}
                            inputProps={{
                                name :'save_as_draft',
                            }}
                        />}
                    label="Save as draft"
                    className="save-as-draft"
                />
                <div className="flex flex-row justify-between">
                    <Button color={'without-background'}
                            width={'126px'}
                            className={'create-ride-dialog-continue-btn'}
                            textTransform={false}
                            clicked={this.props.handleBack}>
                        <Icon className='pending' style={{marginRight: "5px", fontSize: "20px"}}>arrow_back</Icon>
                        Previous Step
                    </Button>
                    <Button color={'blue'}
                            width={'100%'}
                            clicked={this.props.handleCreateRequest}
                            processing={this.props.create_ride_processing}
                            className={'request-btn'}
                    >
                        Request
                    </Button>
                </div>
                {/*<FuseSecondDialog/>*/}
            </div>
        )
    }
}
export default (withStyles(styles)(ThirdStep));


