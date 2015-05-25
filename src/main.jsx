'use strict';

import React from 'react';
import * as R from 'ramda';

import Abilities from './abilities.jsx';
import {Attributes, DerivedAttributes} from './attributes.jsx';
import {CharBackground} from './background.jsx';
import {someChar} from './storage';

window.React = React;


const CharakterDokument = React.createClass({
  propTypes: {
    model: React.PropTypes.object.isRequired,
  },
  stateTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
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

    const assocPath = (path, value) => {
      const model = R.assocPath(path, value, R.defaultTo(this.state.model, this.state.model.next));
      this.state.model.next = model;
      this.setState({model});
    };

    return {model: R.assoc('assocPath', assocPath, this.props.model), highlight: highlight(null)};
  },

  render() {
    return (
      <div className="char-document">
        <CharBackground model={this.state.model} highlight={this.state.highlight} />
        <Attributes model={this.state.model} highlight={this.state.highlight} />
        <DerivedAttributes model={this.state.model} highlight={this.state.highlight} />
        <Abilities model={this.state.model} highlight={this.state.highlight} />
        <Resources model={this.state.model} highlight={this.state.highlight} />
      </div>
      );
  }
});

React.render(
  <CharakterDokument model={someChar} />,
  document.getElementById('content')
);
