import React, { Component } from 'react';
import { shape, number, string } from 'prop-types';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import { FAILURE } from './constants';

import withLocation from './lib/withLocation';

import NoteDetail from './components/NoteDetail';
import NoteIndex from './components/NoteIndex';

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleFinishUpdate = this.handleFinishUpdate.bind(this);
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);

    const notes = window.localStorage.getItem('notes');
    this.state = {
      notes: notes ? JSON.parse(notes) : []
    }
  }

  handleNoteUpdate(updatedNote) {
    const notes = this.state.notes.map(note => {
      return note.id === updatedNote.id ? updatedNote : note
    })

    this.setState({ notes }, this.handleFinishUpdate)
  }

  handleNoteAdd(newNote) {
    const highestId = this.state.notes.reduce((a, b) => {
      return a.id > b.id ? a.id : b.id
    }, 0)

    const notes = this.state.notes.concat(Object.assign({}, newNote, { id: highestId + 1 }))

    this.setState({ notes }, this.handleFinishUpdate)
  }

  handleNoteDelete(deletedNote) {
    const notes = this.state.notes.filter(note => {
        return note.id !== deletedNote.id
    })

    this.setState({ notes }, this.handleFinishUpdate)
  }

  handleNoteCancel() {
    window.location.href = "/";
  }

  handleFinishUpdate() {
    window.localStorage.setItem('notes', JSON.stringify(this.state.notes))
    window.location.href = "/";
  }

  render() {
    const { notes } = this.state;

    return (
      <Router>
        <div className="container">
          <div className="grid nav">
            <Link to="/">
              <h1 className="title"> Farm Notes </h1>
            </Link>
            <Link to="/" className="nav-item"> See All Notes </Link>
            <div className="align-right">
              <em className={ this.props.place.status === FAILURE ? 'danger' : '' }>
                { this.props.place.name }
              </em>
              &nbsp;
              &nbsp;
              <Link to="/new" className="nav-item"> + Add Note </Link>
            </div>
          </div>
          <hr/>
          <Switch>
            <Route exact path="/" render={() => {
              return <NoteIndex notes={notes}/>
            }}/>
            <Route path="/new" render={({match}) => {
              const note = {
                text: '',
                latLng: this.props.location
              };
              return (
                <NoteDetail
                  note={note}
                  onSubmit={this.handleNoteAdd}
                  onCancel={this.handleNoteCancel}
                />
              )
            }}/>
            <Route path="/:id" render={({match}) => {
              const [ note ] = notes.filter(note => note.id === +match.params.id)
              return (
                <NoteDetail
                  note={note}
                  onSubmit={this.handleNoteUpdate}
                  onDelete={this.handleNoteDelete}
                  onCancel={this.handleNoteCancel}
                />
              )
            }}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  location: shape({
    lat: number,
    lng: number
  }),
  place: shape({
    status: string,
    name: string
  })
}

export default withLocation(App);
