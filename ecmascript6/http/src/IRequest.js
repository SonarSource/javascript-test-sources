import {assert} from 'assert';

var IRequest = assert.define('IRequest', function(value) {
  var value;
  //Assume it's a class, check its prototype
  if (value instanceof Function) {
    value = value.prototype;
  }
  else {
    value = value;
  }

  assert(value).is(assert.structure({
    responseType: assert.string,
    method: assert.string,
    params: Map,
    data: assert.string,
    headers: Map
  }));

});

export {IRequest};
