'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class BasisSelect {
  constructor(args = {}) {
    this.args = args;
    this.args.select = this.args.select || '.c-select';
    this.args.label = this.args.label || '.c-select__label';

    forEachHtmlNodes(
      document.querySelectorAll(this.args.select),
      (item, index) => {
        const wrapper = item;
        const select  = wrapper.querySelector('select');
        const label   = wrapper.querySelector(this.args.label);

        this._addEventListener(wrapper, select, label);
      }
    );

    forEachHtmlNodes(
      document.getElementsByTagName('form'),
      (item, index) => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (typeof node.matches === 'function' && node.matches(this.args.select)) {
                const wrapper = node;
                const select  = wrapper.querySelector('select');
                const label   = wrapper.querySelector(this.args.label);

                this._addEventListener(wrapper, select, label);
              }
            });
          });
        });
        observer.observe(item, {childList: true, subtree: true});
      }
    );
  }

  _addEventListener(wrapper, select, label) {
    const setLabel = () => label.textContent = select.options[select.selectedIndex].textContent;

    const changeEvent = () => setLabel();
    const focusinEvent = () => wrapper.setAttribute('aria-selected', 'true');
    const focusoutEvent = () => wrapper.setAttribute('aria-selected', 'false');

    label.textContent = setLabel();

    select.addEventListener('change', () => changeEvent(), false);
    select.addEventListener('focusin', () => focusinEvent(), false);
    select.addEventListener('focusout', () => focusoutEvent(), false);
  }
}
