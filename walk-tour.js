class WalkTour extends Polymer.Element {
  static get is() {
    return 'walk-tour';
  }
  static get properties() {
    return {
      _walkthrough_steps: {
        type: Array,
        value: [],
      },
      skipTour: {
        type: String,
        value: 'Skip Tour',
      },
      _i_value: {
        type: Number,
        value: -1,
      },
      welcomeShow: {
        type: Boolean,
        value: true,
      },
      welcomeTitle: {
        type: String,
        value: 'Welcome',
      },
      welcomeMsg: {
        type: String,
        value: 'You can go to and fro between elements using mouse as well as keyboard (left, right keys and esc key to exit). Click on screen to move to next.',
      },
      _cookies: {
        type: Object,
        value: {},
      },
      _newData: {
        type: Array,
        value: [],
      },
      _check: {
        type: Boolean,
        value: false,
      },
      target: {
        type: Object,
        value: document.body,
      },
    };
  }
  _checkButton(e) {
    switch (e.detail.key) {
      case 'right':
        this._nextAction();
        break;
      case 'left':
        this._prevAction();
        break;
      default:
        this._crossAction();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('walk-tour-start', this._handleEvent.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('walk-tour-start', this._handleEvent.bind(this));
  }
  reset() {
    this.set('_cookies', {});
  }
  _handleEvent(e) {
    this.$.tooltip.style.display = 'initial';
    this.push('_walkthrough_steps', e.detail);
    const id = this._walkthrough_steps[this._walkthrough_steps.length - 1].id;
    const version = this._walkthrough_steps[this._walkthrough_steps.length - 1].version;
    if (!(id in this._cookies) || (this._cookies[id] !== version)) {
      this.push('_newData', this._walkthrough_steps[this._walkthrough_steps.length - 1]);
      this._cookies[id] = this._walkthrough_steps[this._walkthrough_steps.length - 1].version;
      this.$.storage.setStoredValue(id, 1);
      this._check = true;
    }
    if (this._newData.length === 1 && this._check) {
      this.$.overlay.style.display = 'initial';
      this.$.overlay_back.style.display = 'initial';
      this._check = false;
      this._fetch();
    }
  }
  _nextAction() {
    if (this._i_value < this._newData.length) {
      this._i_value = this._i_value + 1;
      this._renderTooltip();
    }
  }
  _prevAction() {
    if (this._i_value > 0) {
      this._i_value = this._i_value - 1;
      this._renderTooltip();
    }
  }
  _crossAction() {
    this.$.overlay.style.display = 'none';
    this.$.overlay_back.style.display = 'none';
    this._newData = [];
    this._check = true;
    this.welcomeShow = false;
    this._i_value = -1;
  }
  _renderTooltip() {
    const prevButton = this.$.previous;
    // const nextButton = this.$.next;
    let msg = '';
    const newData = this._newData;
    const tooltipWidth = this.$.tooltip.offsetWidth;
    let tooltipHeight = 0;
    let posX = 0;
    let posY = 0;
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || e.clientWidth || g.clientWidth;
    const height = w.innerHeight || e.clientHeight || g.clientHeight;
    prevButton.style.display = 'inherit';
    this.$.pg_no.style.display = 'inline';
    this.$.skip.style.display = 'none';

    if (this._i_value < newData.length) {
      if (this._i_value === 0) {
        prevButton.style.display = 'none';
      }
      posX = newData[this._i_value].x;
      posY = newData[this._i_value].y;

      // nextButton.innerHTML = 'Next<iron-icon icon='walk-tour-icons:chevron-right'></iron-icon>';
      // prevButton.innerHTML = '<iron-icon icon='walk-tour-icons:chevron-left'></iron-icon>Prev';

      this.$.overlay.style.left = `${newData[this._i_value].el_left - 10}px`;
      this.$.overlay.style.top = `${newData[this._i_value].el_top - 10}px`;
      this.$.overlay.style.width = `${newData[this._i_value].el_width + 20}px`;
      this.$.overlay.style.height = `${newData[this._i_value].el_height + 20}px`;

      this.$.title.innerHTML = newData[this._i_value].title;
      this.$.pg_no.innerHTML = `${this._i_value + 1}of${newData.length}`;

      tooltipHeight = this.$.tooltip.offsetHeight;
      if (typeof (newData[this._i_value].message) === 'string') {
        msg = newData[this._i_value].message;
      } else {
        msg = `${newData[this._i_value].message[0]}<ul>`;
        for (let i = 1; i < newData[this._i_value].message.length; i += 1) {
          msg += `<li>${newData[this._i_value].message[i]}</li>`;
        }
        msg += '</ul>';
      }
      this.$.msg.innerHTML = msg;
      // width check
      if (posX + tooltipWidth >= width) {
        posX = posX - tooltipWidth - 5;
        const posXLimit = newData[this._i_value].x - newData[this._i_value].el_width;
        if (posX <= newData[this._i_value].x && posX >= posXLimit) {
          posX = newData[this._i_value].x - newData[this._i_value].el_width - tooltipWidth - 10;
        }
      }
      if (posX <= 0) {
        posX = (posX - posX) + 5;
      }
      // tooltip height check
      if (posY + tooltipHeight >= height) {
        if (posY + newData[this._i_value].el_height >= height) {
          posY = height - tooltipHeight - 15;
        } else {
          posY = posY - tooltipHeight - newData[this._i_value].el_height - 15;
        }
        if (posY <= 0) {
          posY += tooltipHeight;
        }
      }
      this.$.tooltip.style.left = `${posX + 5}px`;
      this.$.tooltip.style.top = `${posY + 10}px`;
    } else {
      this._newData = [];
      this._check = true;
      this.welcomeShow = false;
      this._i_value = -1;
      this.$.overlay.style.display = 'none';
      this.$.overlay_back.style.display = 'none';
    }
  }
  _fetch() {
    this.$.overlay.style.visibility = 'visible';
    this.$.overlay_back.style.visibility = 'visible';
    // styling
    if (this._newData.length === 0) {
      this.$.overlay.style.display = 'none';
      this.$.overlay_back.style.display = 'none';
    } else if (!this.welcomeShow || ('wlcm' in this._cookies)) {
      this._i_value += 1;
      this._renderTooltip();
    } else {
      this.$.msg.innerHTML = this.welcomeMsg;
      this.$.title.innerHTML = this.welcomeTitle;
      this.$.previous.style.display = 'none';
      this.$.pg_no.style.display = 'none';
      this._cookies.wlcm = '1';
    }
  }
}

customElements.define(WalkTour.is, WalkTour);
