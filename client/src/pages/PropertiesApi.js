import React, { Component } from 'react';
import PropertyFormApi from '../components/PropertyFormApi'
import PropertyItem from '../components/PropertyItem'
import axios from 'axios'

class PropertiesApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Stephen',
            properties: []
        };
        this.deleteProperty = this.deleteProperty.bind(this)
        this.getProperties = this.getProperties.bind(this)
    }

    deleteProperty(property) {
      console.log('attempting to delete property')
      axios
          .delete("http://localhost:3000/properties/" + property.id)
          .then((response) => {
            console.log('successful delete of id: ' + property.id)
            this.getProperties()
          })
          .catch(function(error) {
              console.log('delete error: ', error);
          })
    }

    getProperties() {
      console.log('waiting for any changes to complete first...')
      setTimeout(() => {
        axios
            .get("http://localhost:3000/properties/search")
            .then((response) => {
              const properties = response.data
                this.setState({ properties });
                console.log('successfully retrieved properties', properties)
            })
            .catch(function(error) {
                console.log(error);
            })
      }, 500)

    }

    componentDidMount() {
        this.getProperties()
    }

    render() {
        let properties = this.state.properties;
        let counter = 0
        return (
            <div className='container'>
                <h2 className="center-align">PropertiesApi</h2>
                < PropertyFormApi getProperties={this.getProperties}/>
                {properties.map(property => {
                    counter += 1
                    return (
                        < PropertyItem property={property} key={counter} deleteProperty={this.deleteProperty}/>
                      )
                    })
                }
                <button onClick={() => this.getProperties()}>Get Properties</button>
            </div>
        );
    }
}

export default PropertiesApi;
