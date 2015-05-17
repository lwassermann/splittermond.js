'use strict';

import React from 'react';
import * as R from 'ramda';

import Abilities from './abilities.jsx';
import Attributes from './attributes.jsx';
import {someChar} from './storage';

window.React = React;

const TextInput = React.createClass({
  propTypes: {
    content: React.propTypes.string,
    handleChange: React.propTypes.func,
  },
  handleChange(evt) {
    this.props.handleChange(evt.target.value);
  },

  render() {
    return (<input
      className="textInput"
      type="text"
      value={this.props.content}
      onChange={this.handleChange} />);
  }
});

const CharakterDokument = React.createClass({
  propTypes: {
    initialModel: React.propTypes.object,
  },

  getInitialState() {
    return {model: this.props.initialModel};
  },

  changePathOfChar(path, value) {
    this.setState({model: R.assocPath(path, value, this.state.model)});
  },

  render() {
    return (
      <div className="char-document">
        <div className="char-background">
          <Name model={this.state.model} alterPath={this.changePathOfChar} />
        </div>
        <div className="char-attributes">
          <Attributes model={this.state.model} alterPath={this.changePathOfChar}/>
        </div>
        <div className="char-derived-attributes">
        </div>
        <div className="char-abilities">
          <Abilities model={this.state.model} alterPath={this.changePathOfChar} />
        </div>
      </div>
      );
  }
});

const Name = React.createClass({
  propTypes: {
    alterPath: React.propTypes.func,
    model: React.propTypes.object,
  },
  renameTo(name) {
    this.props.alterPath(['name'], name);
  },

  render() {
    return (
      <label className="char-name">
      Name: <TextInput content={this.props.model.name} handleChange={this.renameTo} />
      </label>
    );
  }
});

React.render(
  <CharakterDokument initialModel={someChar} />,
  document.getElementById('content')
);
