import React from 'react';
import * as R from 'ramda';

import {ScrubbableNumber, TextInput} from './interaction-elements.jsx';

import splittermond from './splittermond';

const CharBackground = React.createClass({
  propTypes: {
    highlight: React.PropTypes.func,
    model: React.PropTypes.object,
  },

  setTo(propertyName, value) {
    return this.props.model.assocPath(['background', propertyName], value);
  },

  render() {
    return (
      <div className="char-background">
        <label className="char-name">
          Name
          <TextInput
              content={this.props.model.background.name}
              onChange={this.setTo.bind(this, 'name')} />
        </label>
        <label className="char-education">
          Ausbildung
          <TextInput
              content={this.props.model.background.education}
              onChange={this.setTo.bind(this, 'education')} />
        </label>
        <label className="char-culture">
          Kultur
          <TextInput
              content={this.props.model.background.culture}
              onChange={this.setTo.bind(this, 'culture')} />
        </label>
        <label className={'char-race' + (this.props.highlight('race') ? ' highlight' : '')}>
          Rasse
          <TextInput
              content={this.props.model.background.race}
              onChange={this.setTo.bind(this, 'race')} />
        </label>
        <label className="char-hair-color">
          Haarfarbe
          <TextInput
              content={this.props.model.background.hairColor}
              onChange={this.setTo.bind(this, 'hairColor')} />
        </label>
        <label className="char-eye-color">
          Augenfarbe
          <TextInput
              content={this.props.model.background.eyeColor}
              onChange={this.setTo.bind(this, 'eyeColor')} />
        </label>
        <label className="char-skin">
          Teint
          <TextInput
              content={this.props.model.background.skin}
              onChange={this.setTo.bind(this, 'skin')} />
        </label>
        <label className="char-ancestry">
          Abstammung
          <TextInput
              content={this.props.model.background.ancestry}
              onChange={this.setTo.bind(this, 'ancestry')} />
        </label>
        <label className="char-sex">
          Geschlecht
          <TextInput
              content={this.props.model.background.sex}
              onChange={this.setTo.bind(this, 'sex')} />
        </label>
        <label className="char-height">
          Körpergröße
          <TextInput
              content={this.props.model.background.height}
              onChange={this.setTo.bind(this, 'height')} />
        </label>
        <label className="char-weight">
          Gewicht
          <TextInput
              content={this.props.model.background.weight}
              onChange={this.setTo.bind(this, 'weight')} />
        </label>
        <label className="char-place-of-birth">
          Geburtsort
          <TextInput
              content={this.props.model.background.placeOfBirth}
              onChange={this.setTo.bind(this, 'placeOfBirth')} />
        </label>
      </div>
    );
  }
});

export default CharBackground;
export {CharBackground};
