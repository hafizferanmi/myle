import React from 'react';
import {
    FormControl,
    TextField,
    FormLabel,
    Icon
} from '@material-ui/core';
import Button from "../../Button/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddressAutocomplete from "../../AddressAutocomplete/AddressAutocomplete";
import "react-day-picker/lib/style.css";


const secondStep = (props) => {

    const disableNextStep = () => {
        const validation = {
            first_name: props.first_name?props.first_name.length !== 0:false,
            last_name: props.last_name?props.last_name.length !== 0:false,
        };
        let result = validation.first_name && validation.last_name;
        return result;
    };

    const disableAddressFields = () => {
        const validation = {
            first_name: props.first_name?props.first_name.length !== 0:false,
            last_name: props.last_name?props.last_name.length !== 0:false,
            phone_number: props.phone_number?props.phone_number.length !== 0:false,
        };
        let result = validation.first_name && validation.last_name && validation.phone_number;
        return result;
    };

    return (
        <div className='flex-col justify-between w-full h-full' style={{display: props.step==='step-2' ? 'flex' : 'none', justifyContent: 'space-between'}}>
            <FormControl className='form-control'>
                <FormLabel component="legend">Please fill in more detailed information for the trip</FormLabel>
                <div className='flex justify-between mt-12' style={{marginTop: 32}}>
                    <FormControl style={{ width: '46%'}}>
                        <Autocomplete
                            freeSolo
                            options={props.search_clients}
                            getOptionLabel={(option) => {
                                if(option.phone_number) {
                                    return option.phone_number + ' (' + option.first_name+' '+option.last_name+')';
                                }else{
                                    return option;
                                }
                            }}
                            value={props.phone_number}

                            onChange={(event, value) => props.handlePhoneChange({
                                target: {
                                    name: "phone_number",
                                    value: (value && value.phone_number) ? value.phone_number + ' (' + value.first_name+' '+value.last_name+')' : ''
                                }
                            })}
                            onInput={props.handlePhoneChange}
                            renderInput={(params) => <TextField {...params}
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    name: 'phone_number',
                                                                    autoComplete: 'none',
                                                                    'aria-autocomplete': 'none',
                                                                    'aria-invalid': 'false'
                                                                }}
                                                                margin='normal'
                                                                label="Phone Number"
                                                                variant="outlined"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                            />}
                        />
                    </FormControl>
                    <FormControl style={{width: '46%'}}>
                        <Autocomplete
                            freeSolo
                            options={props.search_clients}
                            getOptionLabel={(option) => {
                                if(option.phone_number) {
                                    return option.phone_number + ' (' + option.first_name+' '+option.last_name+')';
                                }else{
                                    return option;
                                }
                            }}
                            value={props.secondary_phone_number}
                            onChange={(event, value) => props.handlePhoneChange({
                                target: {
                                    name: "secondary_phone_number",
                                    value: (value && value.phone_number) ? value.phone_number + ' (' + value.first_name+' '+value.last_name+')' : ''
                                }
                            })}
                            onInput={props.handlePhoneChange}
                            renderInput={(params) => <TextField {...params}
                                                                inputProps={{
                                                                    ...params.inputProps,
                                                                    name: 'secondary_phone_number',
                                                                    autoComplete: 'none',
                                                                    'aria-autocomplete': 'none',
                                                                    'aria-invalid': 'false'
                                                                }}
                                                                margin='normal'
                                                                label="Secondary number"
                                                                variant="outlined"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                            />}
                        />
                    </FormControl>
                </div>
                <div className='flex justify-between' style={{marginTop: 36}}>
                    <FormControl style={{width: '46%'}}>
                        <TextField
                            required
                            label='First name'
                            value={props.first_name}
                            onChange={props.handleChange}
                            type='text'
                            name='first_name'
                            margin='normal'
                            variant='outlined'
                            autoComplete={'none'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl style={{width: '46%'}}>
                        <TextField
                            required
                            label='Last name'
                            value={props.last_name}
                            onChange={props.handleChange}
                            type='text'
                            name='last_name'
                            margin='normal'
                            variant='outlined'
                            autoComplete={'none'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </div>
                <AddressAutocomplete
                    style={{marginTop: 50}}
                    onChange={props.addressChanged}
                    placeholder={'Start Address'}
                    name={'start_address'}
                    value={props.start_address}
                    disabled={!disableAddressFields()}
                />

                <AddressAutocomplete
                    style={{marginTop: 30}}
                    onChange={props.addressChanged}
                    placeholder={'End Adress'}
                    name={'end_address'}
                    value={props.end_address}
                    disabled={!disableAddressFields()}
                />
                <FormControl style={{marginTop: '43px', width: '100%'}}>
                    <TextField
                        label='Note about the passenger (not for driver)'
                        value={props.note}
                        onChange={props.handleChange}
                        type='text'
                        name='note'
                        placeholder='Do not include any personal information'
                        margin='normal'
                        variant='outlined'
                        autoComplete={'none'}
                        multiline
                        rows={4}
                        rowsMax={4}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
            </FormControl>

            <div className="flex flex-row justify-between">
                <Button color={'without-background'}
                        width={'126px'}
                        className={'create-ride-dialog-continue-btn'}
                        textTransform={false}
                        clicked={props.handleBack}>
                    <Icon className='pending' style={{marginRight: "5px", fontSize: "20px"}}>arrow_back</Icon>
                    Previous Step
                </Button>
                <Button color={'blue'}
                        width={'126px'}
                        className={'create-ride-dialog-continue-btn'}
                        textTransform={false}
                        clicked={props.handleNext}
                        disabled={!disableNextStep()}>
                    Next Step
                    <Icon className='pending' style={{marginLeft: "5px", fontSize: "20px"}}>arrow_forward</Icon>
                </Button>
            </div>
        </div>
    )
};

export default React.memo(secondStep);