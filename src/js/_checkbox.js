'use strict';

import BasisChecked from './_checked';

export default class BasisCheckbox {
  constructor(args = {}) {
    args.checkbox = args.checkbox || '.c-checkbox';
    const checkedArgs = {target: args.checkbox};
    new BasisChecked(checkedArgs);
  }
}
