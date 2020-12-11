import React from 'react';
import {Icon, IconButton} from '@material-ui/core';
import _ from '@lodash';
import {bindActionCreators} from 'redux';
import * as FuseActions from "../../../services/fuse/actions";
import connect from 'react-redux/es/connect/connect';

const NavbarFoldedToggleButton = ({settings, setDefaultSettings, children, className}) => {
    return (
        <IconButton
            className={className}
            onClick={() => {
                setDefaultSettings(_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded));
            }}
            color="inherit"
        >
            {children}
        </IconButton>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setDefaultSettings: FuseActions.setDefaultSettings
    }, dispatch);
}

function mapStateToProps({FuseReducer})
{
    return {
        settings: FuseReducer.settings.current
    }
}

NavbarFoldedToggleButton.defaultProps = {
    children: <Icon>menu</Icon>
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarFoldedToggleButton);
