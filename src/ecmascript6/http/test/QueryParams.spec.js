import {encodeValue, toQueryString} from '../src/QueryParams';

describe('toQueryString()', function() {
  it('should do basic request with params and encode', function() {
    var queryParams = new Map();
    queryParams.set('a=', '?&');
    queryParams.set('b', 2);
    expect(toQueryString(queryParams)).toBe('a%3D=%3F%26&b=2');
  });


  it('should merge params if url contains some already', function() {
    var queryParams = new Map();
    queryParams.set('a', 1);
    queryParams.set('b', 2);
    expect(toQueryString(queryParams, true)).toBe('a=1&b=2');
  });


  it('should jsonify objects in params map', function() {
    var queryParams = new Map();
    queryParams.set('a', 1);
    queryParams.set('b', {c:3});
    expect(toQueryString(queryParams)).toBe('a=1&b=%7B%22c%22:3%7D')
  });


  it('should expand arrays in params map', function() {
    var queryParams = new Map();
    queryParams.set('a', [1,2,3]);
    expect(toQueryString(queryParams)).toBe('a=1&a=2&a=3')
  });


  it('should not encode @ in url params', function() {
    var queryParams = new Map();
    queryParams.set(':bar', '$baz@1');
    queryParams.set('!do&h', 'g=a h');

    expect(toQueryString(queryParams)).
        toBe(':bar=$baz@1&!do%26h=g%3Da+h');
  });
});


describe('encodeValue()', function() {
  it('should urlEncode value', function() {
    expect(encodeValue('http://%.com')).
        toBe('http:%2F%2F%25.com');
  });


  it('should create a key/value pair for each item in the array \
    (excluding the key from the first item)', function() {
      expect(encodeValue(['jeff','igor','tobias'], 'person')).
          toBe('jeff&person=igor&person=tobias');
  });


  it('should complain if given an array without an encodedKey', function() {
    expect(function () {
      encodeValue(['jeff', 'igor', 'tobias']);
    }).
    toThrow();
  });
});
