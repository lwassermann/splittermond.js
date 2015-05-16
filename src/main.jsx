'use strict';

import {someChar} from "./storage";
import React from 'react';
import * as R from 'ramda';


const TextInput = React.createClass({
  handleChange(evt) {
    this.props.handleChange(evt.target.value);
  },

  render() {
    return (<input className="textInput" type="text" value={this.props.content} onChange={this.handleChange} />);
  }
});

const CharakterDokument = React.createClass({
  getInitialState() {
    return {model: this.props.initialModel};
  },

  changeCharacter(path, value) {
    this.setState({model: R.assocPath(path, value, this.state.model)});
  },

  render() {
    return (
      <div>
        <Name model={this.state.model} alterPath={this.changeCharacter} />
      </div>
      );
  }
});

const Ability = React.createClass({
  render() {
    return (
      <div class='ability'>
        <span class='ability-name'>{this.props.name}</span>
        <span class='ability-aggregated'>
          {this.props.att1 + this.props.att2 + this.props.points + this.props.mod}
        </span>
        <span class='ability-points'></span>
        <span class='ability-att1'></span>
        <span class='ability-att2'></span>
        <span class='ability-mod'></span>
      </div>
    );
  }
});

const Name = React.createClass({
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
  <CharakterDokument initialModel={someChar}></CharakterDokument>,
  document.getElementById('content')
);
