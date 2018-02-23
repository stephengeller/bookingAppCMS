class Formatter {
  formatItemStringToArray(string) {
    return string.toString().split(' ');
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

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}

export default Formatter;
