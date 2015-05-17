import React from 'react';
import * as R from 'ramda';

import splittermond from './splittermond';

const Attributes = React.createClass({
  changeAttribute(name, newValue) {
    var path = ['attributes', name];
    this.props.alterPath(path, newValue);
  },

  render() {
    const attributes = R.map(attribute => {
      return (
        <tr className="attribute" key={attribute.name}>
          <td className="attribute-name">{attribute.name}</td>
          <td className="shorthand attribute-shorthand">{attribute.shorthand}</td>
          <td className="number attribute-start">{this.props.model.attributes[attribute.shorthand].start}</td>
          <td className="number aggregate attribute-value">{this.props.model.attributes[attribute.shorthand].value}</td>
          <td className="number attribtue-mod">?</td>
        </tr>
      );
    }, splittermond.attributes);
    return (
      <table className='attributes'>
        <thead><tr><th>Name</th><th></th><th>Start</th><th>Wert</th><th>Mod</th></tr></thead>
        <tbody>{attributes}</tbody>
      </table>
    );
  }
});

export default Attributes;
