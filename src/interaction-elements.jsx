import React from 'react';
import * as R from 'ramda';

const ScrubbableNumber = React.createClass({
  getInitialState() {
    return {scrubbing: false, x: 0, y: 0};
  },

  handleMouseDown(evt) {
    if (evt.button === 0) {
      this.setState({scrubbing: true, x: evt.screenX, y: evt.screenY, initialValue: this.props.value});

      evt.preventDefault();
      evt.stopPropagation();
    }
  },
  handleMouseMove(evt) {
    var delta = this.delta(this.state, {x: evt.screenX, y: evt.screenY});
    this.props.onChange(this.state.initialValue + delta);

    evt.preventDefault();
    evt.stopPropagation();
  },
  handleMouseUp(evt) {
    this.setState({scrubbing: false});

    evt.preventDefault();
    evt.stopPropagation();
  },
  handleChange(evt) { return this.props.onChange(evt.target.value); },
  delta: function({x: x1, y: y1}, {x: x2, y: y2}) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.round(dx / 50);
  },

  render() {
    return (
      <div className="scrubbable">
        <input
          type="number"
          value={this.props.value}
          onChange={this.handleChange}
          onMouseDown={this.handleMouseDown} />
        {this.state.scrubbing
          ? <div
            className="overlay scrubbing"
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}></div>
          : null}
      </div>
    );
  }
});
const interactionElements = {number: ScrubbableNumber};

export default interactionElements;
export {ScrubbableNumber};
