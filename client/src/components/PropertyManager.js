import React, { Component } from 'react';
import PropertyForm from './PropertyForm';
import PropertyItem from '../components/PropertyItem';
import axios from 'axios';

class ApiPropertyManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
    this.deleteProperty = this.deleteProperty.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  deleteProperty(property) {
    console.log('attempting to delete property');
    axios
      .delete('http://localhost:3000/properties/' + property.id)
      .then(response => {
        console.log('successful delete of id: ' + property.id);
        this.getProperties();
      })
      .catch(function(error) {
        console.log('delete error: ', error);
      });
  }

  getProperties() {
    axios
      .get('http://localhost:3000/properties/search')
      .then(response => {
        const properties = response.data;
        this.setState({ properties });
        return properties;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    let properties = this.state.properties.reverse();
    return (
      <div className="container">
        <h2 className="center-align">Properties</h2>
        <br />
        <div className="center-align">
          <button
            className="btn waves-effect waves-light"
            onClick={() => this.getProperties()}
          >
            Get Properties
          </button>
        </div>
        {properties.map(property => {
          return (
            <PropertyItem
              property={property}
              key={property.id}
              deleteProperty={this.deleteProperty}
            />
          );
        })}
      </div>
    );
  }
}

export default ApiPropertyManager;
