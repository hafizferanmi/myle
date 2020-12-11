import React, {Fragment, PureComponent} from 'react';
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';
import Button from '../../../../components/Button/Button';
import './revive-ride-dialog.scss'
import {actions} from '../../../../services';
import {connect} from 'react-redux';
import * as FuseActions from '../../../../services/fuse/actions';

class ReviveDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            note: '',
        };
        this.confirm = this._confirm.bind(this);
        this.cancel  = this._cancel.bind(this);
    }

    _confirm() {
        this.props.updateRide(this.props.ride_id, {
            status: 'revive',
            reason: this.state.note
        });
        this.props.dispatch(FuseActions.closeRidesDialog());
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
                <DialogTitle className='revive-title'>Revive Ride</DialogTitle>
                <DialogContent>
                    <DialogContentText className='revive-description'>
                        Specify the reason for the revelation of the trip
                    </DialogContentText>

                    <TextField
                        autoFocus
                        multiline
                        rows='4'
                        name='note'
                        className='revive-note'
                        margin='normal'
                        variant='outlined'
                        id='outlined-multiline-static'
                        placeholder='Ride revived because ...'
                        onChange={this.change}
                    />
                </DialogContent>
                <DialogActions className='revive-container-btn'>
                    <Button color={'gray'} width={'158px'} textTransform={true} clicked={this.cancel}>
                        CANCEL
                    </Button>
                    <Button color={'blue'}
                            width={'158px'}
                            textTransform={true}
                            clicked={this.confirm}
                            disabled={this.state.note.length < 5}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviveDialog);


