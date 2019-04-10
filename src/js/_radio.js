'use strict';

import BasisChecked from './_checked';

export default class BasisRadio {
  constructor(args = {}) {
    args.radio = args.radio || '.c-radio';
    const checkedArgs = {target: args.radio};
    new BasisChecked(checkedArgs);
  }
}
