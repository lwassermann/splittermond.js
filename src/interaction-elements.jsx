import React from 'react';
// import * as R from 'ramda';

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

      evt.preventDefault();
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
    return this.props.onChange(evt.target.value);
  },

  render() {
    return (
      <div className="scrubbable"
          onChange={this.handleChange}
          onMouseDown={this.handleMouseDown}>
        <input value={this.props.value} onChange={this.handleChange} />
        {this.state.scrubbing
          && <div
              className="overlay scrubbing"
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}></div>}
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
