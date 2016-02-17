export default class WMapErrors {
  static get NOT_AN_ARRAY() {
    return 1;
  }

  static get NOT_VALID_TYPE() {
    return 2;
  }

  static get TYPE_LIMIT_HIT() {
    return 3;
  }

  static get TYPE_MISSING() {
    return 4;
  }

  static _get(extraData, index) {
    return (extraData) ? (extraData[index] || '') : ('');
  }

  static codeToString(code, extraData) {
    const msg = {};
    msg[this.NOT_AN_ARRAY] = `Not an Array`;
    msg[this.NOT_VALID_TYPE] = `${this._get(extraData, 0)} is not a valid type`;
    msg[this.TYPE_LIMIT_HIT] = `type ${this._get(extraData, 0)} is limited to ${this._get(extraData, 1)}`;
    msg[this.TYPE_MISSING] = `type ${this._get(extraData, 0)} is mandatory`;

    return msg[code] || 'unknown';
  }

  static generateMessage(at, code, extraData) {
    return `Error at position ${at}: ${this.codeToString(code, extraData)}`;
  }
  static generateError(at, code, extraData) {
    return {
      at,
      code,
      extraData,
      message: this.generateMessage(at, code, extraData),
    };
  }
}
