import React from 'react';
import {Typography} from '@material-ui/core';
import Button from "../../../components/Button/Button";


const styles = {
    description: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '26px',
        letterSpacing: '0.1px',
        color: '#666666',
        margin: '32px 0 0'
    },
    descriptionHighlight: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '26px',
        letterSpacing: '0.1px',
        color: '#536DFE',
        margin: 0
    },
    btn_container:{
        display: "flex",
        justifyContent: 'space-between',
        width: '261px',
        marginTop: "28px",
    },

};

const secondStep = (props) => (
    <div className="flex flex-col justify-center w-full">
        <Typography style={styles.description}>Please click to “I Agree” to confirm you read</Typography>
        <Typography>
            <a target="_blank" style={styles.descriptionHighlight} rel="noopener noreferrer" href="http://ridemyle.com/terms-and-conditions">Terms & Conditions</a>
            <a target="_blank" style={styles.descriptionHighlight} rel="noopener noreferrer" href="http://ridemyle.com/privacy-policy"> & Privcay Policy</a>
        </Typography>

        <div style={styles.btn_container} >
            <Button color={'blue'} width={'120px'} textTransform={false} clicked={props.agree}>
                I Agree
            </Button>
            <Button color={'without-background-border'} width={'120px'} textTransform={false} clicked={props.cancel}>
                Cancel
            </Button>
        </div>
    </div>
);

export default secondStep;