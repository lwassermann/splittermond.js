'use strict';

import React from 'react';
import {Router, Route, Link} from 'react-router';

import {CharacterDokument, CharacterDokuments} from './character-document.jsx';

import Fighting from './fighting.jsx';

window.React = React;

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.array
  },

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/chars">Chars</Link></li>
          <li><Link to="/char/1">Charley</Link></li>
          <li><Link to="/fighting">Figthing</Link></li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>);
  }
});

React.render(
  (<Router>
    <Route path="/" component={App}>
      <Route path="chars" component={CharacterDokuments} />
      <Route path="char/:id" component={CharacterDokument} />
      <Route path="fighting" component={Fighting} />
    </Route>
  </Router>),
  document.body
);
