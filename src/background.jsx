import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber, TextInput} from './interaction-elements.jsx';

import splittermond from './splittermond';

const CharBackground = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func,
    model: React.PropTypes.object,
  },

  render() {
    return (
      <Name {...this.props}/>
    );
  }
});

const Name = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
  },
  renameTo(name) {
    this.props.model.assocPath(['name'], name);
  },

  render() {
    return (
      <label className="char-name">
      Name: <TextInput content={this.props.model.name} onChange={this.renameTo} />
      </label>
    );
  }
});

export default CharBackground;
export {CharBackground, Name};

