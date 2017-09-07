const WalkTourMixin = window.MyMixins.WalkTourMixin;
class WalkTourDemo extends WalkTourMixin(Polymer.Element) {
  static get is() {
    return 'walk-tour-demo';
  }
  start() {
    this.$.tourEl.reset();
    Polymer.Async.timeOut.run(() => {
      this._showHelp(this.$.div1, 'DashBoard', 'This is the Main Page .View User Preferences Here!');
      this._showHelp(this.$.div2, 'Charts Menu', 'View Your Statistics Here!');
      this._showHelp(this.$.div3, 'Maps Menu', 'View Different Locations on Map Here !');
    }, 1000);
  }
}

customElements.define(WalkTourDemo.is, WalkTourDemo);
