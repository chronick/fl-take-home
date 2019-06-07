# Farm Notes

This is an implementation of the FarmLogs frontend take-home project.

Its intention is to demonstrate the ability of the engineering applicant to
create a functional application from an open-ended [problem statement](https://farmlogs.atlassian.net/browse/ENG-13).

A (close) secondary goal is to demonstrate an applicant's knowledge of various concepts
in Javascript (and React, if used).

The project is time-boxed to approximately a half-day of work.

## Application Design
The high-level problem statement is to create an app that helps farmers
take notes on their fields. This is the app I created to solve this problem.
Users can view a list of their notes, create new notes, as well as update and delete
their notes.

The notes themselves currently contain two elements of information:
  1. A text body of the note itself
  2. A location, represented as geographic coordinates. This allows the user to (roughly) associate their note with a particular field.

### Screenshots

![Imgur](http://i.imgur.com/S9YL26D.png)
![Imgur](http://i.imgur.com/gzHZtz2.png)

## Code Design
I chose to use [React](https://facebook.github.io/react/) to build the app,
using the [create-react-app]() boilerplate as a starting point.

Additionally, I have implemented the app in such a way as to demonstrate knowledge of the following concepts:
  - [Stateful Components with ES2015 class syntax](src/App.js)
  - [Stateless Components](src/components/NoteIndex.js)
  - [Higher-Order Components](lib/withLocation.js)
  - [Forms with validation](src/components/NoteDetail.js)
  - [Geolocation API](src/lib/withLocation.js)
  - [CSS with Flexbox](src/App.css)
  - [Async requests with fetch API](src/lib/withLocation.js)
  - [Unit tests](src/lib/util.test.js)

## Additional Work
Here are some potential avenues of discussion:
  - Scaling the app may required better state management with Redux.
  - Adding a remote backend to persist data between clients
  - Adding tests for react components
  - Implementing a photo upload feature
  - Associating a note with a field geometry (relational data?)
