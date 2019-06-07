import React, { Component } from 'react';
import LocationPicker from './LocationPicker';

function validateForm(data) {
  if (!data.text || !data.text.length) {
    return {
      text: 'required'
    }
  }
}

class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      note: props.note
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(this.state.note) || {}

    if (Object.keys(errors).length) {
      return this.setState({ errors })
    }

    this.props.onSubmit(this.state.note)
  }

  handleTextChange(e) {
    this.setState({
      note: Object.assign({}, this.state.note, {
        text: e.target.value,
      }),
      errors: Object.assign({}, this.state.errors, { text: null })
    })
  }

  handleLatLngChange(latLng) {
    this.setState({
      note: Object.assign({}, this.state.note, {
        latLng
      })
    })
  }

  handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this note?")) {
      this.props.onDelete(this.state.note)
    }
  }

  render() {
    const { note, errors } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <div>
            <LocationPicker
              latLng={ note.latLng }
              onChange={ this.handleLatLngChange.bind(this) }
            />
            <div style={{ margin: '1em 0' }}>
              <textarea
                style={{
                  width: '300px',
                  minHeight: '100px'
                }}
                onChange={ this.handleTextChange.bind(this) }
                defaultValue={ note.text }
                placeholder="Add text here..."
              />
              { errors.text &&
                <div className="danger"> { errors.text } </div>
              }
            </div>
          </div>
          <input type="submit"/>
          &nbsp;
          &nbsp;
          <a onClick={ this.props.onCancel }>
            Cancel
          </a>
          { note.id &&
            <div style={{marginTop: '1em'}}>
              <a className="danger" onClick={ this.handleDeleteClick.bind(this) }>
                Delete Note
              </a>
            </div>
          }
        </form>
      </div>
    )
  }
}

export default NoteDetail;
