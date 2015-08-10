import {assert} from 'assert';
import {IResponse} from './IResponse';
import {IRequest} from './IRequest';

var IInterceptResolution = assert.define('IInterceptResolution', function(value) {
  var {err, req, res, interceptType} = value;

  if (['response','request'].indexOf(interceptType) === -1) {
    throw new Error('interceptType must be "request" or "response", got: ' + interceptType);
  }

  /**
   * There should never be a case where the request object would not be part
   * of the resolution object
   */
  assert.type(req, IRequest);

  /**
   * The response object is only required if the interceptType is 'response' and there
   * is no error object in the resolution. However, if a property of 'res' is
   * provided, it will be enforced against the IResponse interface.
   */
  if ((interceptType === 'response' && !err) || res) {
    res && assert.type(res, IResponse);
  }
});

export {IInterceptResolution};
