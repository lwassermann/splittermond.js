import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber, TextInput} from './interaction-elements.jsx';

import splittermond from './splittermond';

const LabeledTextContent = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    model: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    propertyName: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
  },
  handleChange(value) {
    this.props.onChange(this.props.propertyName, value);
  },

  render() {
    return (
      <label className={'char-fact ' + this.props.className}>
        <span className="descriptor">{this.props.name}</span>
        <TextInput
            content={this.props.model.background[this.props.propertyName]}
            onChange={this.handleChange}
            placeholder={this.props.placeholder} />
      </label>
    );
  },
});

const CharBackground = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  handleChange(propertyName, value) {
    return this.props.model.assocPath(['background', propertyName], value);
  },

  render() {
    const elements = R.map(ea => {
      if (React.isValidElement(ea)) {
        return ea;
      }
      return (<LabeledTextContent key={ea.name} {...ea}
                model={this.props.model} onChange={this.handleChange} />);
    }, [
    /* eslint-disable no-multi-spaces */
      {className: 'char-name',           name: 'Name',        propertyName: 'name'},
      {className: 'char-education',      name: 'Ausbildung',  propertyName: 'education'},
      {className: 'char-culture',        name: 'Kultur',      propertyName: 'culture'},
      (<Race {...this.props} key="race" />),
      {className: 'char-hair-color',     name: 'Haarfarbe',   propertyName: 'hairColor'},
      {className: 'char-eye-color',      name: 'Augenfarbe',  propertyName: 'eyeColor'},
      {className: 'char-skin',           name: 'Teint',       propertyName: 'skin'},
      {className: 'char-ancestry',       name: 'Abstammung',  propertyName: 'ancestry'},
      {className: 'char-sex',            name: 'Geschlecht',  propertyName: 'sex'},
      {className: 'char-height',         name: 'Körpergröße', propertyName: 'height'},
      {className: 'char-weight',         name: 'Gewicht',     propertyName: 'weight'},
      {className: 'char-place-of-birth', name: 'Geburtsort',  propertyName: 'placeOfBirth'},
    /* eslint-enable no-multi-spaces */
    ]);
    return <div className="char-background">{elements}</div>;
  }
});

const Race = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  handleChange(event) {
    const race = R.find(R.propEq('name', event.target.value), splittermond.races);
    this.props.model.assocPath(['race'], race);
  },

  handleHoverStart() {
    return this.props.highlight.focus('race');
  },
  handleHoverEnd() {
    return this.props.highlight.focus();
  },

  render() {
    return (
      <label className={'char-fact char-race'
                        + (this.props.highlight('race') ? ' highlight' : '')}
          onMouseOver={this.handleHoverStart} onMouseOut={this.handleHoverEnd} >
        <span className="descriptor">Rasse</span>
        <select value={this.props.model.race && this.props.model.race.name} onChange={this.handleChange}>
          <option></option>
          {splittermond.races.map(race => {
            return (<option key={race.name} value={race.name}>{race.name}</option>);
          })}
        </select>
      </label>);
  },
});

const Resources = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  handleChange(propertyName, type, value) {
    return this.props.model.assocPath(['resources', propertyName, type], value);
  },

  render() {
    const resources = R.map(res => {
      return (<Resource
                        name={res.name}
                        placeholder={res.description}
                        onChange={this.handleChange}
                        propertyName={res.name}
                        value={this.props.model.resources && this.props.model.resources[res.name]
                              || {value: 0, description: ''}} />);
    }, splittermond.resources);
    return (<div className="char-resources">{resources}</div>);
  },
});

const Resource = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    propertyName: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
  },

  handleTextChange(value) {
    this.props.onChange(this.props.propertyName, 'description', value);
  },
  handleValueChange(value) {
    this.props.onChange(this.props.propertyName, 'value', value);
  },

  render() {
    return (
      <label className="Resource">
        <span className="descriptor">{this.props.name}</span>
        <ScrubbableNumber />
        <TextInput
            content={this.props.value.description}
            onChange={this.handleTextChange}
            placeholder={this.props.placeholder} />
      </label>
    );
  },
});

export default CharBackground;
export {CharBackground, Resources};
