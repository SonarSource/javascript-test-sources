import {assert} from 'assert';

var IConnection = assert.define('IConnection', function(value) {
  var value;
  //Assume it's a class, check its prototype
  if (value instanceof Function) {
    value = value.prototype;
  }
  else {
    value = value;
  }

  assert(value).is(assert.structure({
    open: Function,
    send: Function,
    then: Function,
    success: Function,
    setRequestHeader: Function,
    error: Function
  }));

});

export {IConnection};
