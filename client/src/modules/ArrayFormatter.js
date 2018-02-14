class ArrayFormatter {
  formatItemStringToArray(string) {
    if (string && typeof string === String && string.length > 0) {
      // return string.replace(/[^a-zA-Z\d]/g, ' ').split(' ');
      return string.split(' ');
    } else {
      return string;
    }
  }
}

export default ArrayFormatter;
