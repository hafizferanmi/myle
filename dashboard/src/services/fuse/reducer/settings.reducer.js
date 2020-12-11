import * as actionTypes from '../actionTypes';
import FuseLayoutConfigs from 'components/fuse-layouts/FuseLayoutConfigs';
import FuseSettingsConfig from '../../../config/settingsConfig';
import FuseThemesConfig from '../../../config/themesConfig';
import {createMuiTheme} from '@material-ui/core';
import _ from '@lodash';
import {
    defaultSettings,
    getParsedQuerySettings,
    defaultThemes,
    defaultThemeOptions,
    mustHaveThemeOptions,
    extendThemeWithMixins,
    mainThemeVariations
} from '@fuse/FuseDefaultSettings';

const initialSettings = getInitialSettings();
const initialThemes = getInitialThemes();

const initialState = {
    initial : initialSettings,
    defaults: _.merge({}, initialSettings),
    current : _.merge({}, initialSettings),
    themes  : initialThemes,
    ...getThemeOptions(initialThemes, initialSettings)
};

const settings = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.SET_SETTINGS:
        {
            const newSettings = _.merge({}, state.current, action.value && action.value.layout && action.value.layout.style ? {layout: {config: FuseLayoutConfigs[action.value.layout.style].defaults}} : {}, action.value)
            const themes = newSettings.theme.main !== state.current.theme.main ? {...state.themes, ...updateMainThemeVariations(newSettings.theme.main)} : state.themes;
            return {
                ...state,
                current: newSettings,
                themes,
                ...getThemeOptions(themes, newSettings)
            };
        }
        case actionTypes.SET_INITIAL_SETTINGS:
        {
            return _.merge({}, initialState);
        }
        case actionTypes.SET_DEFAULT_SETTINGS:
        {
            const newSettings = _.merge({}, state.defaults, action.value && action.value.layout && action.value.layout.style ? {layout: {config: FuseLayoutConfigs[action.value.layout.style].defaults}} : {}, action.value);
            const themes = newSettings.theme.main !== state.defaults.theme.main ? {...state.themes, ...updateMainThemeVariations(newSettings.theme.main)} : state.themes;
            return {
                ...state,
                defaults: _.merge({}, newSettings),
                current : _.merge({}, newSettings),
                themes,
                ...getThemeOptions(themes, newSettings)
            };
        }
        case actionTypes.RESET_DEFAULT_SETTINGS:
        {
            const themes = {...state.themes, ...updateMainThemeVariations(state.defaults.theme.main)};
            return {
                ...state,
                defaults: _.merge({}, state.defaults),
                current : _.merge({}, state.defaults),
                themes,
                ...getThemeOptions(themes, state.defaults)
            };
        }
        default:
        {
            return state;
        }
    }
};

export default settings;

/**
 * SETTINGS
 */
function getInitialSettings()
{
    const defaultLayoutStyle = (FuseSettingsConfig.layout && FuseSettingsConfig.layout.style) ? FuseSettingsConfig.layout.style : "layout1";
    const layout = {
        style : defaultLayoutStyle,
        config: FuseLayoutConfigs[defaultLayoutStyle].defaults
    };
    return _.merge({}, defaultSettings, {layout}, FuseSettingsConfig, getParsedQuerySettings());
}

/**
 * THEMES
 */
function getInitialThemes()
{
    const themesObj = Object.keys(FuseThemesConfig).length !== 0 ? FuseThemesConfig : defaultThemes;

    const themes = Object.assign({}, ...Object.entries(themesObj).map(([key, value]) => {
            const muiTheme = _.merge({}, defaultThemeOptions, value, mustHaveThemeOptions);
            return {
                [key]: createMuiTheme(_.merge({}, muiTheme, {mixins: extendThemeWithMixins(muiTheme)}))
            }
        }
    ));

    return {
        ...themes,
        ...mainThemeVariations(themesObj[initialSettings.theme.main])
    }
}

function updateMainThemeVariations(mainTheme)
{
    const themesObj = Object.keys(FuseThemesConfig).length !== 0 ? FuseThemesConfig : defaultThemes;
    return mainThemeVariations(themesObj[mainTheme])
}

function getThemeOptions(themes, settings)
{
    return {
        mainTheme   : themes[settings.theme.main],
        navbarTheme : themes[settings.theme.navbar],
        toolbarTheme: themes[settings.theme.toolbar],
        footerTheme : themes[settings.theme.footer],
        ...updateMainThemeVariations(settings.theme.main)
    }
}
