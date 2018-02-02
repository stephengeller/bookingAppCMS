import React, { Component } from 'react';
import PropertyForm from './PropertyForm'
import { Button, Icon } from 'react-materialize';


class ApiPropertyManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [
                {
                    name: 'API Beautiful 4 Bedroom Flat off Brick Lane',
                    location: '10 Hereford Street',
                    owner: 'Stephen Geller',
                    startDate: '2018-10-01',
                    endDate: '2018-10-25',
                    phoneNumber: '07763123456',
                    email: 'notmy@email.com',
                    counter: 0
                }
            ],
            title: 'Property Manager',
            counter: 1
        };
        this.removeProperty = this.removeProperty.bind(this);
        this.findPropertyByCounter = this.findPropertyByCounter.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.showPropertyDetails = this.showPropertyDetails.bind(this)
    }
    removeProperty(counter) {
        let properties = this.state.properties;
        let property = this.findPropertyByCounter(counter);
        let index = properties.indexOf(property);
        if (index > -1) {
            properties.splice(index, 1);
        }
        this.setState({properties});
    }

    showPropertyDetails(counter) {
        let property = this.findPropertyByCounter(counter);
        console.log('DETAILS:');
        console.log(property);
    }

    convertToDate(date) {
        return new Date(date).toDateString()
    }

    findPropertyByCounter(index) {
        let properties = this.state.properties;
        return properties.find(property => {
            return property.counter === index;
        });
    }

    updateProperties(property) {
        let properties = this.state.properties;
        properties.push(property);
        this.setState({ properties });
        console.log(this.state.properties)
    }



    render() {
        let properties = this.state.properties;
        return (
            <div className="container">
                < PropertyForm updateProperties={this.updateProperties.bind(this)} counter={this.state.counter} />
                <div className="divider" />
                <ul>
                    {properties.map(property => {
                        return (<li key={property.counter}>
                                {property.name}
                            </li>
                        )})
                    }
                    <div className="container"></div>
                </ul>
            </div>
        );
    }
}

export default ApiPropertyManager;
