class ArrayFormatter {
  formatItemStringToArray(string) {
    return string.split(' ');
  }

  convertAddressToArray(propertyObject) {
    const arr = [];
    const fields = ['addressLine1', 'addressLine2', 'city', 'postcode'];
    fields.forEach(field => {
      if (propertyObject[field]) {
        arr.push(propertyObject[field]);
      }
    });
    return arr;
  }
}

export default ArrayFormatter;
