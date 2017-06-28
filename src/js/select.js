'use strict';

import $ from 'jquery';

export default class BasisSelect {
  constructor(args = {}) {
    this.args = $.extend({
      select: '.c-select',
      label : '.c-select__label'
    }, args);
    this.select = $(this.args.select);
    this.select.each((i, e) => {
      const selectWrapper = $(e);
      const select = selectWrapper.find('select');
      const label  = selectWrapper.find(this.args.label);
      label.text(select.children('option:selected').text());

      select.on('change', (event) => {
        label.text($(select[0].selectedOptions).text());
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
