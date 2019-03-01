'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class BasisPageEffect {
  constructor(args = {}) {
    this.args = args;
    this.args.pageEffect = this.args.pageEffect || '.c-page-effect';
    this.args.duration = this.args.duration || 0 === this.args.duration ? this.args.duration : 200;

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    this.container      = document.querySelector(this.args.pageEffect);
    this.pageOutObjects = document.querySelectorAll('[data-page-effect-link="true"], a[href]:not([target="_blank"]):not([href^="#"]):not([href*="javascript"]):not([href*=".jpg"]):not([href*=".jpeg"]):not([href*=".gif"]):not([href*=".png"]):not([href*=".mov"]):not([href*=".swf"]):not([href*=".mp4"]):not([href*=".flv"]):not([href*=".avi"]):not([href*=".mp3"]):not([href*=".pdf"]):not([href*=".zip"]):not([href^="mailto:"]):not([data-page-effect-link="false"])');

    if (! this.container) {
      return;
    }

    window.addEventListener('load', () => this._fadeInPage(), false);

    forEachHtmlNodes(
      this.pageOutObjects,
      (link) => {
        link.addEventListener(
          'click',
          (event) => {
            if (event.shiftKey || event.ctrlKey || event.metaKey) {
              return;
            }

            event.preventDefault();
            this._fadeOutPage();
            this._moveLocation(link.getAttribute('href'));
          },
          false
        );
      }
    );
  }

  _moveLocation(url) {
    setTimeout(() => location.href = url, this.args['duration']);
  }

  _fadeInPage() {
    this.container.setAttribute('aria-hidden', 'true');
    this.container.setAttribute('data-page-effect', 'fadein');
  }

  _fadeOutPage() {
    this.container.setAttribute('aria-hidden', 'false');
    this.container.setAttribute('data-page-effect', 'fadeout');
  }
}
