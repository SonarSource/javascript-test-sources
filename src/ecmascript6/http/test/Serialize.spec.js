import {serialize, deserialize} from '../src/Serialize';

describe('serialize()', function() {
  it('should stringify objects', function() {
    expect(serialize({name: 'Jeff'})).toBe('{"name":"Jeff"}');
  });


  it('should stringify arrays', function() {
    expect(serialize({names: ['Jeff', 'Brian', 'Igor']})).toBe('{"names":["Jeff","Brian","Igor"]}');
  });


  it('should return the data as is if already a string', function() {
    expect(serialize('{"name":"Jeff"}')).toBe('{"name":"Jeff"}');
  });


  it('should return an empty string for undefined input', function() {
    expect(serialize(undefined)).toBe('');
  });


  it('should ensure that data is returned as string', function() {
    expect(serialize(0)).toBe('0');
    expect(serialize(1)).toBe('1');
  });


  it('should serialize null', function() {
    expect(serialize(null)).toBe('null');
  });


  it('should serialize false', function() {
    expect(serialize(false)).toBe('false');
  });
});
