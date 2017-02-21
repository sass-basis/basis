'use strict';

import $ from 'jquery';

export default class BasisSelect {
  constructor() {
    this.select = $('[data-c="select"]');
    this.select.each((i, e) => {
      const selectWrapper = $(e);
      const select = selectWrapper.find('select');
      const label  = selectWrapper.find('[data-c="select__label"]');
      label.text(select.children('option:selected').val());

      select.on('change', (event) => {
        label.text(select.val());
      });

      select.on('focusin', (event) => {
        selectWrapper.attr('aria-selected', 'true');
      });

      select.on('focusout', (event) => {
        selectWrapper.attr('aria-selected', 'false');
      });
    });
  }
}
