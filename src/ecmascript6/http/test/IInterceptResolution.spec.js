import {assert} from 'assert';
import {IInterceptResolution} from '../src/IInterceptResolution';

describe('IInterceptResolution', function() {
  var sampleRequest, sampleResponse;

  beforeEach(function() {
    sampleRequest = {
        method: 'GET',
        url: '/users',
        headers: new Map(),
        params: new Map(),
        responseType: 'text',
        data: ''
      };

      sampleResponse = {
        headers: new Map(),
        body: 'foo',
        responseType: 'text',
        responseText: 'foo',
        status: 200
      }
  });

  it('should complain if interceptType is invalid', function() {
      expect(function() {
        assert.type({
          req: sampleRequest,
          interceptType: 'something else'
        }, IInterceptResolution);
      }).toThrowError(/.*interceptType must be \"request\" or \"response\"\, got\: something else.*/);
      expect(function() {
        assert.type({
          req: sampleRequest
        }, IInterceptResolution);
      }).toThrowError(/.*interceptType must be \"request\" or \"response\"\, got\: undefined.*/);
    });


    it('should complain if req is not a valid request', function() {
      expect(function() {
        assert.type({
          req: {},
          interceptType: 'request'
        }, IInterceptResolution);
      }).toThrowError(/.*Expected an instance of IRequest.*/);
    });


    it('should complain if res is not a valid response if interceptType is "response"', function() {
      expect(function() {
        assert.type({
          req: sampleRequest,
          res: {},
          interceptType: 'response'
        }, IInterceptResolution);
      }).toThrowError(/Expected an instance of IResponse/);
    });


    it('should complain if res is not a valid response if defined', function() {
      expect(function() {
        assert.type({
          req: sampleRequest,
          res: {},
          interceptType: 'response'
        }, IInterceptResolution);
      }).toThrowError(/Expected an instance of IResponse/);
    });


    it('should not complain if res is not defined if an err is present and interceptType is "response"', function() {
      expect(function() {
        assert.type({
          req: sampleRequest,
          err: {},
          interceptType: 'response'
        }, IInterceptResolution);
      }).not.toThrow();
    });
});
