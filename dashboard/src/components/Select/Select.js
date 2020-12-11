import React from 'react';
import {
    FormControl,
    Select,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';



const styles = {
    formControl: {
        height: '35px',
        minWidth: '130px',
        marginRight: '16px',
        '& :hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
        '& :before': {
            borderBottom: 'none',
        },
        '& :after': {
            borderBottom: 'none',
        },
    },
};

const select = (props) => {
    const { classes } = props;

    return (
        <FormControl className={classes.formControl}>
            <Select multiple={props.multiple} value={props.value} renderValue={props.renderValue} inputProps={props.inputProps} onChange={props.changed}>
                {props.children}
            </Select>
        </FormControl>
    )
};

export default React.memo(withStyles(styles)(select));
