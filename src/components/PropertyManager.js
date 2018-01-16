import React, { Component } from 'react'

class PropertyManager extends Component {
    constructor(props) {
        super(props);
        this.addProperty = this.addProperty.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
        this.state = {
            properties: [],
            title: 'Property Manager',
            counter: 0
        }
    }

    findPropertyByCounter(index) {
        let properties = this.state.properties;
        return properties.find(property => {
            return property.counter === index;
        });
    }

    addProperty(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let location = this.refs.location.value;
        let counter = this.state.counter;
        if (name && location) {
            let property = {
                name,
                location,
                counter
            };
            counter += 1;
            this.state.properties.push(property);
            this.setState({ properties: this.state.properties, counter });
            this.refs.propertyForm.reset()
        }
    }

    removeProperty(counter) {
        let properties = this.state.properties;
        let property = this.findPropertyByCounter(counter);
        let index = properties.indexOf(property);
        if (index > -1) {
            properties.splice(index, 1);
        }
        this.setState({ properties });
    }
    render() {
        let properties = this.state.properties;
        return (
            <div>
                <h3>{this.state.title}</h3>
                <form ref='propertyForm'>
                    <input type="text" ref="name" placeholder='Property Name'/>
                    <input type="text" ref="location" placeholder='Location'/>
                    <button className='btn btn-primary' onClick={this.addProperty}>Add Property</button>
                </form>
                <ul>
                    {properties.map(property => {
                        return <li key={property.counter}>
                            <h5>{property.name}</h5>
                            <h6>{property.location}</h6>
                            <button className='btn btn-danger' onClick={this.removeProperty.bind(null, property.counter)}>Remove Property</button>
                            </li>;
                    })}
                </ul>
            </div>
        )

    }
}

export default PropertyManager