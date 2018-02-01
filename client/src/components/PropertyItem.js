import React, { Component } from 'react'
import axios from 'axios'

class PropertyItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let property = this.props.property
    return (
      <section>
          <h5>{property.title}</h5>
          <h6>{property.description}</h6>
          <div>{property.ownerId}</div>
          <div>{property.facilities}</div>
          <button onClick={() => this.props.deleteProperty(property)}>Delete me!</button>
          <br/>
      </section>
    )
  }
}

export default PropertyItem
