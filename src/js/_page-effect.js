import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

function PageEffectComponent(element, props) {
  window.addEventListener('load', props.onLoad, false);

  this.close = () => {
    element.setAttribute('aria-hidden', 'true');
    element.setAttribute('data-page-effect', 'fadein');
  };

  this.open = () => {
    element.setAttribute('aria-hidden', 'false');
    element.setAttribute('data-page-effect', 'fadeout');
  }
}

function elementFireFadeOutComponent(element, props) {
  element.addEventListener(
    'click',
    (event) => {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (element.hash) {
        const _location = window.location.pathname + window.location.search;
        const _link = element.pathname + element.search;
        if (_location === _link) {
          return;
        }
      }

      event.preventDefault();

      props.onClick(event);
    },
    false
  );
}

export default class BasisPageEffect {
  constructor(args = {}) {
    this.args = args;
    this.args.pageEffect = this.args.pageEffect || '.c-page-effect';
    this.args.duration = this.args.duration || 0 === this.args.duration ? this.args.duration : 200;

    const element = document.querySelector(this.args.pageEffect);
    if (! element) {
      return;
    }

    this.pageEffect = new PageEffectComponent(
      element,
      {
        onLoad: () => this.pageEffect.close(),
      }
    );

    const elementsFireFadeOut = document.querySelectorAll('[data-page-effect-link="true"], a[href]:not([target="_blank"]):not([href^="#"]):not([href*="javascript"]):not([href*=".jpg"]):not([href*=".jpeg"]):not([href*=".gif"]):not([href*=".png"]):not([href*=".mov"]):not([href*=".swf"]):not([href*=".mp4"]):not([href*=".flv"]):not([href*=".avi"]):not([href*=".mp3"]):not([href*=".pdf"]):not([href*=".zip"]):not([href^="mailto:"]):not([data-page-effect-link="false"])');

    this.elementsFireFadeOut = [];

    forEachHtmlNodes(
      elementsFireFadeOut,
      (elementFireFadeOut, index) => {
        this.elementsFireFadeOut[ index ] = new elementFireFadeOutComponent(
          elementFireFadeOut,
          {
            onClick: () => {
              this.pageEffect.open();
              setTimeout(() => window.location.href = elementFireFadeOut.getAttribute('href'), this.args.duration);
            },
          }
        );
      }
    );
  }
}
