import React, {Component} from 'react';
import {
    withStyles,
    Icon,
    TextField,
} from '@material-ui/core';
import classNames from 'classnames';


const styles = {
    root: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        paddingRight: '10px',
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-focused:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
    },
    icon: {
        margin: '10px',
        padding: 0,
        fontSize: '24px',
        color: '#000000',
        opacity: 0.3,
    },
    input:{
        fontSize: '20px',
        letterSpacing: '0.44px',
        lineHeight: '16px',
        fontStyle: 'italic'
    },
    '& input:placeholder': {
        opacity: 0.38,
        fontSize: '14px',
        color: '#000000',
        letterSpacing: '0.44px',
        textAlign: 'left',
        lineHeight: '28px',
        fontFamily: 'Roboto-Italic'

    },
    dialog: {
        input : {
            borderRadius: "5px"
        }
    }
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            focused: false,
            instant: props.instant ? props.instant : false
        };
        this.handleChange = this._handleChange.bind(this);
        this.handleBlur   = this._handleBlur.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.search_value &&  nextProps.search_value !== this.state.search_value){
            this.setState({
                search_value: nextProps.search_value
            })
        }
    }

    _handleChange(e) {
        this.setState({
            search_value: e.target.value
        }, () => {
            if(this.props.instant) {
                this.props.updateFilters({search: this.state.search_value,  page: 1});
            }
        });
    }

    _handleBlur() {
        if (this.state.focused ) {
            this.props.updateFilters({search: this.state.search_value,  page: 1});
        }
        this.setState({ focused: false });
    }

    showSearch = () => {
        this.setState({ focused: true });
        document.addEventListener('keydown', this.enterFunction, false);
    };

    enterFunction = (event) => {
        if ( event.keyCode === 13 && this.state.focused) {
            let page = this.props.page;
            if(this.props.search_value !== this.state.search_value){
                page = 1;
            }
            this.props.updateFilters({search: this.state.search_value,  page: page});
        }
    };

    render() {
        const {classes, placeholder='Search', dialog, className} = this.props;

        if (dialog) {
            return (
                <div className={classNames("flex items-center w-full", className)}>
                    <div className="w-full relative">
                        <TextField
                            fullWidth
                            InputProps={{
                                placeholder    : placeholder,
                                value          : this.state.search_value,
                                onChange       : this.handleChange,
                                onFocus        : this.showSearch,
                                autoFocus      : false,
                                classes : {
                                    input         : classNames(classes.dialog.input, "py-0 px-14 h-40 pr-40"),
                                    notchedOutline: "rounded-8",
                                }
                            }}
                            variant="outlined"
                            onBlur={this.handleBlur}
                        />
                    </div>
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <Icon className={classes.icon} color='action'>search</Icon>
                <TextField
                    fullWidth
                    InputProps={{
                        placeholder    : placeholder,
                        value          : this.state.search_value,
                        onChange       : this.handleChange,
                        onFocus        : this.showSearch,
                        autoFocus      : false,
                        classes : {
                            borderBottom: null,
                            input         : classNames(classes.input, 'py-0 px-14 h-40 pr-40'),
                        }
                    }}
                    onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Search);
