import {fuseDark} from '@fuse/fuse-colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const themesConfig = {
    myleDark   : {
        palette: {
            type     : 'dark',
            primary  : {
                light: '#FFFFFF',
                main : "#FFFFFF",
                dark : '#181D1B',
                contrastText: '#8a8a8a'

            },
            secondary: {
                light: '#FFFFFF',
                main : '#8a8a8a',
                dark : '#181D1B',
                contrastText: '#FFFFFF'
            },
            background: {
                paper: "#181D1B",
                default: "#181D1B"
            },
            text : {
                disabled: "rgba(255, 255, 255, 0.5)",
                hint: "rgba(255, 255, 255, 0.5)",
                icon: "rgba(255, 255, 255, 0.5)",
                primary: "#FFFFFF",
                secondary: "rgba(255, 255, 255, 0.5)",
            },
            // divider: "rgba(0, 0, 0, 0.12)",
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    myleLight: {
        palette: {
            primary  : {
                light: '#FFFFFF',
                main : '#000000',
                dark : '#000000'
                // contrastText: '#8a8a8a'

            },
            text : {
                primary: "rgba(0,0,0,0.60)",
                secondary: "rgba(0,0,0,0.87)",
            },
            background: {
                default: "#F5F6FB",
                selected: "#FFFFFF",
            },
            btn: {
                background: {
                    main: '#000000',
                    light: "#FFFFFF"
                },
                color: {
                    main: "#FFFFFF",
                    light: '#000000'
                }
            },
            status: {
                pending: '#FFECB3',
                assigned: '#FFECB3',
                in_progress: 'rgba(70,152,224,.12)',
                finished: '#F5F5F5',
                accepted: '#E8F5E9',
                arriving: '#C7F09D',
                driver_canceled: '#FCE4EC',
                user_canceled: '#FFFFFF',
                company_canceled: '#FFFFFF',
                color: {
                    pending: '#FFB300',
                    assigned: '#FFB300',
                    in_progress: '#4d6cc8',
                    finished: '#9E9E9E',
                    accepted: '#4CAF50',
                    arriving: '#4CAF50',
                    driver_canceled: '#D0021B',
                    user_canceled: '#9E9E9E',
                    company_canceled: '#9E9E9E',
                }
            },
            icon_color: {
                wav: '#000000',
                pending: '#FFB300',
                assigned: '#FFB300',
                driver_canceled: '#D0021B',
                user_canceled: 'rgba(0,0,0,0.25)',
                company_canceled: 'rgba(0,0,0,0.25)',
                finished: '#9E9E9E',
                dropoff: '#4d6cc8',
                pickup: '#4CAF50',
                arriving: '#4CAF50',
                accepted: '#4CAF50',
            }
        }
    },
    default    : {
        palette: {
            type     : 'light',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    sunset     : {
        palette: {
            type     : 'light',
            primary  : {
                light: '#ff908b',
                main : '#d0605e',
                dark : '#9b3134'
            },
            secondary: {
                light       : '#c76a1d',
                main        : '#ff994c',
                dark        : '#ffca7b',
                contrastText: '#fff'
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    greeny     : {
        palette: {
            type     : 'light',
            primary  : {
                light: '#6cabd4',
                main : '#387ca3',
                dark : '#005074'
            },
            secondary: {
                light       : '#89f6cf',
                main        : '#55c39e',
                dark        : '#159270',
                contrastText: '#fff'
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    beach      : {
        palette: {
            type     : 'light',
            primary  : {
                light       : '#c4d8dd',
                main        : '#93a7ab',
                dark        : '#65787c',
                contrastText: '#fff'
            },
            secondary: {
                light       : '#ffb281',
                main        : '#f18153',
                dark        : '#ba5228',
                contrastText: '#fff'
            }
        }
    },
    tech       : {
        palette: {
            type     : 'light',
            primary  : {
                light       : '#87efff',
                main        : '#4dbce9',
                dark        : '#008cb7',
                contrastText: '#fff'
            },
            secondary: {
                light: '#ffff83',
                main : '#d1e751',
                dark : '#9db516'
            }
        }
    },
    sweetHues  : {
        palette: {
            type     : 'light',
            primary  : {
                light       : '#d5c1eb',
                main        : '#a391b9',
                dark        : '#746389',
                contrastText: '#fff'
            },
            secondary: {
                light: '#90afd4',
                main : '#6080a3',
                dark : '#325474'
            }
        }
    },
    defaultDark: {
        palette: {
            type     : 'dark',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    deepOcean  : {
        palette: {
            type     : 'dark',
            primary  : {
                light: '#8f53e7',
                main : '#5a24b4',
                dark : '#1e0083'
            },
            secondary: {
                light       : '#ff61ff',
                main        : '#fe00e9',
                dark        : '#c600b6',
                contrastText: '#fff'
            }
        }
    },
    slate      : {
        palette: {
            type     : 'dark',
            primary  : {
                light: '#86fff7',
                main : '#4ecdc4',
                dark : '#009b94'
            },
            secondary: {
                light       : '#ff9d99',
                main        : '#ff6b6b',
                dark        : '#c73840',
                contrastText: '#fff'
            }
        }
    }
};

export default themesConfig;
