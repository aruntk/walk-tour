let x;
let y;
window.MyMixins = window.MyMixins || {};
window.MyMixins.WalkTourMixin = parent => class extends parent {
  _showHelp(element, title, msg, version, key) {
    const box = element.getBoundingClientRect();
    const body = document.body;
    const docEl = document.documentElement;
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const top = (box.top + scrollTop) - clientTop;
    const left = (box.left + scrollLeft) - clientLeft;
    const bottom = top + (box.bottom - box.top);
    const right = left + (box.right - box.left);
    const rectWidth = box.right - box.left;
    const rectHeight = box.bottom - box.top;
    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || e.clientWidth || g.clientWidth;
    const height = w.innerHeight || e.clientHeight || g.clientHeight;
    if (left > width * (5 / 6)) {
      x = left;
    } else {
      x = right;
    }
    if (top > height * (2 / 3)) {
      y = top;
    } else {
      y = bottom;
    }
    if (x !== 0 && y !== 0) {
      window.dispatchEvent(new CustomEvent('walk-tour-start', {
        detail: {
          id: key || element.id,
          title,
          message: msg,
          x,
          y,
          el_top: top,
          el_left: left,
          el_width: rectWidth,
          el_height: rectHeight,
          version: version || 1,
        },
      }));
    }
  }
};
