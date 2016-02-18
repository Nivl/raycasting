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

    this.w = this.map.length;
    this.h = this.map[0].length;
  }

  static validMap(map) {
    if (Array.isArray(map) === false) {
      return WMapErrors.generateError([0, 0], WMapErrors.NOT_AN_ARRAY);
    }

    const dataCount = {};
    const nbRow = map.length;

    for (let i = 0; i < nbRow; i++) {
      const row = map[i];

      if (Array.isArray(row) === false) {
        return WMapErrors.generateError([i, 0], WMapErrors.NOT_AN_ARRAY);
      }

      for (let j = 0; j < row.length; j++) {
        const value = row[j];

        // Checking the white list
        if (this.whiteList.indexOf(value) === -1) {
          return WMapErrors.generateError([i, j], WMapErrors.NOT_AN_ARRAY, [value]);
        }

        // Checking the count limit
        if (this.limits[value] && dataCount[value] && dataCount[value] >= this.limits[value]) {
          return WMapErrors.generateError([i, j], WMapErrors.NOT_AN_ARRAY, [value, this.limits[value]]);
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
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] === type) {
          return [i, j];
        }
      }
    }

    return null;
  }

  findAt(x, y) {
    return this.map[x][y];
  }
}
