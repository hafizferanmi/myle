import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {actions} from '../services';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class NotificationsComponent extends Component {

    constructor(props) {
        super(props);
        this.destroy = this._destroy.bind(this);
    }


  _destroy(notification) {
        this.props.clearNotification(notification);
  }

  render() {

      const {classes} = this.props;

      return (
        <div>
            {this.props.notifications.map((notification, index) => {

                const variant = notification.variant;
                const Icon = variantIcon[variant];

                return (
                    <Snackbar
                        key={index}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={true}
                        autoHideDuration={6000}
                        onClose={_ => this.destroy(notification)}
                    >
                        <SnackbarContent
                            className={clsx(classes[variant])}
                            message={
                                <span className={classes.message}>
                                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                        {notification.body}
                                </span>
                            }
                            action={[
                                <IconButton
                                    key='close'
                                    aria-label='Close'
                                    color='inherit'
                                    onClick={_ => this.destroy(notification)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            ]}
                        />
                    </Snackbar>
                )
            })}
        </div>
      );
  }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        clearNotification: (notification) => dispatch(actions.NotificationsActions.clearNotification(notification))
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications.notifications
    };
}

const Notifications = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent));
export default Notifications;
