import React from 'react';
import * as R from 'ramda';

import interactionElements from './interaction-elements.jsx';

import splittermond from './splittermond';

const Abilities = React.createClass({
  propTypes: {
    alterPath: React.PropTypes.func,
    model: React.PropTypes.object,
  },

  changeAbility(ability, newValue) {
    const path = ['abilities', ability];
    this.props.alterPath(path, newValue);
  },

  render() {
    const abilities = R.map(ability => {
      return (<Ability
          {...ability}
          key={ability.name}
          handleChange={this.changeAbility}
          model={this.props.model} />);
    }, splittermond.abilities);
    return (
      <table className="abilities">
        <thead>
          <tr><th>Name</th><th>∑</th><th>Punkte</th><th>Att 1</th><th>Att 2</th><th>Mod</th></tr>
        </thead>
        <tbody>
          {abilities}
        </tbody>
      </table>
    );
  }
});

const Ability = React.createClass({
  propTypes: {
    attributes: React.PropTypes.array,
    handleChange: React.PropTypes.func,
    model: React.PropTypes.object,
    name: React.PropTypes.string,
  },

  aggregated() {
    return this.props.model.attributes[this.props.attributes[0]].value
      + this.props.model.attributes[this.props.attributes[1]].value
      + (this.props.model.abilities[this.props.name] || 0);
  },

  handleChange(newValue) { this.props.handleChange(this.props.name, newValue); },

  render() {
    return (
      <tr className="ability">
        <td className="ability-name">{this.props.name}</td>
        <td className="number aggregate ability-aggregated">{this.aggregated()}</td>
        <td className="number ability-points">
          <interactionElements.number
            value={this.props.model.abilities[this.props.name] || 0}
            onChange={this.handleChange} />
        </td>
        <td className="number ability-attributes">
          <span className="placeholder shorthand attribute-name">{this.props.attributes[0]}</span>
          {this.props.model.attributes[this.props.attributes[0]].value}</td>
        <td className="number ability-attributes">
          <span className="placeholder shorthand attribute-name">{this.props.attributes[1]}</span>
          {this.props.model.attributes[this.props.attributes[1]].value}</td>
        <td className="number ability-mod">?</td>
      </tr>
    );
  }
});

export default Abilities;
export {Ability, Abilities};
