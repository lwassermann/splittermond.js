import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber} from './interaction-elements.jsx';

import splittermond from './splittermond';

const Attributes = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired
  },

  changeAttribute(name, type, newValue) {
    this.props.model.assocPath(['attributes', name, type], newValue);
  },

  highlight(attribute) {
    this.props.highlight.focus(attribute.abbreviation);
  },
  stopHighlight() {
    this.props.highlight.focus();
  },

  render() {
    const attributes = R.map(attribute => {
      const highlight = this.props.highlight(attribute.abbreviation) ? ' highlight' : '';
      return (
        <tr className="attribute" key={attribute.name}
            onMouseOver={this.highlight.bind(this, attribute)}
            onMouseOut={this.stopHighlight.bind(this, attribute)}>
          <td className="attribute-name">{attribute.name}</td>
          <td className="shorthand attribute-abbreviation">{attribute.abbreviation}</td>
          <td className="number attribute-start">
            {this.props.model.attributes[attribute.abbreviation].start}
          </td>
          <td className={'number aggregate attribute-value' + highlight}>
            <ScrubbableNumber
              value={this.props.model.attributes[attribute.abbreviation].value}
              onChange={this.changeAttribute.bind(this, attribute.abbreviation)} />
          </td>
          <td className="number attribtue-mod">?</td>
        </tr>
      );
    }, splittermond.attributes);
    return (
      <table className="char-attributes">
        <thead><tr><th>Name</th><th></th><th>Start</th><th>Wert</th><th>Mod</th></tr></thead>
        <tbody>{attributes}</tbody>
      </table>
    );
  }
});

const DerivedAttributes = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired
  },
  highlight(attribute) {
    this.props.highlight.focus(attribute.derivedFrom);
  },
  stopHighlight() {
    this.props.highlight.focus();
  },

  render() {
    const attributes = R.map(dAttribute => {
      const highlight = this.props.highlight(dAttribute.abbreviation)
        || this.props.highlight(dAttribute.derivedFrom)
          ? ' highlight' : '';
      return (
        <tr className="derived-attribute" key={dAttribute.name}
            onMouseOver={this.highlight.bind(this, dAttribute)}
            onMouseOut={this.stopHighlight.bind(this, dAttribute)}>
          <td className="derived-attribute-name">{dAttribute.name}</td>
          <td className="shorthand derived-attribute-abbreviation">{dAttribute.abbreviation}</td>
          <td className={'number aggregate derived-attribute-value' + highlight}>
            {dAttribute[dAttribute.abbreviation](this.props.model)}
          </td>
          <td className="number derived-attribtue-mod">?</td>
          <td className="number derived-attribtue-temp">?</td>
        </tr>
      );
    }, splittermond.derivedAttributes);
    return (
      <table className="char-derived-attributes">
        <thead><tr><th>Name</th><th></th><th>Wert</th><th>Mod</th><th>temp</th></tr></thead>
        <tbody>{attributes}</tbody>
      </table>
    );
  },
});

export default Attributes;
export {Attributes, DerivedAttributes};

