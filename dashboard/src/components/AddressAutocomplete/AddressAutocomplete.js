import React, {Component} from 'react';
import {
    FormControl,
    TextField
} from '@material-ui/core';
import {connect} from 'react-redux';
import {actions} from '../../services/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';

export class AddressAutocomplete extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    handleAddressInput = (name, event) => {
        let value = (event.target.value && event.target.value.length) > 0 ? event.target.value : event.target.innerText;
        if(value === undefined){
            value = '';
        }
        this.setState({
            error: false,
            value: value
        });
        if(value && value.length > 0){
            this.props.getPlaces(value);
            geocodeByAddress(value)
                .then(results => getLatLng(results[0]))
                .then(latLng => {
                    this.props.onChange({
                        name: name,
                        lat: latLng.lat,
                        lon: latLng.lng,
                        address: value
                    });
                })
                .catch(error => console.error('Error', error));
        }else{
            this.props.onChange({
                name: name,
                lat: 0,
                lon: 0,
                address: null
            });
        }



    };

    render() {

        let search_options = [
            ...this.props.places
        ];

        return (

                    <FormControl style={{width: '100%', ...this.props.style}}>
                        <Autocomplete
                            id={"input-"+this.props.name}
                            freeSolo
                            options={search_options.filter((option) => {
                                return this.state.value === '' || option.address.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1;
                            })}
                            getOptionLabel={(option) => {
                                if(option.address){
                                    return option.address;
                                }else{
                                    return option;
                                }
                            }}
                            value={this.state.value}
                            onChange={(event, value) => this.handleAddressInput(this.props.name, {
                                target: {
                                    value: (value && value.address) ? value.address : ''
                                }
                            })}
                            onInput={(event) => this.handleAddressInput(this.props.name, event)}
                            name={this.props.name}
                            placeholder={this.props.placeholder}
                            renderInput={(params) => <TextField {...params}
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    name: this.props.name,
                                                                    autoComplete: 'none',
                                                                    'aria-autocomplete': 'none',
                                                                    'aria-invalid': 'false'
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                label={this.props.placeholder}
                                                                variant="outlined" />}
                        />
                    </FormControl>

        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getPlaces: (input) => dispatch(actions.RidesActions.getPlaces(input)),
    }
}
function mapStateToProps(state)
{
    return {
        places                   : state.rides.places,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressAutocomplete);
