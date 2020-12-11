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
    },
    btn_container:{
        display: "flex",
        justifyContent: 'space-between',
        width: '261px',
        marginTop: "28px",
    }
};

const thirdSteps = (props) => (
    <div className="flex flex-col justify-center w-full">
        <p style={styles.description}>Enter the verification code from the SMS</p>
        <FormControl error={props.error}>
            <TextField
                id="outlined-basic"
                label="Verification Code"
                variant="outlined"
                autoFocus={true}
                type="dance"
                name="verification_code"
                value={props.verification_code}
                onChange={props.changed}
                required
                fullWidth
            />
        </FormControl>
        <div style={styles.btn_container}>
            <Button color={'blue'} width={'120px'} textTransform={false} clicked={props.verifyCode}>
                Verify Code
            </Button>
            <Button color={'without-background-border'} width={'120px'} textTransform={false} clicked={props.resendCode}>
                Recend Code
            </Button>
        </div>
    </div>
);

export default thirdSteps;