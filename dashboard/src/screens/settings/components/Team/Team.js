import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import Button from '../../../../components/Button/Button';
import CreateUser from "../../dialogs/CreateUser";
import EditUser from "../../dialogs/EditUser";
import UserItem from "./UserItem";

const styles = {
    toolbar: {
        container: {
            height: 85,
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #dfdfdf',
        }
    },
};

class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add_user: false,
            edit_user: false,
            user: ''
        };
        this.handleAdd = this._handleAdd.bind(this);
        this.handleClose = this._handleClose.bind(this);
        this.onEditUser = this._onEditUser.bind(this);

    }
    _handleAdd(payout){
        this.setState({
            add_user: true,
        });
    }
    _handleClose(){
        this.setState({
            add_user: false,
            edit_user: false,
            user: ''
        });
    }

    _onEditUser(user){
        this.setState({
            edit_user: true,
            user: user
        });
    }

    render() {
        const {add_user, edit_user, user} = this.state;
        return (
                <Fragment>
                    <div style={styles.toolbar.container}>
                        <Typography variant="h6">Team</Typography>
                        <Button color={'dark'} width={'158px'} textTransform={true} clicked={this.handleAdd}>Add User</Button>
                    </div>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.users.map((row, index) => (
                                <UserItem key={index} user={row} onEditUser={this.onEditUser}/>
                            ))}
                        </TableBody>
                    </Table>
                    {add_user && <CreateUser open={add_user} handleClose={this.handleClose} />}
                    {edit_user && <EditUser open={edit_user} handleClose={this.handleClose} user={user}/>}
                </Fragment>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

function mapStateToProps(state)
{
    return {
        users         : state.settings.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
