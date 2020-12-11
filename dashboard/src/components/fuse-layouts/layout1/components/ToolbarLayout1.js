import React, {PureComponent} from 'react';
import {
    AppBar,
    Toolbar,
    BottomNavigation,
    BottomNavigationAction,
    MenuItem,
    withStyles,
    Icon
} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import {actions} from "../../../../services";
import history from "../../../../history";
import moment from 'moment-timezone';
import Select from "../../../Select/Select";
import * as FuseActions from "../../../../services/fuse/actions";
import CreateRideDialog from "../../../CreateRide/CreateRide";

const styles = theme =>  (
    {
        app_bar: {
            display: 'flex',
            zIndex: 10,
            height: '60px',
            boxShadow: '0 0 2px 0 rgba(0,0,0,0.50)'
        },
        tool_bar: {
            minHeight: '60px',
            maxHeight: '60px',
            padding: 0,
        },
        myle_logo: {
            margin: '0 30px 0 41px'
        },
        bottom_navigation: {
            height: '60px',
            '& .Mui-selected': {
                '& .Mui-selected': {
                    fontSize: 20,
                    lineHeight: 1.3,
                    opacity: '1',
                    padding: '12px 0 15px',
                    borderBottom: '2px solid #FFF'
                }
            },
            textTransform: 'capitalize',
        },
        bottom_navigation_label: {
            '& span span': {
                fontSize: 20
            }
        },
        widget: {
            display: "flex",
            alignItems: "center"
        },
        time: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            letterSpacing: '0.45px',
            textAlign: 'center',
            lineHeight: '16px',
            marginLeft: '7px',

        },
        user_inform: {
            height: '32px',
            width: '32px',
            margin: '0 16px 0 20px',
            background: 'rgba(216,216,216,0.20)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',

            fontSize: "12px",
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.4px',
            textAlign: 'center',
        },
        indicator: {
            height: '12px',
            width: '12px',
            border: ' 2px solid #212121',
            borderRadius: '50%',
            position: 'absolute',
            right: 0,
            bottom: 0,

        },
        mat_slide_toggle:{
            fontSize: 12,
            marginRight: 15,
            color: "rgba(255, 255, 255, 0.5)"
        },
        logout_icons:{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: 32,
            marginRight: 15,
            cursor: "pointer"
        },
        bottom_create_ride: {
            height: '40px',
            width: '155px',
            background: 'rgba(216,216,216,0.20)',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            fontSize: "18px",
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.4px',
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
                color: "#ffffff",
            },
        },
        add_circle_icon: {
            color: '#536DFE',
            fontSize: '30px',
            margin: '0 7px'
        },
    }
);

class ToolbarLayout1 extends PureComponent {

    constructor(props) {
        super(props);
        this.updateStatus         = this._updateStatus.bind(this);
        this.logout               = this._logout.bind(this);
        this.handleChangeCompany  = this._handleChangeCompany.bind(this);

        this.state = {
            company: props.company ? props.company.name : '',
            currentTime: moment.tz("America/New_York").format('LT')
        }

    };

    _updateStatus() {
        if(!this.props.user.processing){
            let newStatus = {online: !this.props.user.online};
            this.props.updateStatus(newStatus);
        }
    }

    _logout(){
        this.props.logout();
    }

    _handleChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
        let companies = [...this.props.companies];
        let company = companies.filter(item =>
            (item.name&& (item.name).indexOf(e.target.value)>=0)
        );
        company = company[0];
        this.props.selectCompany(company);
    }

    componentDidMount() {
        this.intervalIdx = setInterval(() => this.setState ({
            currentTime: moment.tz("America/New_York").format('LT')
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalIdx);
    }

    createRideDialog = () => {
        this.props.dispatch(FuseActions.openDialog({
            fullScreen: false,
            maxWidth: 'xl',
            children: (
                <React.Fragment>
                    <CreateRideDialog />
                </React.Fragment>
            )
        }));
    };

    render(){
        const { classes, user, companies, toolbarTheme} = this.props;
        const { currentTime, company } = this.state;

        let user_inform = null;
        if(user){

            let initials = [...user.first_name][0] + [...user.last_name][0];
            user_inform = <div className={classes.widget}>
                            <Select value={company}
                                    changed={this.handleChangeCompany}
                            >
                                {companies.map((company, index) => {
                                    return (
                                        <MenuItem key={index} value={company.name}>{company.name}</MenuItem>
                                    )
                                })}
                            </Select>

                            <div className={classes.time}>{currentTime}</div>

                            <div className={classes.user_inform}>
                                {initials.toUpperCase()}
                                <div className={classes.indicator} style={{background: user.online ? '#06CB7C' : '#cb0f15'}}/>
                            </div>
                        </div>
        }

        return (
            <ThemeProvider theme={toolbarTheme}>
                <AppBar id="fuse-toolbar" className={classes.app_bar} position="relative" color={'inherit'}>
                    <Toolbar className={classes.tool_bar}>
                        <div className="flex flex-1 items-center">
                            <img className={classes.myle_logo} src="assets/images/logos/myle-logo.svg" alt="logo"/>
                            <BottomNavigation
                                value={history.location.pathname}
                                onChange={(event, newValue) => {
                                    history.push(newValue);
                                }}
                                className={classes.bottom_navigation}
                                showLabels
                            >
                                <BottomNavigationAction label="Rides" value="/rides"         className={classes.bottom_navigation_label} />
                                <BottomNavigationAction label="Settings" value="/settings"   className={classes.bottom_navigation_label}/>
                            </BottomNavigation>
                            <div className={classes.bottom_create_ride} onClick={this.createRideDialog}><Icon className={classes.add_circle_icon}>add_circle</Icon>Create ride</div>
                        </div>
                        { user_inform }
                        <Icon className={classes.logout_icons} onClick={this.logout}>logout</Icon>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>

        );

    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateStatus: (filters) => dispatch(actions.AppActions.updateStatus(filters)),
        logout: () => dispatch(actions.LoginActions.logout()),
        selectCompany: (company) => dispatch(actions.AppActions.selectCompany(company, true)),
    }
}

function mapStateToProps(state)
{
    return {
        processing  : state.app.processing,
        user        : state.app.user,
        company     : state.app.company,
        companies   : state.app.companies,
        toolbarTheme: state.FuseReducer.settings.toolbarTheme
    }
}
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolbarLayout1)));
