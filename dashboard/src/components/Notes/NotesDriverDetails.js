import React from 'react';
import {
    InputAdornment,
    IconButton,
    FormControl,
    Input,
    Icon
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import moment from 'moment-timezone';
import {connect} from "react-redux";
import './notesDriverDetails.scss';

import {actions} from "../../services";


import { withStyles } from '@material-ui/core/styles';
import * as FuseActions from "../../services/fuse/actions";
import UpdateNoteDialog from "./UpdateNoteDialog";

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class Notes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            note: '',
            category: 'default',
            focused: false,
        };

        this.handleChange = this._handleChange.bind(this);
        this.handleBlur = this._handleBlur.bind(this);
        this.showSearch = this._showSearch.bind(this);
        this.edit = this._edit.bind(this);
    }

    componentDidMount() {
        this.props.getNotes(this.props.entity_id, this.props.entity_type);
    }

    _handleChange(event) {
        this.setState({note: event.target.value});
    }

    _handleBlur() {
        this.setState({ focused: false });
    }

    _showSearch = () => {
        this.setState({ focused: true });
        document.addEventListener("keydown", this.enterFunction, false);
    };

    enterFunction = (event) => {
        if ( this.state.note !== '' && event.keyCode === 13  && this.state.focused ) {
            const action_data = {
                entity_type : this.props.entity_type,
                entity_id   : this.props.entity_id,
                category    : this.state.category,
                body        : this.state.note
            };
            this.props.createNote(action_data);
            document.querySelector("#note-field").blur();
            this.setState({
                focused: false,
                note: '',
            });
            event.preventDefault();
        }
    };

    _edit(note) {
        this.props.dispatch(FuseActions.openDialog({
            fullScreen: false,
            fullWidth: false,
            children: (
                <React.Fragment>
                    <UpdateNoteDialog note={note} />
                </React.Fragment>
            )
        }))
    }

    render() {
        const { notes } = this.props;

        const notes_formatted = notes.map((note, index) => {
            return (
                <div className="note-item" key={index}>
                    <div className="note-body">{note.body}</div>

                    <div className="note-date">
                        <div className="date">{moment(note.created_at).format('MM/DD/Y')} · {moment(note.created_at).format('h:mm a')}</div>

                        {note.added_by&&<span className="person">{note.added_by}</span>}
                        <IconButton size='small'
                                    onClick={_ => this.edit(note)}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                    </div>
                </div>)
        });

        return (
            <div className="notes-container">
                <FormControl fullWidth={true}>
                    <Input
                        className="create-note-field"
                        placeholder={ this.props.placeholder ? this.props.placeholder : "Type and Press enter"}
                        id="note-field"
                        inputProps={{
                            value          : this.state.note,
                            onChange       : this.handleChange,
                            onFocus        : this.showSearch,
                            onBlur         : this.handleBlur,

                        }}
                        endAdornment={
                                <InputAdornment>
                                    <IconButton>
                                        <Send />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                </FormControl>
                <div className="notes-list">
                    {notes_formatted}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        getNotes: (entity_id, entity_type) => dispatch(actions.NotesActions.getNotes(entity_id, entity_type)),
        createNote: (action_data) => dispatch(actions.NotesActions.createNote(action_data)),
    }
}

function mapStateToProps(state)
{
    return {
        notes              : state.notes.notes,
        notes_entity_id    : state.notes.entity_id,
        notes_entity_type  : state.notes.entity_type,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notes) );
