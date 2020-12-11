import './styles/index.css';
import 'babel-polyfill'
import 'typeface-muli';
import './utils/react-table-defaults';
import React from 'react';
import {FuseLayout, FuseTheme} from '@fuse';
import JssProvider from 'react-jss/lib/JssProvider';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import history from './history';
import store from './createStore';
import AppContext from 'AppContext';
import routes from './config/routesConfig';
import './utils/i18n';
import { render } from "react-dom";
import Notifications from "./components/Notifications";
import { create } from 'jss';
import jssExtend from 'jss-extend';
import { jssPreset } from '@material-ui/styles';


const jss = create({ plugins: [...jssPreset().plugins, jssExtend()] });


jss.options.insertionPoint = document.getElementById('jss-insertion-point');


render(
    <AppContext.Provider value={{routes}}>
        <JssProvider jss={jss}>
            <Provider store={store}>
                <Router history={history}>
                    <FuseTheme>
                        <FuseLayout />
                        <Notifications/>
                    </FuseTheme>
                </Router>
            </Provider>
        </JssProvider>
    </AppContext.Provider>
    , document.getElementById("root")
);
