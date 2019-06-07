import React from 'react';
import { Link } from 'react-router-dom';

import { generateStaticMapboxURL } from '../lib/util';

const thumbnailSize = 200;

const NoteItem = (note) => {
  const { id, text, latLng } = note;
  const imgUrl = generateStaticMapboxURL({ latLng, size: `${thumbnailSize}x${thumbnailSize}` });

  return (
    <Link className="note-item" to={`/${id}`}>
      <div className="grid">
        <p className="note-text"> { text } </p>
        <div className="align-right">
          <img
            alt={`${JSON.stringify(latLng)}`}
            style={{width: thumbnailSize, height: thumbnailSize}}
            src={imgUrl}
          />
        </div>
      </div>
    </Link>
  )
}

const BlankSlate = () =>
  <div>
    <h3>
      <em>No notes here</em>
    </h3>
    <br/>
    <Link to="/new">+ Add note</Link>
  </div>

const NoteIndex = ({ notes = [] }) =>
  <div>
    { notes.length ?
      notes.map(note => <NoteItem key={note.id} {...note} /> )
      :
      <BlankSlate/>
    }
  </div>

export default NoteIndex;
