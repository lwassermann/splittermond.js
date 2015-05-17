'use strict';

import {someChar} from "./storage";
import splittermond from "./splittermond";
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
      <div className="char-document">
        <div className="char-background">
          <Name model={this.state.model} alterPath={this.changeCharacter} />
        </div>
        <div className="char-abilities">
          <Abilities model={this.state.model} alterPath={this.changeCharacter} />
        </div>
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

const Abilities = React.createClass({
  changeAbility(ability, delta) {
    this.props.alterPath(['abilities', ability], (this.props.model[ability] || 0) + delta);
  },

  render() {
    const abilities = R.map(ability => {
      return <Ability
        {...ability}
        key={ability.name}
        handleChange={this.changeAbility}
        char={this.props.model} />;
    }, splittermond.abilities);
    return (
      <table className='ability'>
        {abilities}
      </table>
    );
  }
});

const Ability = React.createClass({
  aggregated() {
    return this.props.char.attributes[this.props.attributes[0]]
      + this.props.char.attributes[this.props.attributes[1]]
      + (this.props.char.abilities[this.props.name] || 0)
  },
  render() {
    return (
      <tr className='ability'>
        <td className='ability-name'>{this.props.name}</td>
        <td className='ability-aggregated'>{this.aggregated()}</td>
        <td className='ability-points'>{this.props.char.abilities[this.props.name] || 0}</td>
        <td className='ability-attributes' placeholder={this.props.attributes[0]}>{this.props.char.attributes[this.props.attributes[0]]}</td>
        <td className='ability-attributes' placeholder={this.props.attributes[1]}>{this.props.char.attributes[this.props.attributes[1]]}</td>
        <td className='ability-mod'>?</td>
      </tr>
    );
  }
});

React.render(
  <CharakterDokument initialModel={someChar}></CharakterDokument>,
  document.getElementById('content')
);
