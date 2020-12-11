import React from 'react'
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Icon
} from '@material-ui/core';
import Button from "../../Button/Button";


const firstStep = (props) => (
    <div className='flex-col justify-between w-full h-full' style={{display: props.step==='step-1' ? 'flex' : 'none'}}>
        <FormControl component="fieldset" className='form-control'>
            <FormLabel component="legend">Select the Passenger Carrier Company from the list</FormLabel>
            <RadioGroup aria-label="gender" className='radio-group' name="company_id" value={props.company_id} onChange={props.handleChangeRadio}>
                {
                    props.companies.map(company => (
                        <FormControlLabel key={company.id} value={company.id} control={<Radio color="primary" />} label={company.name} />
                    ))
                }
            </RadioGroup>
        </FormControl>
        <Button color={'blue'}
                width={'126px'}
                className={'create-ride-dialog-continue-btn'}
                textTransform={false}
                clicked={props.handleNext}>
            Next Step
            <Icon className='pending' style={{marginLeft: "5px", fontSize: "20px"}}>arrow_forward</Icon>
        </Button>
    </div>
);

export default React.memo(firstStep);