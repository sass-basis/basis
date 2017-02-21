'use strict';

import $ from 'jquery';

export default class BasisSelect {
  constructor() {
    this.select = $('[data-c="select"]');
    this.select.each((i, e) => {
      const select = $(e).find('select');
      const label  = $(e).find('[data-c="select__label"]');
      label.text(select.children('option:selected').val());

      select.on('change', (event) => {
        label.text(select.val());
      });
    });
  }
}
