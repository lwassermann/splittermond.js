'use strict';

import React from 'react';
import * as R from 'ramda';

import {CharacterStore} from './storage';
import {CharacterDokument} from './character-document.jsx';

window.React = React;



React.render(
  <CharacterDokument model={CharacterStore.getAll()[1]} />,
  document.getElementById('content')
);
