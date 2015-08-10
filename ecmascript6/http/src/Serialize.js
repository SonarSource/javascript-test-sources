function serialize (data) {
  if (data instanceof Object) {
    return JSON.stringify(data);
  }
  else if (typeof data === 'undefined') {
    return '';
  }
  else {
    return `${data}`;
  }
}

export {serialize};
