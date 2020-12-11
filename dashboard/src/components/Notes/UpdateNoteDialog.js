import React from 'react';
import {
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
} from '@material-ui/core';
import Button from '../Button/Button';
import * as FuseActions from "../../services/fuse/actions";
import {actions} from "../../services";
import {connect} from "react-redux";
import moment from "moment-timezone";


const styles = {
    dialog: {
        width: 550,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    dialog_title: {
        textAlign: 'center',
        color: '#2B2D39',
        fontSize: 20,
        paddingTop: 33
    },
    dialog_content: {
        width: '100%',
        padding: '0px 28px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container_btn:{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '28px 58px 33px'
    }
};

class UpdateNoteDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: props.note && props.note.body ? props.note.body:'',
        };
        this.handleChange = this._handleChange.bind(this);

    }

    _handleChange(event) {
        this.setState({body: event.target.value});
    }


    handleSubmit = () => {
        const data = {
            ...this.props.note,
            created_at: moment(new Date()).format('YYYY-MM-DD'),
            body: this.state.body,
        };
        this.props.updateNote(data).then(() => {
            this.props.dispatch(FuseActions.closeDialog());
        });
    };

    handleCancel = () => {
        this.props.dispatch(FuseActions.closeDialog());
    };

    render() {

        return (
            <div style={styles.dialog}>
                <DialogTitle style={styles.dialog_title}>
                    Edit Note
                </DialogTitle>
                <DialogContent style={styles.dialog_content}>
                    <FormControl fullWidth>
                        <TextField
                            id='outlined-full-width'
                            label='Note *'
                            value={this.state.body}
                            onChange={this.handleChange}
                            type='text'
                            // style={styles.form.textField}
                            name='body'
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
                    <Button color={'gray'} width={'158px'} textTransform={true} clicked={this.handleCancel}>
                        Cancel
                    </Button>
                    <Button color={'blue'}
                            width={'158px'}
                            textTransform={true}
                            clicked={this.handleSubmit}
                            processing={this.props.processing}
                    >
                        SUBMIT
                    </Button>
                </DialogActions>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        updateNote: (note) => dispatch(actions.NotesActions.updateNote(note))
    }
}

function mapStateToProps(state)
{
    return {
        processing      : state.notes.update_processing,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNoteDialog);
