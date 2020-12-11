import React, { Fragment } from "react";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


function DateTime({value, onChange}) {
    return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Fragment>
                    <DateTimePicker
                        margin="normal"
                        label="Date and time to pickup"
                        inputVariant="outlined"
                        value={value}
                        onChange={onChange}
                    />
                </Fragment>
            </MuiPickersUtilsProvider>
    );
}

export default DateTime;