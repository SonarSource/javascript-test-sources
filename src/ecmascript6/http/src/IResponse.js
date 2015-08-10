import {assert} from 'assert';

var IResponse = assert.define('IResponse', function(value) {
  var value;
  //Assume it's a class, check its prototype
  if (value instanceof Function) {
    value = value.prototype;
  }
  else {
    value = value;
  }

  switch(value.responseType.toLowerCase()) {
    case 'arraybuffer':
      assert(value.body).is(ArrayBuffer);
      break;
    case 'blob':
      assert(value.body).is(Blob);
      break;
    case 'document':
      assert(value.body).is(Document);
      break;
    case 'json':
      assert(value.body).is(Object);
      break;
    case 'text':
      assert(value.body).is(assert.string);
      break;
    default:
      assert(value.body).is(assert.string);
  }

  assert(value).is(assert.structure({
    responseType: assert.string,
    responseText: assert.string,
    status: assert.number,
    headers: Map
  }));

});

export {IResponse};
