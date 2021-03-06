import React from 'react';
// import * as R from 'ramda';

const TextInput = React.createClass({
  propTypes: {
    content: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },
  handleChange(evt) {
    this.props.onChange(evt.target.value);
  },

  render() {
    return (<input
      className="text-input"
      type="text"
      value={this.props.content}
      onChange={this.handleChange} />);
  }
});

const ScrubbableNumber = React.createClass({
  propTypes: {
    delta: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.number,
  },
  getDefaultProps() {
    return {
      value: 0,
      onChange: function() {},
      delta: function(p1, p2) { return Math.round((p2.x - p1.x) / 50); }
    };
  },

  getInitialState() {
    return {scrubbing: false};
  },

  handleMouseDown(evt) {
    if (evt.button === 0) {
      this.setState({
        scrubbing: true,
        p: {x: evt.screenX, y: evt.screenY},
        initialValue: this.props.value
      });

      evt.stopPropagation();
    }
  },
  handleMouseMove(evt) {
    const delta = this.props.delta(this.state.p, {x: evt.screenX, y: evt.screenY});
    this.props.onChange(this.state.initialValue + delta);

    evt.preventDefault();
    evt.stopPropagation();
  },
  handleMouseUp(evt) {
    this.setState({scrubbing: false});

    evt.preventDefault();
    evt.stopPropagation();
  },
  handleChange(evt) {
    return this.props.onChange(+evt.target.value);
  },

  render() {
    return (
      <div className="scrubbable"
          onChange={this.handleChange}
          onMouseDown={this.handleMouseDown}>
        <input className="scrubbable-input" type="text" size="2"
          value={this.props.value} onChange={this.handleChange} />
          <div
            className={'overlay scrubbing ' + (this.state.scrubbing ? 'active' : 'hide')}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}></div>
      </div>
    );
  }
});
const interactionElements = {
  number: ScrubbableNumber,
  text: TextInput
};

export default interactionElements;
export {ScrubbableNumber, TextInput};
