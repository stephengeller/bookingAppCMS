import React from 'react';

const PropertyLine = ({field, label, toggleContents}) => {
  return (
      <div className="property-line">
          <div className="property-line-title">{label}: </div>
          <div onClick={toggleContents}>{field}</div>
      </div>
  )
}

export default PropertyLine;
