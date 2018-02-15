class ArrayFormatter {
  formatItemStringToArray(string) {
    if (string && typeof string === String && string.length > 0) {
      // return string.replace(/[^a-zA-Z\d]/g, ' ').split(' ');
      return string.split(' ');
    } else {
      return string;
    }
  }

  convertAddressToArray(propertyObject) {
    const arr = [];
    const fields = ['addressLine1', 'addressLine2', 'city', 'postcode'];
    fields.forEach(field => {
      arr.push(propertyObject[field]);
    });
    return arr;
  }
}

export default ArrayFormatter;
