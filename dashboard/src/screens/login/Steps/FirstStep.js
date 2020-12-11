import React from 'react';
import {
    FormControl,
    TextField
} from '@material-ui/core';
import Button from "../../../components/Button/Button";


const styles = {
    description: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: '0.1px',
        color: '#BDBDBD',
        margin: '32px 0px 39px 5px'
    }
};

const firstStep = (props) => (
    <div className="flex flex-col justify-center w-full">
        <p style={styles.description}>Enter your phone number to log in to your account</p>
        <FormControl error={props.error}>
            <TextField
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                autoFocus={true}
                type="text"
                name="phone_number"
                value={props.phone_number}
                onChange={props.changed}
                required
            />
        </FormControl>
        <div className="flex flex-row  space-between w-full">
           <div style={{width: '100%', marginRight: '10px', marginTop: '28px'}}>
               <Button color={'blue'} width={'120px'} className={''} textTransform={true}
                       clicked={props.send}
                       disabled={!props.canBeSubmitted()}
               >
                   Login
               </Button>
           </div>
        </div>
    </div>
);

export default firstStep;