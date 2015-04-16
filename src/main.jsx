'use strict';

var React = require('react');

var TextInput = React.createClass({
  render() {
    return (<input type="text" value={this.props.content} />);
  }
});

var CharakterDokument = React.createClass({
  render() {
    return (
      <Name model={this.props.model} />
      );
  }
});

var Ability = React.createClass({
  render() {
    return (
      <div class='ability'>
        <span class='ability-name'>{this.props.name}</span>
        <span class='ability-aggregated'>{this.props.att1 + this.props.att2 + this.props.points + this.props.mod}</span>
        <span class='ability-points'></span>
        <span class='ability-att1'></span>
        <span class='ability-att2'></span>
        <span class='ability-mod'></span>
      </div>
    );
  }
});

var Name = React.createClass({
  render() {
    return (
      <TextInput class="char-name" content={this.props.model.name} />
    );
  }
});

var someChar = {
  name: 'Charley'
};

React.render(
  <CharakterDokument model={someChar}></CharakterDokument>,
  document.getElementById('content')
);
