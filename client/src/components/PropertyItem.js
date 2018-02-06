import React, { Component } from 'react';
import PropertyItemEditor from './PropertyItemEditor';

class PropertyItem extends Component {
  constructor(props) {
    super(props);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.hideEditor = this.hideEditor.bind(this);
    this.state = {
      showPropertyEditor: false
    };
  }

  toggleEditor(property) {
    const oppositeOfPrevious = !this.state.showPropertyEditor;
    this.setState({ showPropertyEditor: oppositeOfPrevious });
  }

  hideEditor(property) {
    this.setState({ showPropertyEditor: false });
  }

  render() {
    let property = this.props.property;
    return (
      <section className="property-item center-align">
        <h5>{property.title}</h5>
        <h6 className="property-line">
          <span className="property-line-title">Description: </span>
          {property.description}
        </h6>
        <div className="property-line">
          <span className="property-line-title">OwnerID: </span>
          {property.ownerId}
        </div>
        <div className="property-line">
          <span className="property-line-title">Facilities: </span>
          {property.facilities}
        </div>
        <div className="container">
          <span className="right-align">
            <button
              className="btn waves-effect waves-light red accent-4"
              onClick={() => this.props.deleteProperty(property)}
            >
              Delete Property
            </button>
          </span>
          <span className="left-align">
            <button
              className="btn waves-effect waves-light blue accent-2"
              onClick={() => this.toggleEditor(property)}
            >
              Edit Property
            </button>
            {this.state.showPropertyEditor ? (
              <PropertyItemEditor
                property={property}
                hideEditor={this.hideEditor}
              />
            ) : null}
          </span>
        </div>
        <br />
      </section>
    );
  }
}

export default PropertyItem;
