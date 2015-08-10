export class Utils {
  static objectEquals(obj1, obj2) {
    var i, obj1Keys = Object.keys(obj1),
        obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) return false;

    for (i = 0; i < obj1Keys.length; i++) {
      key = obj1Keys[i];
      if (obj1[key] === obj2[key]) {
        //Move along
      }
      else if (
          typeof obj1[key] === 'object' &&
          typeof obj2[key] === 'object' &&
          !Utils.objectEquals(obj1, obj2)) {

        return false;
      }
    }

    return true;
  }
}
