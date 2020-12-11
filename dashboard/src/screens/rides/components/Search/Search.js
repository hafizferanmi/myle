import React, {Component} from 'react';
import {
    withStyles,
    TextField,
    Icon
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const filters = [
    // { key: '', value: ''},
    { key: 'id:', value: 'ID of ride' },
    { key: 'pu:', value: 'Start Address' },
    { key: 'do:', value: 'Destination Address' },
    { key: 'ref:', value: 'Reference ID' },
    { key: 'dname:', value: 'Driver`s Name' },
    { key: 'dphone:', value: 'Driver`s Phone Number' },
    { key: 'uname:', value: 'Rider`s first name' },
    { key: 'uphone:', value: 'Rider`s phone number' },
    { key: 'uref:', value: 'Rider`s reference id' },
    { key: 'carref:', value: 'Car Number' },
];


const styles = {
    root: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        paddingRight: '30px',
        '& .MuiAutocomplete-popupIndicator': {
            display: 'none'
        },
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
        fontSize: '20px',
        color: '#000000',
        letterSpacing: '0.44px',
        textAlign: 'left',

    },
    option: {
        fontSize: '14px',
        color: 'rgba(0,0,0,0.60)',
        letterSpacing: '0.25px',
        lineHeight: '20px',
    },
    key: {
        background: '#F5F6FB',
        borderRadius: '4px',
        padding: '1px 4px',
        marginRight: '10px'
    },
    noOptions : {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        padding: '9px 16px',
        margin: '-9px -16px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.60)',
        letterSpacing: '0.25px',
        lineHeight: '20px',
    }

};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_value: '',
            focused: false,
            enter: false,
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
        });
    }

    getSearchText(){
        let result = this.state.search_value;

        filters.map(value => {
            if(result.search(value.key) === 0){
                result = value.key + result.slice(value.key.length)
            }
            return null
        });

        return result

    }

    _handleBlur() {
        let search = this.getSearchText();

        if (this.state.focused ) {
            this.setState({
                focused: false,
                enter: false,
            });
            this.props.updateFilters({search: search,  page: 1});
        }
    }


    showSearch = () => {
        this.setState({
            focused: true,
            enter: true,
        });
        document.addEventListener('keydown', this.enterFunction, false);
    };

    enterFunction = (event) => {
        if ( event.keyCode === 13 && this.state.enter) {

            let page = this.props.page;
            let search = this.getSearchText();

            if(this.props.search_value !== search){
                page = 1;
            }
            this.setState({
                focused: false,
            });
            this.props.updateFilters({search: search,  page: page});

        }
    };

    handleInputChange = (event, value, reason) => {
        if (this.state.search_value === '' && reason === 'reset') {
            this.setState({
                search_value: value,
                focused: true
            });
        }
        if (reason !== 'reset') {
            this.setState({
                search_value: value,
                focused: true
            });
        }
    };


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <Icon className={classes.icon} color='action'>search</Icon>

                <Autocomplete
                    id="autocomplete-select"
                    style={{ width: '100%'}}
                    options={filters}
                    inputValue={this.state.search_value}
                    open={this.state.focused}
                    classes={{
                        option: classes.option,
                    }}
                    clearOnEscape={true}
                    disableCloseOnSelect={true}
                    getOptionDisabled={option => option.key === null}
                    getOptionLabel={option => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        return option.key;
                    }}
                    noOptionsText={<div className={classes.noOptions}>Show all results for {this.state.search_value}</div>}
                    onInputChange={this.handleInputChange}


                    renderOption={option => {
                        if(option.key === null){
                            return 'Suggested Filters'
                        }
                        return (
                            <React.Fragment>
                                <span className={classes.key}>{option.key}</span>
                                {option.value}
                            </React.Fragment>
                        )
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            placeholder='Search by date, name, amount, car, type…'
                            fullWidth
                            inputProps={{
                                ...params.inputProps,
                                onFocus     : this.showSearch,
                                autoComplete: 'off',
                            }}
                            onBlur={this.handleBlur}
                        />
                    )}
                />
            </div>

        );
    }
}

export default withStyles(styles)(Search);
