import React, {Component} from 'react';
import {Dialog, DialogActions, DialogContent, FormControl, TextField, DialogTitle } from '@material-ui/core';
import Button from '../../../components/Button/Button';
import {actions} from '../../../services';
import {connect} from 'react-redux';

const styles = {
    dialog_title: {
        textAlign: 'center',
        color: '#2B2D39',
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: 0.5,
        padding: '30px 0 0',
    },
    container_dialog: {
        width: 350,
        margin: '26px 58px 28px',
        padding: 0,
    },
    container_btn:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 58px 30px'
    }
};


class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.user.first_name ? this.props.user.first_name : '',
            last_name: this.props.user.last_name ? this.props.user.last_name : '',
            email: this.props.user.email ? this.props.user.email : '',
            phone: this.props.user.phone_number ? this.props.user.phone_number : '',
            role: this.props.user.role ? this.props.user.role : 'admin',
            roles: [
                {
                    value: 'admin',
                    label: 'Admin'
                }
            ],
        };
        this.handleChange = this._handleChange.bind(this);
        this.cancel = this._cancel.bind(this);
        this.edit = this._edit.bind(this);
    }

    _handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    _cancel() {
        this.props.handleClose()
    }

    _edit() {
        let date = {
            first_name   : this.state.first_name,
            last_name    : this.state.last_name,
            email        : this.state.email,
            phone_number : this.state.phone,
        };
        this.props.edit(this.props.user.id, date).then(() => {
            this.props.handleClose();
        }, () => {
            this.props.handleClose();
        });
    }

    render() {
        const {open, handleClose} = this.props;
        const {first_name,last_name, email, phone} = this.state;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='draggable-dialog-title'
            >
                <DialogTitle style={styles.dialog_title}>Edit user</DialogTitle>

                <DialogContent style={styles.container_dialog}>
                    <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                        <FormControl>
                            <TextField
                                id='outlined-full-width'
                                label='First name'
                                value={first_name}
                                onChange={this.handleChange}
                                type='text'
                                name='first_name'
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{width: 170}}
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id='outlined-full-width'
                                label='Last name'
                                value={last_name}
                                onChange={this.handleChange}
                                type='text'
                                name='last_name'
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{width: 170}}
                            />
                        </FormControl>
                    </div>
                    <FormControl fullWidth={true}>
                        <TextField
                            id='outlined-full-width'
                            label='Email'
                            value={email}
                            onChange={this.handleChange}
                            type='email'
                            name='email'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField
                            id='outlined-full-width'
                            label='Phone number'
                            value={phone}
                            onChange={this.handleChange}
                            type='text'
                            name='phone'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                </DialogContent>

                <DialogActions style={styles.container_btn}>
                    <Button color={'gray'} width={'158px'} textTransform={true} clicked={this.cancel}>
                        Cancel
                    </Button>
                    <Button color={'blue'} width={'158px'} textTransform={true} clicked={this.edit} processing={this.props.processing}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        edit: (id, data) => dispatch(actions.SettingsActions.updateUser(id, data)),
    }
}

function mapStateToProps(state)
{
    return {
        processing    : state.settings.create_user_processing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);



