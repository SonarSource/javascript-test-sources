import {IRequest} from '../src/IRequest';
import {assert} from 'assert';

describe('IRequest', function() {
  var basicRequest;
  beforeEach(function(){
    basicRequest = {
      responseType: 'json',
      method: 'get',
      params: new Map(),
      data: '',
      headers: new Map()
    }
  });


  it('should complain if responseType is missing', function() {
    delete basicRequest.responseType;
    expect(function() {
      assert.type(basicRequest, IRequest);
    }).toThrow();
    basicRequest.responseType = 'json';
    assert.type(basicRequest, IRequest);
  });


  it('should complain if headers is missing', function() {
    delete basicRequest.headers;
    expect(function() {
      assert.type(basicRequest, IRequest);
    }).toThrow();
    basicRequest.headers = new Map();
    assert.type(basicRequest, IRequest);
  });


  it('should complain if method is missing', function() {
    delete basicRequest.method;
    expect(function() {
      assert.type(basicRequest, IRequest);
    }).toThrow();
    basicRequest.method = 'get';
    assert.type(basicRequest, IRequest);
  });


  it('should complain if data is missing', function() {
    delete basicRequest.data;
    expect(function() {
      assert.type(basicRequest, IRequest);
    }).toThrow();
    basicRequest.data = 'foo';
    assert.type(basicRequest, IRequest);
  });


  it('should complain if params is missing', function() {
    delete basicRequest.params;
    expect(function() {
      assert.type(basicRequest, IRequest);
    }).toThrow();
    basicRequest.params = new Map();
    assert.type(basicRequest, IRequest);
  });
});