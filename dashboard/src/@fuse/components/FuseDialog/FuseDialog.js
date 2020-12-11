import React from 'react';
import {Dialog} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from "../../../services";

const FuseDialog = (props) => {
    return (
        <Dialog
            open={props.state}
            onClose={props.closeDialog}
            aria-labelledby="fuse-dialog-title"
            {...props.options}
        />
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeDialog: actions.FuseActions.closeDialog
    }, dispatch);
}

function mapStateToProps({FuseReducer})
{
    return {
        state  : FuseReducer.dialog.state,
        options: FuseReducer.dialog.options
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FuseDialog);
