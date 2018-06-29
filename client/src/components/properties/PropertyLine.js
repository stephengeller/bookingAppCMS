import React, { Component } from 'react';

const PropertyLine = ({field, label}) => {
  return (
      <div className="property-line">
          <div className="property-line-title">{label}: </div>
          {field}
      </div>
  )
}

export default PropertyLine;
