import React from 'react';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '../../../../components/Button/Button';
import {actions} from "../../../../services/index";

import './accountSettings.scss';

const styles = {

    textField: {
        maxWidth: 350,
    },
};


class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            number: "",
        };
        this.handleChange = this._handleChange.bind(this);
        this.handleChangePassword = this._handleChangePassword.bind(this);
        this.handleChangeNumber = this._handleChangeNumber.bind(this);
        this.initState = this._initState.bind(this);
        this.handleUpdate = this._handleUpdate.bind(this);

    }
    _initState(){
        this.setState({
            name: `${this.props.user.first_name} ${this.props.user.last_name}`,
            email: this.props.user.email,
            // password: nextProps.user.password,
            number: this.props.user.phone_number,
        })
    }
    _handleChange(event) {
        this.setState({
            error: false,
            [event.target.name]: event.target.value
        })
    }

    _handleChangePassword(){

    }

    _handleChangeNumber(){

    }
    _handleUpdate(){
        let name = this.state.name.split(' ');
        let date = {
            first_name: name[0],
            last_name: name[1] ? name[1] : "",
            email: this.state.email,
            phone_number: this.state.number,
        };
        this.props.updateUser(this.props.user.id, date)
    }

    componentDidMount() {
        if(this.props.user !==null){
            this.initState();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user!==null && nextProps.user !== this.props.user){
            this.setState({
                name: `${nextProps.user.first_name} ${nextProps.user.last_name}`,
                email: nextProps.user.email,
                // password: nextProps.user.password,
                number: nextProps.user.phone_number,
            })
        }
    }

    render() {
        const {name, email, password, number} = this.state;

        return (
            <main className={'account-settings-container'}>
                <div className={'toolbar'}>
                    <Typography variant="h6">Account settings</Typography>
                    <div className={'btn-container'}>
                        <Button color={'gray'} width={'149px'} clicked={this.initState}>Cancel changes</Button>
                        <Button color={'dark'} width={'120px'} clicked={this.handleUpdate}>Update</Button>
                    </div>
                </div>
                <FormGroup className={'form-container'}>
                    <FormControl>
                        <TextField
                            id="standard-name"
                            label="Full name"
                            style={styles.textField}
                            value={name}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            type="text"
                            name="name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="standard-name"
                            label="Email"
                            style={styles.textField}
                            value={email}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            type="text"
                            name="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl style={{flexDirection: "row"}}>
                        <TextField
                            id="standard-name"
                            label="Password"
                            style={styles.textField}
                            value={password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            type="text"
                            name="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className={'btn-container'}>
                            <Button color={'gray'} width={'99px'} clicked={this.handleChangePassword}>Change</Button>
                        </div>
                    </FormControl>
                    <FormControl style={{flexDirection: "row"}}>
                        <TextField
                            id="standard-name"
                            label="Mobile number"
                            placeholder="+1 45 8696960-5"
                            style={styles.textField}
                            value={number}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            type="text"
                            name="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className={'btn-container'}>
                            <Button color={'gray'} width={'99px'} clicked={this.handleChangeNumber}>Change</Button>
                        </div>
                    </FormControl>
                </FormGroup>
            </main>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateUser: (id, date) => dispatch(actions.AppActions.updateUser(id, date)),

    }
}

function mapStateToProps(state)
{
    return {
        user        : state.app.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
