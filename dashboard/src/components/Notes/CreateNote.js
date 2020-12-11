import React from 'react';
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    Dialog,
    DialogTitle,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import * as FuseActions from "../../services/fuse/actions";
import {actions} from "../../services";
import moment from 'moment-timezone';



const styles = {
    formControl: {
        minWidth: 420,
        fullWidth: true,
        display: 'flex',
    },
};

class CreateNoteDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            body: '',
            category: 'default',
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSave = () => {
        const action_data = {
            entity_type : this.props.data.entity_type,
            entity_id   : this.props.data.entity_id,
            category    : this.state.category,
            body        : this.state.body
        };
        this.props.dispatch(actions.NotesActions.createNote(action_data));
        this.props.dispatch(FuseActions.closeDialog())
    };

    handleClose = () => {
        this.props.dispatch(FuseActions.closeDialog());
    };


    handleCategoryChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { data } = this.props;
        const values = this.state;

        const notes_formatted = data.notes.map((note, index) => {
            return (
                <div className="note" key={index}>
                    <div className="column-layout" >
                        <p className="body">{note.body}</p>
                        <p className="date">{moment(note.created_at).format('MMM Do YY h:mm a')}
                            {note.added_by&&<span className="person">{` by ${note.added_by}`}</span>}
                        </p>
                    </div>
                </div>
            )
        });

        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                maxWidth={'md'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="form-dialog-title" style={{width: 410}}>Note</DialogTitle>
                <DialogContent>
                    <div className="notes">
                        {notes_formatted}
                    </div>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="body"
                        label="Description"
                        fullWidth
                        onChange={this.handleChange('body')}
                    />
                    <FormControl style={styles.formControl}>
                        <InputLabel shrink htmlFor="category-select">{'Category'}</InputLabel>
                        <Select
                            value={values.category}
                            onChange={this.handleCategoryChange}
                            fullWidth
                            inputProps={{
                                name: 'category',
                                id: 'category-select',
                            }}
                        >
                            <MenuItem value="default" key={'default'}>{'Default'}</MenuItem>
                            <MenuItem value="repairs" key={'repairs'}>{'Repairs'}</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        {'Close'}
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        {'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateNoteDialog;