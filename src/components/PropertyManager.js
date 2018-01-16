import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';

class PropertyManager extends Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
    this.removeProperty = this.removeProperty.bind(this);
    this.showPropertyDetails = this.showPropertyDetails.bind(this);
    this.state = {
      properties: [
        {
          name: 'Beautiful 4 Bedroom Flat off Brick Lane',
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
  }

  findPropertyByCounter(index) {
    let properties = this.state.properties;
    return properties.find(property => {
      return property.counter === index;
    });
  }

  addProperty(event) {
    event.preventDefault();
    let fields = [
      'name',
      'location',
      'owner',
      'startDate',
      'endDate',
      'phoneNumber',
      'email'
    ];
    let fieldsObject = {};
    fields.forEach(field => {
      fieldsObject[field] = this.refs[field].value;
    });
    let {
      name,
      location,
      owner,
      startDate,
      endDate,
      phoneNumber,
      email
    } = fieldsObject;
    if (name && location) {
      let counter = this.state.counter;
      let property = {
        name,
        location,
        owner,
        startDate,
        endDate,
        phoneNumber,
        email,
        counter
      };
      counter += 1;
      this.state.properties.push(property);
      this.setState({ properties: this.state.properties, counter });
      this.refs.propertyForm.reset();
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

  showPropertyDetails(counter) {
    let property = this.findPropertyByCounter(counter);
    console.log('DETAILS:');
    console.log(property);
  }

  render() {
    let properties = this.state.properties;
    return (
      <div className="container">
        <form ref="propertyForm">
          <div className="input-field col s6">
            <input id="name" ref="name" type="text" className="validate" />
            <label htmlFor="name">Property Name</label>
          </div>
          <div className="input-field col s6">
            <input
              id="location"
              ref="location"
              type="text"
              className="validate"
            />
            <label htmlFor="location">Location</label>
          </div>
          <div className="input-field col s6">
            <input id="owner" ref="owner" type="text" className="validate" />
            <label htmlFor="owner">Owner</label>
          </div>
          <div className="row">
            <div className="col s6">
              <span>Start Date</span>
              <input
                id="startDate"
                ref="startDate"
                type="date"
                className="datepicker validate"
              />
            </div>
            <div className="col s6">
              <span>End Date</span>
              <input
                id="endDate"
                ref="endDate"
                type="date"
                className="validate"
              />
            </div>
          </div>
          <input
            type="text"
            ref="phoneNumber"
            placeholder="Contact Phone Number"
          />
          <input type="email" ref="email" placeholder="Contact Email Address" />
          <Button
            className="btn waves-effect waves-light"
            type="submit"
            onClick={this.addProperty}
          >
            <Icon right>add</Icon>Add Property
          </Button>
        </form>
        <br />
        <div className="divider" />
        <ul>
          <div className="container">
            {properties.map(property => {
              return (
                <div className="section" key={property.counter}>
                  <li>
                    <h5>{property.name}</h5>
                    <h6>{property.location}</h6>
                    <div className="">
                      Available {property.startDate} to {property.endDate}
                    </div>
                    <div className="row">
                      <div className="">
                        <button
                          className="btn waves-effect blue lighten-3 right align"
                          onClick={this.showPropertyDetails.bind(
                            null,
                            property.counter
                          )}
                        >
                          Show Details
                        </button>
                      </div>
                      <div className="">
                        <button
                          className="btn waves-effects red darken-3"
                          onClick={this.removeProperty.bind(
                            null,
                            property.counter
                          )}
                        >
                          <Icon right>delete</Icon>
                          Remove Property
                        </button>
                      </div>
                    </div>
                  </li>
                  <div className="divider" />
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  }
}

export default PropertyManager;
