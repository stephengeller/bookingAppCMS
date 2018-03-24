import React from 'react';
import { Alert } from 'react-bootstrap';

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
      style: 'danger',
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

  createErrorMessage(message, boolean) {
    const color = boolean ? 'success' : 'danger';
    return {
      message,
      style: color
    };
  }

  renderAlert(error) {
    if (error === null) {
      return;
    }
    return (
      <Alert bsStyle={error.style}>
        <p>{error.message}</p>
      </Alert>
    );
  }
}

export default ErrorHandler;
