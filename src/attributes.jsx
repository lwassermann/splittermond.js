import React from 'react';
import * as R from 'ramda';

import interactionElements from './interaction-elements.jsx';

import splittermond from './splittermond';

const Attributes = React.createClass({
  propTypes: {
    model: React.PropTypes.object
  },

  changeAttribute(name, type, newValue) {
    this.props.model.assocPath(['attributes', name, type], newValue);
  },

  render() {
    const attributes = R.map(attribute => {
      return (
        <tr className="attribute" key={attribute.name}>
          <td className="attribute-name">{attribute.name}</td>
          <td className="shorthand attribute-abbreviation">{attribute.abbreviation}</td>
          <td className="number attribute-start">
            <interactionElements.number
              value={this.props.model.attributes[attribute.abbreviation].start}
              onChange={this.changeAttribute.bind(this, attribute.abbreviation, 'start')} />
          </td>
          <td className="number aggregate attribute-value">
            <interactionElements.number
              value={this.props.model.attributes[attribute.abbreviation].value}
              onChange={this.changeAttribute.bind(this, attribute.abbreviation, 'value')} />
          </td>
          <td className="number attribtue-mod">?</td>
        </tr>
      );
    }, splittermond.attributes);
    return (
      <table className="attributes">
        <thead><tr><th>Name</th><th></th><th>Start</th><th>Wert</th><th>Mod</th></tr></thead>
        <tbody>{attributes}</tbody>
      </table>
    );
  }
});

export default Attributes;
