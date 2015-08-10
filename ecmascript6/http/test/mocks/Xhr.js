/**
 * Previously MockXhr
 * function MockXhr() {
 *   MockXhr.$$lastInstance = this;
 *
 *   this.open = function(method, url, async) {
 *     this.$$method = method;
 *     this.$$url = url;
 *     this.$$async = async;
 *     this.$$reqHeaders = {};
 *     this.$$respHeaders = {};
 *   };
 *
 *   this.send = function(data) {
 *     this.$$data = data;
 *   };
 *
 *   this.setRequestHeader = function(key, value) {
 *     this.$$reqHeaders[key] = value;
 *   };
 *
 *   this.getResponseHeader = function(name) {
 *     var header = this.$$respHeaders[name];
 *     if (header) return header;
 *
 *     name = angular.lowercase(name);
 *     header = this.$$respHeaders[name];
 *     if (header) return header;
 *
 *     header = undefined;
 *     angular.forEach(this.$$respHeaders, function(headerVal, headerName) {
 *       if (!header && angular.lowercase(headerName) == name) header = headerVal;
 *     });
 *     return header;
 *   };
 *
 *   this.getAllResponseHeaders = function() {
 *     var lines = [];
 *
 *     angular.forEach(this.$$respHeaders, function(value, key) {
 *       lines.push(key + ': ' + value);
 *     });
 *     return lines.join('\n');
 *   };
 *
 *   this.abort = angular.noop;
 * }
 */
export class MockXhr {
  constructor() {}

  open(method, url, async) {
    this.$$method = method;
    this.$$url = url;
    this.$$async = async;
    this.$$reqHeaders = {};
    this.$$respHeaders = {};
  }

  send(data) {
    this.$$data = data;
  }

  setRequestHeader(key, value) {
    this.$$reqHeaders[key] = value;
  }

  getResponseHeader(name) {
    var names, i, header = this.$$respHeaders[name];
    if (header) return header;

    name = name.toLowerCase();
    header = this.$$respHeaders[name];
    if (header) return header;

    header = undefined;

    names = Object.keys(this.$$respHeaders);

    for (i = 0; i < names.length; i++) {
      key = names[i];
      if (!header && name === key.toLowerCase()) {
        header = this.$$respHeaders[key];
      }
      break;
    }
  }

  getAllResponseHeaders() {
    var lines = [], i, headerKeys, key;

    headerKeys = Object.keys(this.$$respHeaders);

    for (i = 0; i < headerKeys.length; i++) {
      key = headerKeys[i];
      lines.push(key + ': ' + this.$$respHeaders[key]);
      return lines.join('\n');
    }
  }

  abort() {}
}
