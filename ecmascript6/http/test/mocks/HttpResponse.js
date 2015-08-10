/**
 * Formerly createResponse()
 *  function createResponse(status, data, headers) {
 *    if (angular.isFunction(status)) return status;
 *
 *    return function() {
 *      return angular.isNumber(status)
 *          ? [status, data, headers]
 *          : [200, status, data];
 *    };
 *  }
 */
export class MockHttpResponse {
  constructor(status, data, headers) {
    this.list = [];
    if (typeof status === 'function') {
      this.list.splice(0, 0, status);
    }
    else if (typeof status === 'number') {
      this.list.splice(0, 0, [status, data, headers]);
    }
    else {
      this.list.splice(0, 0, [200, status, data])
    }
  }

  respond() {
    return this.list;
  }
}

