import React, {Component} from 'react';
import { TableCell, TableRow } from '@material-ui/core';

const styles = {
    row: {
        cursor: "pointer"
    },
    online: {
        height: 25,
        width: 78,
        borderRadius: 2,
        backgroundColor: "#85C63A",
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: "25px"
    },
    offline: {
        height: 25,
        width: 78,
        borderRadius: 2,
        backgroundColor: "#8E8E93",
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        textAlign: "center",
        lineHeight: "25px"
    }
};

class UserItem extends Component {

    constructor(props) {
        super(props);
        this.handleEditUser       = this._handleEditUser.bind(this);
    }

    _handleEditUser(){
        this.props.onEditUser(this.props.user)
    }

    render() {
        const {user} = this.props;

        return (
            <TableRow style={styles.row} onClick={this.handleEditUser}>
                <TableCell component="th" scope="row">
                    {`${user.first_name} ${user.last_name}`}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>Role</TableCell>
            </TableRow>
        )
    }
}

export default UserItem;
