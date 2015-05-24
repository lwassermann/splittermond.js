import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber} from './interaction-elements.jsx';

import splittermond from './splittermond';

const Abilities = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
    highlight: React.PropTypes.func,
  },

  changeAbility(ability, newValue) {
    const path = ['abilities', ability];
    this.props.model.assocPath(path, newValue);
  },

  render() {
    const abilities = R.map(ability => {
      return (<Ability
          {...ability}
          key={ability.name}
          handleChange={this.changeAbility}
          model={this.props.model}
          highlight={this.props.highlight} />);
    }, splittermond.abilities);
    return (
      <table className="abilities">
        <thead>
          <tr><th>Name</th><th>∑</th><th>Punkte</th><th>Mod</th></tr>
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
    highlight: React.PropTypes.func,
  },

  aggregated() {
    return this.props.model.attributes[this.props.attributes[0]].value
      + this.props.model.attributes[this.props.attributes[1]].value
      + (this.props.model.abilities[this.props.name] || 0);
  },

  handleChange(newValue) { this.props.handleChange(this.props.name, newValue); },

  highlighAttributes() {
    this.props.highlight.focus(this.props.attributes);
  },
  stopHighlightingAttributes() {
    this.props.highlight.focus();
  },

  render() {
    const highlight = this.props.highlight(this.props.attributes) ? ' highlight' : '';
    return (
      <tr className="ability"
          onMouseOver={this.highlighAttributes}
          onMouseOut={this.stopHighlightingAttributes}>
        <td className="ability-name">{this.props.name}</td>
        <td className={'number aggregate ability-aggregated' + highlight}>
          {this.aggregated()}
        </td>
        <td className="number ability-points">
          <ScrubbableNumber
            value={this.props.model.abilities[this.props.name] || 0}
            onChange={this.handleChange} />
        </td>
        <td className="number ability-mod">?</td>
      </tr>
    );
  }
});

export default Abilities;
export {Ability, Abilities};
