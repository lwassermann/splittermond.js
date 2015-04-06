'use strict';

var React = require('react');

var CharakterDokument = React.createClass({
  render() {
    return (
      <Name name={this.props.model.name}></Name>
      );
  }
});

var Ability = React.createClass({
  render() {
    return (
      <p class=''></p>
    );
  }
});

var Name = React.createClass({
  render() {
    return (
      <div class="char-name">{this.props.name}</div>
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
