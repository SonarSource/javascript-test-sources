import {IResponse} from '../src/IResponse';
import {assert} from 'assert';

describe('IResponse', function() {
  var basicResponse;
  beforeEach(function(){
    basicResponse = {
      body: '',
      responseType: '',
      responseText: '',
      status: 200,
      headers: new Map()
    }
  });


  it('should complain if status is missing', function() {
    delete basicResponse.status;
    expect(function() {
      assert.type(basicResponse, IResponse);
    }).toThrow();
    basicResponse.status = 0;
    assert.type(basicResponse, IResponse);
  });


  it('should complain if headers is missing', function() {
    delete basicResponse.headers;
    expect(function() {
      assert.type(basicResponse, IResponse);
    }).toThrow();
    basicResponse.headers = new Map();
    assert.type(basicResponse, IResponse);
  });


  it('should complain if responseText is missing', function() {
    delete basicResponse.responseText;
    expect(function() {
      assert.type(basicResponse, IResponse);
    }).toThrow();
    basicResponse.responseText = 'foo';
    assert.type(basicResponse, IResponse);
  });


  it('should complain if body is missing', function() {
    delete basicResponse.body;
    expect(function() {
      assert.type(basicResponse, IResponse);
    }).toThrow();
    basicResponse.body = 'foo';
    assert.type(basicResponse, IResponse);
  });


  it('should require that the body match the responseType', function() {
    basicResponse.responseType = 'text';
    basicResponse.body = {};
    expect(function() {
      assert.type(basicResponse, IResponse);
    }).toThrow();
    basicResponse.responseType = 'arraybuffer'
    basicResponse.body = new ArrayBuffer();
    assert.type(basicResponse, IResponse);
    basicResponse.responseType = 'blob';
    basicResponse.body = new Blob();
    assert.type(basicResponse, IResponse);
    basicResponse.responseType = 'document'
    basicResponse.body = document;
    assert.type(basicResponse, IResponse);
    basicResponse.responseType = 'json';
    basicResponse.body = {};
    assert.type(basicResponse, IResponse);
    basicResponse.responseType = 'text';
    basicResponse.body = 'foo';
    assert.type(basicResponse, IResponse);
  });
});