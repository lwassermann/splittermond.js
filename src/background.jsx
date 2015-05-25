import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber, TextInput} from './interaction-elements.jsx';

import splittermond from './splittermond';

const CharBackground = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired,
  },

  setTo(propertyName, value) {
    return this.props.model.assocPath(['background', propertyName], value);
  },

  render() {
    return (
      <div className="char-background">
        <label className="char-background char-name">
          <span className="descriptor">Name</span>
          <TextInput
              content={this.props.model.background.name}
              onChange={this.setTo.bind(this, 'name')} />
        </label>
        <label className="char-background char-education">
          <span className="descriptor">Ausbildung</span>
          <TextInput
              content={this.props.model.background.education}
              onChange={this.setTo.bind(this, 'education')} />
        </label>
        <label className="char-background char-culture">
          <span className="descriptor">Kultur</span>
          <TextInput
              content={this.props.model.background.culture}
              onChange={this.setTo.bind(this, 'culture')} />
        </label>
        <Race {...this.props}/>
        <label className="char-background char-hair-color">
          <span className="descriptor">Haarfarbe</span>
          <TextInput
              content={this.props.model.background.hairColor}
              onChange={this.setTo.bind(this, 'hairColor')} />
        </label>
        <label className="char-background char-eye-color">
          <span className="descriptor">Augenfarbe</span>
          <TextInput
              content={this.props.model.background.eyeColor}
              onChange={this.setTo.bind(this, 'eyeColor')} />
        </label>
        <label className="char-background char-skin">
          <span className="descriptor">Teint</span>
          <TextInput
              content={this.props.model.background.skin}
              onChange={this.setTo.bind(this, 'skin')} />
        </label>
        <label className="char-background char-ancestry">
          <span className="descriptor">Abstammung</span>
          <TextInput
              content={this.props.model.background.ancestry}
              onChange={this.setTo.bind(this, 'ancestry')} />
        </label>
        <label className="char-background char-sex">
          <span className="descriptor">Geschlecht</span>
          <TextInput
              content={this.props.model.background.sex}
              onChange={this.setTo.bind(this, 'sex')} />
        </label>
        <label className="char-background char-height">
          <span className="descriptor">Körpergröße</span>
          <TextInput
              content={this.props.model.background.height}
              onChange={this.setTo.bind(this, 'height')} />
        </label>
        <label className="char-background char-weight">
          <span className="descriptor">Gewicht</span>
          <TextInput
              content={this.props.model.background.weight}
              onChange={this.setTo.bind(this, 'weight')} />
        </label>
        <label className="char-background char-place-of-birth">
          <span className="descriptor">Geburtsort</span>
          <TextInput
              content={this.props.model.background.placeOfBirth}
              onChange={this.setTo.bind(this, 'placeOfBirth')} />
        </label>
      </div>
    );
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
  render() {
    return (<span>Hallo Welt.</span>);
  },
});

export default CharBackground;
export {CharBackground, Resources};
