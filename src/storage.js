'use strict';

import R from 'ramda';

var defaultChar = {
  name: '',
  attributes: {
    AUS: 0,
    BEW: 0,
    INT: 0,
    KON: 0,
    MYS: 0,
    STR: 0,
    VER: 0,
    WIL: 0,
  },
  abilities: {},
};

var someChar = R.merge(defaultChar, {
  name: 'Charley',
  attributes: {
    AUS: 1,
    BEW: 2,
    INT: 1,
    KON: 2,
    MYS: 1,
    STR: 2,
    VER: 3,
    WIL: 4
  },
});

export {someChar, defaultChar};
