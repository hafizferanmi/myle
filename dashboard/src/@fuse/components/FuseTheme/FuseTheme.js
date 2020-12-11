import React from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

function FuseTheme({children, mainTheme})
{
    return (
        <MuiThemeProvider theme={mainTheme}>
            {children}
        </MuiThemeProvider>
    )
}

function mapStateToProps({FuseReducer})
{
    return {
        mainTheme: FuseReducer.settings.mainTheme
    }
}

export default withRouter(connect(mapStateToProps)(FuseTheme));
