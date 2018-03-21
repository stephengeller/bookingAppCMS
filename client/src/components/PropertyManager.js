import React, { Component } from 'react';
import { Preloader, Input } from 'react-materialize';

import PropertyItem from '../components/PropertyItem';
import GoToAddPropertyButton from './buttons/GoToAddPropertyButton';

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
    this.filterResults = this.filterResults.bind(this);
  }

  deleteProperty(property) {
    this.props.apiClient
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
    this.props.apiClient
      .get('/properties/search')
      .then(response => {
        const properties = response.data.reverse();
        this.loaded = true;
        this.setState({ properties, allProperties: properties });
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

  filterResults(propertyName) {
    const properties = this.state.allProperties.filter(property => {
      return property.title.toLowerCase().includes(propertyName.toLowerCase());
    });
    this.setState({ properties });
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    let { properties, error } = this.state;
    return (
      <div className="container">
        <div className="error" style={error.style} id="error">
          {error.message}
        </div>
        <GoToAddPropertyButton />
        <Input
          s={6}
          onChange={e => this.filterResults(e.target.value)}
          label="Search properties"
        />
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
