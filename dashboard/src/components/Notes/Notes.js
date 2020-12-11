import React from 'react';
import {TextField} from '@material-ui/core';

import moment from 'moment-timezone';
import {connect} from "react-redux";
import './notes.scss';

import {actions} from "../../services";


import { withStyles } from '@material-ui/core/styles';

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

  render() {
    const { notes } = this.props;
    const { focused, note } = this.state;

    const notes_formatted = notes.map((note, index) => {
        return (
          <div className="note-item" key={index}>
                <p className="note-body">{note.body}</p>
                <p className="note-date">{moment(note.created_at).format('MMM Do YY h:mm a')}
                    {note.added_by&&<span className="person">{` by ${note.added_by}`}</span>}
                </p>
          </div>)
    });

  return (
    <div className="notes-container">
      <div className="create-note-field">
        <TextField
            fullWidth
            label={focused || !!note?"Comment":"Type and Press enter"}
            placeholder="Type and Press enter"
            id="note-field"
            margin="normal"
            variant="outlined"
            InputProps={{
                value          : this.state.note,
                onChange       : this.handleChange,
                onFocus        : this.showSearch,
                onBlur         : this.handleBlur,
            }}
        />
      </div>
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
