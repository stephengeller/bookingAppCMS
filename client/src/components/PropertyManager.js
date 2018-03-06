import React, { Component } from 'react';
import { Preloader } from 'react-materialize';

import PropertyItem from '../components/PropertyItem';
import axios from '../modules/axios';

class ApiPropertyManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: [],
      error: ''
    };
    this.loaded = false;
    this.deleteProperty = this.deleteProperty.bind(this);
    this.getProperties = this.getProperties.bind(this);
  }

  deleteProperty(property) {
    axios
      .delete('/properties/' + property.id)
      .then(() => {
        const properties = this.state.properties;
        const index = properties.indexOf(property);
        properties.splice(index, 1);
        this.setState({ properties });
        console.log(`"${property.title}" has been successfully deleted`);
      })
      .catch(function(error) {
        console.log('delete error: ', error);
      });
  }

  getProperties() {
    axios
      .get('/properties/search')
      .then(response => {
        const properties = response.data;
        this.loaded = true;
        this.setState({ properties });
        return properties;
      })
      .catch(error => {
        console.log(error);
        this.loaded = true;
        const errorMessage = {
          message: error.toString(),
          style: { color: 'red' }
        };
        this.setState({ error: errorMessage });
      });
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    let properties = this.state.properties;
    return (
      <div className="container">
        <div className="error" style={this.state.error.style} id="error">
          {this.state.error.message}
        </div>
        {this.loaded === false ? (
          <div className="center-align">
            <Preloader flashing />
          </div>
        ) : (
          properties.map(property => {
            return (
              <PropertyItem
                googleApiKey={this.props.googleApiKey}
                property={property}
                key={property.id}
                deleteProperty={this.deleteProperty}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default ApiPropertyManager;
