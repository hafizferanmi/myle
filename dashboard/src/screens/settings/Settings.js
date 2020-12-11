import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import {Route, Link as RouterLink} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import history from '../../history';

import Link from '@material-ui/core/Link';
import Team from "./components/Team/Team";
import AccountSettings from "./components/AccountSettings/AccountSettings";

const AdapterLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const styles = {
    sidebar: {
        container: {
            position: 'absolute',
            height: '100%',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #dfdfdf',
            width: 255
        }
    },
    title: {
        container: {
            height: 84,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        text: {
            marginLeft: 15,
            color: "#2B2D39",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 0.5,
            lineHeight: 24,
            marginTop: 15
        }
    },

    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF'
    },
    content: {
        container: {
            marginLeft: 255,
            height: '100%',
            position: 'relative',
        }
    },
    link: {
        textDecoration: 'none',
        color: "#2B2D39",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0.44,
    },
};

export default class Settings extends React.PureComponent {

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.sidebar.container}>
                    <div style={styles.title.container}>
                        <SettingsIcon style={{fontSize: 40}} />
                        <Typography paragraph variant={'h5'} style={styles.title.text}>
                            Settings
                        </Typography>
                    </div>

                    <Divider />

                    <List style={{padding: 0}}>
                        <Link to="/settings/team" color="inherit" component={AdapterLink} style={styles.link}>
                            <ListItem button selected={history.location.pathname === '/settings/team'}>
                                <ListItemIcon>{/*<SupervisedUserCircle />*/}</ListItemIcon>
                                <ListItemText primary={'Team'} />
                            </ListItem>
                        </Link>
                        <Link to="/settings/account" color="inherit" component={AdapterLink} style={styles.link}>
                            <ListItem button selected={history.location.pathname === '/settings/account'}>
                                <ListItemIcon>{/*<AssignmentInd />*/}</ListItemIcon>
                                <ListItemText primary={'Account Settings'} />
                            </ListItem>
                        </Link>
                        <Link to="/settings/billing" color="inherit" component={AdapterLink} style={styles.link}>
                            <ListItem button selected={history.location.pathname === '/settings/billing'}>
                                <ListItemIcon>{/*<AccountBalance />*/}</ListItemIcon>
                                <ListItemText primary={'Billing'} />
                            </ListItem>
                        </Link>
                    </List>
                </div>

                <div style={styles.content.container}>
                    <Route path="/settings/" exact component={Team} />
                    <Route path="/settings/team" exact component={Team} />
                    <Route path="/settings/account" exact component={AccountSettings} />
                </div>

            </div>
        );
    }
};
