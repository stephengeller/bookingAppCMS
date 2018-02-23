class ErrorHandler {
  emptyBoxErrorHandler(fieldNames, state) {
    const missingFields = [];

    fieldNames.forEach(field => {
      if (!state.fields[field]) {
        console.log('missing:', field);
        missingFields.push(field);
      }
    });

    const messageString =
      'The following fields are required: ' + missingFields.join(', ');

    return {
      style: { color: 'red' },
      message: messageString
    };
  }

  allFieldsAreCompleted(requiredFields, fields) {
    for (let i = 0; i < requiredFields.length; i++) {
      if (!fields[requiredFields[i]]) {
        return false;
      }
    }
    return true;
  }
}

export default ErrorHandler;
