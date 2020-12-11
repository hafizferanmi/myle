import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '../@fuse';
import {rides_config} from "../screens/rides/config";
import {login_config} from '../screens/login/routes';
import {settings_config} from '../screens/settings/config';

const routeConfigs = [
    rides_config,
    login_config,
    settings_config
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    }
];

export default routes;
