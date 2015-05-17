'use strict';

import R from 'ramda';

var defaultChar = {
  name: '',
  attributes: {
    aus: {value: 0, start: 0},
    bew: {value: 0, start: 0},
    int: {value: 0, start: 0},
    kon: {value: 0, start: 0},
    mys: {value: 0, start: 0},
    str: {value: 0, start: 0},
    ver: {value: 0, start: 0},
    wil: {value: 0, start: 0},
  },
  abilities: {},
};

var someChar = R.merge(defaultChar, {
  name: 'Charley',
  attributes: {
    aus: {value: 1, start: 1},
    bew: {value: 2, start: 2},
    int: {value: 3, start: 3},
    kon: {value: 4, start: 4},
    mys: {value: 5, start: 4},
    str: {value: 1, start: 1},
    ver: {value: 2, start: 2},
    wil: {value: 3, start: 3},
  },
});

export {someChar, defaultChar};
