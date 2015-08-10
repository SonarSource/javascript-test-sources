import {JSONPConnection} from '../src/JSONPConnection';
import {assert} from 'assert';
import {IConnection} from '../src/IConnection';
import {inject} from 'di/testing';
import {PromiseBackend, PromiseMock} from 'prophecy/PromiseMock';

describe('JSONPConnection', function() {
  it('should implement IConnection', function() {
    assert.type(JSONPConnection, IConnection);
  });

  describe('constructor', function() {
    it('should create a promise for the connection', function() {
      var connection = new JSONPConnection();
      expect(connection.promise instanceof Promise).toBe(true);
    });
  });


  describe('.open()', function() {
    it('should replace `JSON_CALLBACK` with generated callback name', function() {
      var connection = new JSONPConnection();
      connection.open('/base/test/fixtures/jsonp/users.json?callback=JSON_CALLBACK');
      var cb = connection.callback_;
      expect(connection.url).toBe(`/base/test/fixtures/jsonp/users.json?callback=__ngHttp__.jsonp.${cb.id}`);
    });

    it('should set the method to the instance as GET', function() {
      var connection = new JSONPConnection();
      connection.open('/base/test/fixtures/jsonp/users.json?callback=JSON_CALLBACK');
      expect(connection.method).toBe('GET');
    });


    it('should complain if open is called more than once', function() {
      var connection = new JSONPConnection();
      connection.open('/base/test/fixtures/jsonp/users.json?callback=JSON_CALLBACK');
      expect(function() {
        connection.open('/base/test/fixtures/jsonp/users.json?callback=JSON_CALLBACK');
      }).toThrow();
    });


    it('should fulfill promise if loaded script calls callback', function() {
      var connection = new JSONPConnection();
      var resolveSpy = spyOn(connection.deferred, 'resolve');
      connection.open('/base/test/fixtures/jsonp/bad.json?callback=JSON_CALLBACK');
      connection.callback_();
      connection.onLoad_({ fakeEvent: true });
      expect(resolveSpy).toHaveBeenCalled();
    });


    it('should reject promise if loaded script does not call callback', function() {
      var connection = new JSONPConnection();
      var rejectSpy = spyOn(connection.deferred, 'reject');
      connection.open('/base/test/fixtures/jsonp/bad.json?callback=JSON_CALLBACK');
      connection.onLoad_({fakeEvent: true});
      expect(rejectSpy).toHaveBeenCalled();
    });


    it('should reject promise if script is not loaded', function() {
      var connection = new JSONPConnection();
      var rejectSpy = spyOn(connection.deferred, 'reject');
      connection.open('/base/test/fixtures/jsonp/bad.json?callback=JSON_CALLBACK');
      connection.onError_({fakeEvent: true});
      expect(rejectSpy).toHaveBeenCalled();
    });
  });


  describe('instance', function() {
    it('should be thenable at the instance level', function(){
      var connection = new JSONPConnection();
      expect(typeof connection.then).toBe('function');
    });
  });


  describe('.promise', function() {
    it('should return a promise', function() {
      assert.type(new JSONPConnection().promise, Promise);
    })
  });
});
