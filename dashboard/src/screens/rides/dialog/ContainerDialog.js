import React from 'react';
import {Dialog} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from "../../../services/index";


const ContainerDialog = (props) => {
    return (
        <Dialog
            open={props.state}
            onClose={props.closeDialog}
            maxWidth={'xl'}
            className={'assign-dialog'}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...props.options}
        />
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeDialog: actions.FuseActions.closeRidesDialog
    }, dispatch);
}

function mapStateToProps({FuseReducer})
{
    return {
        state  : FuseReducer.dialog.stateRides,
        options: FuseReducer.dialog.optionsRides
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDialog);
