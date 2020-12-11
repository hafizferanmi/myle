import React from 'react';
import {
    FormControl,
    InputLabel,
} from '@material-ui/core';
import './geocoder.scss'


const geocoder = (props) => (
    <FormControl fullWidth={true}
                 className={`${props.focus_input ? 'geocoder-focus' : ''} ${props.error ? 'error' : ''}`}
                 style={{marginTop: '16px', marginBottom: '8px', ...props.style}}>
        <InputLabel shrink={true} htmlFor='component-outlined' style={{ left: '13px', top: '-7px'}}>{props.label}</InputLabel>
        <div id={props.id} className='geocoder-container' onClick={props.focus}>
            <fieldset aria-hidden='true'
                      className='fieldset'>
                <legend className='legend' style={{width: '50px'}}><span>​</span></legend>
            </fieldset>
        </div>
    </FormControl>
);


export default geocoder;
