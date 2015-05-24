'use strict';

import React from 'react';
import * as R from 'ramda';

import Abilities from './abilities.jsx';
import {Attributes, DerivedAttributes} from './attributes.jsx';
import {TextInput} from './interaction-elements.jsx';
import {someChar} from './storage';

window.React = React;


const CharakterDokument = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
  },
  stateTypes: {
    highlight: React.PropTypes.func,
    model: React.PropTypes.object,
  },
  getInitialState() {
    const highlight = (me) => {
      let fn = R.cond(
        [R.is(Function), R.identity],
        [R.isArrayLike, (ability) => R.either(R.contains(R.__, ability), R.eq(ability))],
        [R.complement(R.isNil), (attr) => R.ifElse(R.isArrayLike, R.any(R.eq(attr)), R.eq(attr))],
        [R.T, R.always])(me || false);
      fn.focus = (newTarget) => this.setState({highlight: highlight(newTarget)});
      return fn;
    };
    return {model: R.assoc('assocPath', (path, value) => {
      this.setState({model: R.assocPath(path, value, this.state.model)});
    }, this.props.model), highlight: highlight(null)};
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
          <DerivedAttributes model={this.state.model} highlight={this.state.highlight} />
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
