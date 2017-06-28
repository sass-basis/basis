'use strict';

import $ from 'jquery';

export default class BasisPageEffect {
  constructor(args = {}) {
    this.args = $.extend({
      pageEffect: '.c-page-effect',
      duration: 200
    }, args);
    this.container     = $(this.args.pageEffect);
    this.pageOutObject = $('[data-page-effect-link="true"], a[href]:not([target="_blank"], [href^="#"], [href*="javascript"], [href*=".jpg"], [href*=".jpeg"], [href*=".gif"], [href*=".png"], [href*=".mov"], [href*=".swf"], [href*=".mp4"], [href*=".flv"], [href*=".avi"], [href*=".mp3"], [href*=".pdf"], [href*=".zip"], [href^="mailto:"], [data-page-effect-link="false"])');
    this.setListener();
  }

  setListener() {
    $(window).on('load', (event) => {
      this.hide();
    });

    this.pageOutObject.each((i, e) => {
      const link = $(e);
      link.on('click', (event) => {
        if (event.shiftKey || event.ctrlKey || event.metaKey) {
          return;
        }

        event.preventDefault();
        this.show();
        const url = link.attr('href');
        this.moveLocation(url);
      });
    });
  }

  moveLocation(url) {
    setTimeout(() => {
      location.href = url
    }, this.args['duration']);
  }

  hide() {
    this.container
      .attr('aria-hidden', 'true')
      .attr('data-page-effect', 'fadein');
  }

  show() {
    this.container
      .attr('aria-hidden', 'false')
      .attr('data-page-effect', 'fadeout');
  }
}
