import React from 'react';
import * as R from 'ramda';

import interactionElements from './interaction-elements.jsx';

import splittermond from './splittermond';

const Attributes = React.createClass({
  propTypes: {
    highlight: React.PropTypes.array,
    model: React.PropTypes.object
  },

  changeAttribute(name, type, newValue) {
    this.props.model.assocPath(['attributes', name, type], newValue);
  },

  handleHoverStart(attribute) {
    this.props.highlight.highlight(attribute.abbreviation);
  },
  handleHoverEnd(attribute) {
    this.props.highlight.downlight(attribute.abbreviation);
  },

  render() {
    const attributes = R.map(attribute => {
      const shouldHighlight = R.contains(attribute.abbreviation, this.props.highlight);
      const highlight = shouldHighlight ? ' highlight' : '';
      return (
        <tr className="attribute" key={attribute.name}
            onMouseEnter={this.handleHoverStart.bind(this, attribute)}
            onMouseLeave={this.handleHoverEnd.bind(this, attribute)}>
          <td className="attribute-name">{attribute.name}</td>
          <td className="shorthand attribute-abbreviation">{attribute.abbreviation}</td>
          <td className="number attribute-start">
            <interactionElements.number
              value={this.props.model.attributes[attribute.abbreviation].start}
              onChange={this.changeAttribute.bind(this, attribute.abbreviation, 'start')} />
          </td>
          <td className={'number aggregate attribute-value' + highlight}>
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
