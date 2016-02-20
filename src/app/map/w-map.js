import WMapErrors from './w-map-errors';

export default class WMap {
  static get whiteList() {
    return [0, 1, 2];
  }

  static get mandatoryList() {
    return [2];
  }

  static get limits() {
    return {
      2: 1,
    };
  }

  constructor(map) {
    this.map = map;

    const err = WMap.validMap(map);
    if (err) {
      throw new Error(err.message);
    }

    this.h = this.map.length;
    this.w = this.map[0].length;
  }

  static validMap(map) {
    if (Array.isArray(map) === false) {
      return WMapErrors.generateError([0, 0], WMapErrors.NOT_AN_ARRAY);
    }

    const dataCount = {};
    const nbRow = map.length;

    for (let y = 0; y < nbRow; y++) {
      const row = map[y];

      if (Array.isArray(row) === false) {
        return WMapErrors.generateError([y, 0], WMapErrors.NOT_AN_ARRAY);
      }

      for (let x = 0; x < row.length; x++) {
        const value = row[x];

        // Checking the white list
        if (this.whiteList.indexOf(value) === -1) {
          return WMapErrors.generateError([y, x], WMapErrors.NOT_AN_ARRAY, [value]);
        }

        // Checking the count limit
        if (this.limits[value] && dataCount[value] && dataCount[value] >= this.limits[value]) {
          return WMapErrors.generateError([y, x], WMapErrors.NOT_AN_ARRAY, [value, this.limits[value]]);
        }

        dataCount[value] = ~~dataCount[value] + 1;
      }
    }

    // Checking the mandatory list
    for (const value of this.mandatoryList) {
      if (!dataCount[value]) {
        return WMapErrors.generateError([0, 0], WMapErrors.TYPE_MISSING, [value]);
      }
    }

    return null;
  }

  findFirst(type) {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === type) {
          return { x, y };
        }
      }
    }

    return null;
  }

  findAt(x, y) {
    return this.map[y][x];
  }

  browse(callback) {
    let isNewRow = true;

    for (let y = 0; y < this.map.length; y++) {
      isNewRow = true;
      for (let x = 0; x < this.map[y].length; x++) {
        callback(y, x, this.map[y][x], isNewRow);
        isNewRow = false;
      }
    }
  }
}
