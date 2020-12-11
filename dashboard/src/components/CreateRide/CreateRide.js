import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from '../../services/index';
import * as FuseActions from "../../services/fuse/actions/index";
import moment from 'moment-timezone';
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";

import './index.scss';
import "react-day-picker/lib/style.css";


class CreateRide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'step-1',

            company_id: props.company.id,

            phone_number: '',
            secondary_phone_number: '',
            first_name: '',
            last_name: '',

            focus_pick_up: false,
            focus_drop_off: false,

            start_address   : '',
            start_lat       : 0,
            start_lon       : 0,

            end_address   : '',
            end_lat       : 0,
            end_lon       : 0,

            note:  '',
            error: false,

            pickup_at_dates   : [moment().toDate()],
            pickup_at_time : moment().format('HH:mm'),
            return_at : '',

            estimate: 'regular',
            appointment_at: '',
            save_appointment_at: false,
            amount: '',

            payment_type: 'account',
            save_as_draft: false,

            cvv: '',
            postal_code: '',
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.start_lat > 0 &&
            this.state.end_lat > 0 &&
            (prevState.start_address !== this.state.start_address || prevState.end_address !== this.state.end_address)
        ){
            let phone_number = this.state.phone_number;
            if(this.state.secondary_phone_number.length > 0) {
                phone_number = (this.state.phone_number + "," + this.state.secondary_phone_number).replace(/[()]/g, '');
            }


            let data = {
                company_id      : this.state.company_id,

                rider_first_name   : this.state.first_name,
                rider_last_name    : this.state.last_name,
                rider_phone_number : phone_number,
                // rider_secondary_phone_number : this.state.secondary_phone_number,

                start_address   : this.state.start_address,
                start_lat       : this.state.start_lat,
                start_lon       : this.state.start_lon,
                end_address     : this.state.end_address,
                end_lat         : this.state.end_lat,
                end_lon         : this.state.end_lon
            };

        this.props.getEstimates(data);
        }
        if(this.props.estimates && this.props.estimates !== prevProps.estimates){
            if(this.props.estimates && this.props.estimates.length > 0){
                let estimate = this.props.estimates.filter((estimate) => estimate.ride_type.payment_types_supported.indexOf(this.state.payment_type) !== -1)[0];
                if(estimate) {
                    this.setState({
                        estimate     : estimate,
                        amount       : estimate.amount
                    });
                }
            }
        }
    }

    handleNext = () => {
        let nextStep = this.state.step === 'step-1' ? 'step-2' : 'step-3';
        this.setState({
            step: nextStep
        });
    };
    handleBack = () => {
        let backStep = this.state.step === 'step-2' ? 'step-1' : 'step-2';
        this.setState({
            step: backStep
        });
    };

    secondsToDateTime = (d) => {
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
    };

    // step-1

    handleChangeRadio = (event) => {
        this.setState({
            [event.target.name]: +event.target.value
        });
    };

    // step-2

    handleChange = (event) => {
        this.setState({
            error: false,
            [event.target.name]: event.target.value
        });
        if(event.target.name === 'estimate'){
            this.setState({
                amount: event.target.value.amount
            })
        }
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

    handlePhoneChange = (event) => {
        let value = (event.target.value && event.target.value.length > 0) ? event.target.value : event.target.innerText;
        if(value === undefined){
            value = '';
        }
        let index_of_note = value.indexOf(' (');
        if(value && index_of_note !== -1){
            value = value.slice(0, index_of_note);
            this.props.search_clients.forEach((client) => {
                if(client.phone_number === value){
                    this.setState({
                        first_name : client.first_name === null ? "" : client.first_name,
                        last_name  : client.last_name === null ? "" : client.last_name
                    });
                }
            });
        }
        this.setState({
            error: false,
            [event.target.name]: value
        });
        this.props.searchRiders({
            search: 'phone:'+value,
            company_id: this.state.company_id
        });
    };

    // step 3

    handleDayClick = (date) => {
        const dates = [...this.state.pickup_at_dates];
        let dates_format = dates.map(date => moment(date).format('MM/DD/YYYY'));
        let date_format = moment(date).format('MM/DD/YYYY');
        const newDates = dates_format.includes(date_format) ?
            dates.filter(d => date_format.indexOf(moment(d).format('MM/DD/YYYY')) === -1) :
            [...dates, date];

        this.setState({ pickup_at_dates: newDates });
    };


    handleCreateRequest = () => {
        let dates = this.state.pickup_at_dates.map((date) => {
            return moment(date).format('YYYY-MM-DD');
        }).join(',');

        let phone_number = this.state.phone_number;
        if(this.state.secondary_phone_number.length > 0) {
            phone_number = (this.state.phone_number + "," + this.state.secondary_phone_number).replace(/[()]/g, '');
        }

        let data = {
            company_id          : this.state.company_id,
            ride_estimate_id    : this.state.estimate.id,
            pickup_at_time      : this.state.pickup_at_time,
            pickup_at_dates     : dates,
            pickup_note         : this.state.note,

            rider_first_name    : this.state.first_name,
            rider_last_name     : this.state.last_name,
            rider_phone_number  : phone_number,

            return_at           : this.state.return_at,
            appointment_at      : this.state.appointment_at,
            save_appointment_at : this.state.save_appointment_at,
            save_as_draft       : this.state.save_as_draft,
            payment_type        : this.state.payment_type,
            payment_method_id   : 0,
            amount              : this.state.amount,
        };

        this.props.create(data).then(() => {
            this.props.dispatch(FuseActions.closeDialog());
        }, () => {
            this.props.dispatch(FuseActions.closeDialog());
        });
    };

    render() {
        let image = '../assets/img/createRide/Company.png';
        if(this.state.step === 'step-2') {
            image = '../assets/img/createRide/Passanger.png';
        }
        if(this.state.step === 'step-3') {
            image = '../assets/img/createRide/Ride.png';
        }

        return (
            <div className='create-ride-dialog'>
                <div className='first-block'>
                    <h1>Create request</h1>
                    <div className='steps'>
                        <div className="step active">
                            <div className='ellipse'>1</div>
                            <h3>Choose company</h3>
                        </div>
                        <div className={this.state.step !== 'step-1' ? 'step active' : 'step'}>
                            <div className='ellipse'>2</div>
                            <h3>Passanger Details</h3>
                        </div>
                        <div className={this.state.step === 'step-3' ? 'step active' : 'step'}>
                            <div className='ellipse'>3</div>
                            <h3>Ride Details</h3>
                        </div>
                    </div>
                    <img className={this.state.step === 'step-2' ? 'image-step-2' : 'image'} alt="" src={image} />
                    {this.props.stats.distance && this.state.step !== 'step-1' &&
                        <div className='distance'>
                            <img className='distance-image' alt="" src={'../assets/img/createRide/Pointer.svg'} />
                            <div>
                                <h3>{this.props.stats.distance.toFixed(2)} Mile</h3>
                                <h5>{this.secondsToDateTime(this.props.stats.duration)} minutes ride</h5>
                            </div>
                        </div>
                    }
                </div>
                <div className='second-block p-16'>
                    <FirstStep step={this.state.step}
                               companies={this.props.companies}
                               company_id={this.state.company_id}
                               handleChangeRadio={this.handleChangeRadio}
                               handleNext={this.handleNext}
                    />
                    <SecondStep step={this.state.step}
                                search_clients={this.props.search_clients}
                                phone_number={this.state.phone_number}
                                handlePhoneChange={this.handlePhoneChange}
                                secondary_phone_number={this.state.secondary_phone_number}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                note={this.state.note}
                                handleChange={this.handleChange}
                                start_address={this.state.start_address}
                                end_address={this.state.end_address}
                                addressChanged={this.addressChanged}
                                handleBack={this.handleBack}
                                handleNext={this.handleNext}

                    />
                    <ThirdStep step={this.state.step}
                               pickup_at_dates={this.state.pickup_at_dates}
                               handleDayClick={this.handleDayClick}
                               pickup_at_time={this.state.pickup_at_time}
                               return_at={this.state.return_at}
                               handleChange={this.handleChange}
                               estimates={this.props.estimates}
                               estimate={this.state.estimate}
                               appointment_at={this.state.appointment_at}
                               save_appointment_at={this.state.save_appointment_at}
                               amount={this.state.amount}
                               payment_type={this.state.payment_type}
                               save_as_draft={this.state.save_as_draft}
                               create_ride_processing={ this.props.create_ride_processing}
                               handleBack={this.handleBack}
                               handleCreateRequest={this.handleCreateRequest}

                    />
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getEstimates: (data) => dispatch(actions.RidesActions.getEstimates(data)),
        create: (data) => dispatch(actions.RidesActions.createRequest(data)),
        searchRiders: (options) => dispatch(actions.ClientsActions.searchRiders(options))
    }
}
function mapStateToProps(state)
{
    return {
        search_clients           : state.clients.search_clients,
        company                  : state.app.company,
        companies                : state.app.companies,
        // processing_estimates     : state.rides.processing_estimates,
        estimates                : state.rides.estimates,
        stats                    : state.rides.stats,
        create_ride_processing   : state.rides.create_ride_processing,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRide);
