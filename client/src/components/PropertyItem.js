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

  toggleEditor() {
    const oppositeOfPrevious = !this.state.showPropertyEditor;
    this.setState({ showPropertyEditor: oppositeOfPrevious });
  }

  hideEditor() {
    this.setState({ showPropertyEditor: false });
  }

  render() {
    const { property } = this.props;
    let facilitiesString;
    if (property.facilities) {
      facilitiesString = property.facilities.join(', ');
    }
    return (
      <section className="property-item center-align ">
        <h4 className="property-line-title">{property.title}</h4>
        <h6 className="property-line">
          <div className="property-line-title">Description: </div>
          {property.description}
        </h6>
        <div className="property-line">
          <div className="property-line-title">OwnerID: </div>
          {property.ownerId}
        </div>
        <div className="property-line">
          <div className="property-line-title">Facilities: </div>
          {facilitiesString}
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
              {this.state.showPropertyEditor
                ? 'Hide Property Editor'
                : 'Edit Property'}
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
