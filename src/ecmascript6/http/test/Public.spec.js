import {assert} from 'assert';

describe('Top-Level Module', function() {
  it('should not expose fields that should be private', function() {
    assert.type(mod, assert.structure({
      Http: Function,
      IInterceptResolution: Function,
      IConnection: Function,
      IRequest: Function,
      IResponse: Function,
      JSONPConnection: Function,
      XHRConnection: Function
    }));

    /**
     * Private methods should only be exposed to tests, or to direct imports
     * of submodules
     */
    expect(mod.fullUrl).not.toBeDefined();
    expect(mod.objectToMap).not.toBeDefined();
    expect(mod.toQueryString).not.toBeDefined();
    expect(mod.encodeValue).not.toBeDefined();
    expect(mod.serialize).not.toBeDefined();
  });
});
