'use strict';

import React from 'react';
import * as R from 'ramda';

import Abilities from './abilities.jsx';
import Attributes from './attributes.jsx';
import {TextInput} from './interaction-elements.jsx';
import {someChar} from './storage';

window.React = React;

const CharakterDokument = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
  },
  getInitialState() {
    const decorateStateArray = (array) => {
      array.highlight = (arg) => this.setState({highlight:
        decorateStateArray(this.state.highlight.concat(arg))});
      array.downlight = (arg) => {
        var highlight = decorateStateArray(
          R.reject(
            R.ifElse(
              R.isArrayLike,
              R.compose(R.any, R.eq),
              R.eq)
                (arg),
            this.state.highlight))
        return this.setState({highlight});
      }
      return array;
    };
    return {model: R.assoc('assocPath', (path, value) => {
      this.setState({model: R.assocPath(path, value, this.state.model)});
    }, this.props.model), highlight: decorateStateArray([])};
  },

  render() {
    return (
      <div className="char-document">
        <div className="char-background">
          <Name model={this.state.model} highlight={this.state.highlight} />
        </div>
        <div className="char-attributes">
          <Attributes model={this.state.model} highlight={this.state.highlight} />
        </div>
        <div className="char-derived-attributes">
        </div>
        <div className="char-abilities">
          <Abilities model={this.state.model} highlight={this.state.highlight} />
        </div>
      </div>
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

React.render(
  <CharakterDokument model={someChar} />,
  document.getElementById('content')
);
