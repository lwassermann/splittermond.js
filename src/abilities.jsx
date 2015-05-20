import React from 'react';
import * as R from 'ramda';

import interactionElements from './interaction-elements.jsx';

import splittermond from './splittermond';

const Abilities = React.createClass({
  propTypes: {
    model: React.PropTypes.object,
    highlight: React.PropTypes.array,
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
    highlight: React.PropTypes.array,
  },

  aggregated() {
    return this.props.model.attributes[this.props.attributes[0]].value
      + this.props.model.attributes[this.props.attributes[1]].value
      + (this.props.model.abilities[this.props.name] || 0);
  },

  handleChange(newValue) { this.props.handleChange(this.props.name, newValue); },

  render() {
    const shouldHighlight = R.any(R.contains(R.__, this.props.highlight), this.props.attributes)
                          || R.contains(this.props.name, this.props.highlight);
    const highlight = shouldHighlight ? ' highlight' : '';
    return (
      <tr className="ability">
        <td className="ability-name">{this.props.name}</td>
        <td className={'number aggregate ability-aggregated' + highlight}>
          {this.aggregated()}
        </td>
        <td className="number ability-points">
          <interactionElements.number
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
