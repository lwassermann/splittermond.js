'use strict';

import R from 'ramda';

var defaultChar = {
  name: '',
  attributes: {
    aus: 0,
    bew: 0,
    int: 0,
    kon: 0,
    mys: 0,
    str: 0,
    ver: 0,
    wil: 0,
  },
  abilities: {},
};

var someChar = R.merge(defaultChar, {
  name: 'Charley',
  attributes: {
    aus: 1,
    bew: 2,
    int: 1,
    kon: 2,
    mys: 1,
    str: 2,
    ver: 3,
    wil: 4
  },
});

export {someChar, defaultChar};
