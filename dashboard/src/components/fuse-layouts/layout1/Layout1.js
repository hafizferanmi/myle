import React from 'react';
import {withRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import {makeStyles} from '@material-ui/styles';
import {FuseScrollbars, FuseMessage, FuseDialog, FuseSuspense} from '@fuse';
import {connect} from 'react-redux';
import ToolbarLayout1 from './components/ToolbarLayout1';
import LeftSideLayout1 from './components/LeftSideLayout1';
import RightSideLayout1 from './components/RightSideLayout1';
import NavbarWrapperLayout1 from './components/NavbarWrapperLayout1';
import SettingsPanel from '../shared-components/SettingsPanel';
import clsx from 'clsx';

import AppContext from '../../../AppContext';


const useStyles = makeStyles(theme => ({
    root          : {
        position          : 'relative',
        display           : 'flex',
        flexDirection     : 'row',
        width             : '100%',
        height            : '100%',
        overflow          : 'hidden',
        backgroundColor   : theme.palette.background.default,
        color             : theme.palette.text.primary,
        '&.boxed'         : {
            maxWidth : 1280,
            margin   : '0 auto',
            boxShadow: theme.shadows[3]
        },
        '&.scroll-body'   : {
            '& $wrapper'       : {
                height  : 'auto',
                flex    : '0 0 auto',
                overflow: 'auto'
            },
            '& $contentWrapper': {},
            '& $content'       : {}
        },
        '&.scroll-content': {
            '& $wrapper'       : {},
            '& $contentWrapper': {},
            '& $content'       : {}
        }
    },
    wrapper       : {
        display : 'flex',
        position: 'relative',
        width   : '100%',
        height  : '100%',
        flex    : '1 1 auto',
    },
    contentWrapper: {
        display      : 'flex',
        flexDirection: 'column',
        position     : 'relative',
        zIndex       : 3,
        overflow     : 'hidden',
        flex         : '1 1 auto'
    },
    content       : {
        position                    : 'relative',
        display                     : 'flex',
        overflow                    : 'auto',
        flex                        : '1 1 auto',
        flexDirection               : 'column',
        width                       : '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex       : 2
    }
}));

const Layout1 = (props) => {
    const classes = useStyles(props);
    const config = props.settings.layout.config;

    switch ( config.scroll )
    {
        case 'body':
        {
            return (
                <AppContext.Consumer>
                    {({routes}) => (
                        <div id="fuse-layout" className={clsx(classes.root, config.mode, 'scroll-' + config.scroll)}>

                            {config.leftSidePanel.display && (
                                <LeftSideLayout1/>
                            )}

                            <div className="flex flex-1 flex-col overflow-hidden relative">

                                {config.toolbar.display && config.toolbar.style === 'fixed' && config.toolbar.position === 'above' && (
                                    <ToolbarLayout1/>
                                )}

                                <FuseScrollbars className="overflow-auto">

                                    {config.toolbar.display && config.toolbar.style !== 'fixed' && config.toolbar.position === 'above' && (
                                        <ToolbarLayout1/>
                                    )}

                                    <div className={classes.wrapper}>

                                        {config.navbar.display && config.navbar.position === 'left' && (
                                            <NavbarWrapperLayout1/>
                                        )}

                                        <div className={classes.contentWrapper}>

                                            {config.toolbar.display && config.toolbar.position === 'below' && (
                                                <ToolbarLayout1/>
                                            )}

                                            <div className={classes.content}>
                                                <FuseDialog/>
                                                {renderRoutes(routes)}
                                                {props.children}
                                            </div>
                                        </div>

                                        {config.navbar.display && config.navbar.position === 'right' && (
                                            <NavbarWrapperLayout1/>
                                        )}
                                    </div>
                                </FuseScrollbars>
                                <SettingsPanel/>
                            </div>

                            {config.rightSidePanel.display && (
                                <RightSideLayout1/>
                            )}

                            <FuseMessage/>

                        </div>
                    )}
                </AppContext.Consumer>
            );
        }
        case 'content':
        default:
        {
            return (
                <AppContext.Consumer>
                    {({routes}) => (
                        <div id="fuse-layout" className={clsx(classes.root, config.mode, 'scroll-' + config.scroll)}>
                            {config.leftSidePanel.display && (
                                <LeftSideLayout1/>
                            )}

                            <div className="flex flex-1 flex-col overflow-hidden relative">

                                {config.toolbar.display && config.toolbar.position === 'above' && (
                                    <ToolbarLayout1/>
                                )}

                                <div className={classes.wrapper}>

                                    {config.navbar.display && config.navbar.position === 'left' && (
                                        <NavbarWrapperLayout1/>
                                    )}

                                    <div className={classes.contentWrapper}>
                                        {config.toolbar.display && config.toolbar.position === 'below' && config.toolbar.style === 'fixed' && (
                                            <ToolbarLayout1/>
                                        )}

                                        <FuseScrollbars className={classes.content} scrollToTopOnChildChange>
                                            {config.toolbar.display && config.toolbar.position === 'below' && config.toolbar.style !== 'fixed' && (
                                                <ToolbarLayout1/>
                                            )}

                                            <FuseDialog/>

                                            <FuseSuspense>
                                                {renderRoutes(routes)}
                                            </FuseSuspense>

                                            {props.children}

                                        </FuseScrollbars>

                                        {/*<SettingsPanel/>*/}
                                    </div>

                                    {config.navbar.display && config.navbar.position === 'right' && (
                                        <NavbarWrapperLayout1/>
                                    )}
                                </div>
                            </div>

                            {config.rightSidePanel.display && (
                                <RightSideLayout1/>
                            )}

                            <FuseMessage/>
                        </div>
                    )}
                </AppContext.Consumer>
            );
        }
    }
};

function mapStateToProps({FuseReducer})
{
    return {
        settings: FuseReducer.settings.current
    }
}

export default withRouter(connect(mapStateToProps)(Layout1));
