class ErrorHandler {
  emptyBoxErrorHandler(fieldNames, state) {
    const missingFields = [];

    fieldNames.forEach(field => {
      if (!state.fields[field['name']]) {
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

  allFieldsAreCompleted = (allFields, stateFields) => {
    for (let i = 0; i < allFields.length; i++) {
      if (!stateFields[allFields[i]['name']] && allFields['required']) {
        return false;
      }
    }
    return true;
  };

  createErrorMessage = (message, boolean) => {
    const color = boolean ? 'green' : 'red';
    return {
      message,
      style: { color }
    };
  };
}

export default ErrorHandler;
