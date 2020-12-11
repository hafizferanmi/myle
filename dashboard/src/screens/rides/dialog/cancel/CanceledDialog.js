import React, {Fragment, PureComponent} from 'react';
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Radio,
    FormControlLabel,
    RadioGroup,
    TextField
} from '@material-ui/core';
import Button from '../../../../components/Button/Button';
import './cancel-ride-dialog.scss'
import {actions} from '../../../../services';
import {connect} from 'react-redux';
import * as FuseActions from '../../../../services/fuse/actions';

class CanceledDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: '',
            status: ''
        };
        this.confirm = this._confirm.bind(this);
        this.cancel  = this._cancel.bind(this);
    }

    _confirm() {
        if(this.state.note.length > 5 || this.state.status) {
            this.props.updateRide(this.props.ride_id, {
                status: this.state.status,
                reason: this.state.note
            });
            this.props.dispatch(FuseActions.closeRidesDialog());
        }
    }

    _cancel() {
        this.props.dispatch(FuseActions.closeRidesDialog());
    }

    change = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <Fragment>
                <DialogTitle className='cancel-title'>Cancel Ride</DialogTitle>
                <DialogContent>
                    <DialogContentText className='cancel-description'>
                        Specify the reason for the cancellation of the trip
                    </DialogContentText>
                    <RadioGroup aria-label='status' name='status' value={this.state.status} onChange={this.change}
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <FormControlLabel
                            value='rider_cancel'
                            control={<Radio color='primary' />}
                            label='Rider Canceled'
                        />
                        <FormControlLabel
                            value='driver_cancel'
                            control={<Radio color='primary' />}
                            label='Driver NO SHOW'
                        />
                        <FormControlLabel
                            value='company_cancel'
                            control={<Radio color='primary' />}
                            label='Company Cancel'
                        />
                    </RadioGroup>
                    <TextField
                        autoFocus
                        multiline
                        rows='4'
                        name='note'
                        className='cancel-note'
                        margin='normal'
                        variant='outlined'
                        id='outlined-multiline-static'
                        placeholder='Passenger canceled because didnt want wait driver'
                        onChange={this.change}
                    />
                </DialogContent>
                <DialogActions className='cancel-container-btn'>
                    <Button color={'gray'} width={'158px'} textTransform={true} clicked={this.cancel}>
                        CANCEL
                    </Button>
                    <Button color={'blue'}
                            width={'158px'}
                            textTransform={true}
                            clicked={this.confirm}
                            disabled={this.state.note.length < 5 || !this.state.status}>
                        Confirm
                    </Button>
                </DialogActions>
            </Fragment>
        )
    }
}




function mapStateToProps(state)
{
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateRide: (ride_id, options) => dispatch(actions.RidesActions.updateRide(ride_id, options)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanceledDialog);


