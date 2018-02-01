import React, { Component } from 'react';
import axios from 'axios'

class PropertiesApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 'Stephen',
            properties: [1,2,3]
        };
    }

    addProperty() {
        let random = new Date().getMilliseconds();
        let obj = {
            "id": random.toString(),
            "description":"The Balmoral (originally built as the North British Station Hotel) is a luxury five-star property and landmark in Edinburgh, Scotland. It is located in the heart of the city at the east end of Princes Street, the main shopping street beneath the Edinburgh Castle rock, and the southern edge of the New Town.",
            "ownerId":"testOwner1",
            "title":"The Balmoral Hotel test",
            "facilities":[
                "Pool",
                "Room Service",
                "Restaurant",
                "Free Internet",
                "Spa",
                "Bar/Lounge"],
            "location":{
                "lat":55.9532,
                "lon":3.1896
            }
        };
        axios
            .post("http://localhost:3000/properties/", obj)
            .then((response) => {
            })
            .catch(function(error) {
                console.log('Adding error: ', error);
            })

    }

    getProperties() {
        this.addProperty();
        let resp;
        axios
            .get("http://localhost:3000/properties/search")
            .then((response) => {
                resp = response.data;
                this.setState({ properties: resp });
                console.log(resp);
                console.log('successful api call')
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getProperties()
    }

    render() {
        let properties = this.state.properties;
        return (
            <div className='container'>
                <h2 className="center-align">PropertiesApi</h2>
                {properties.map(function(property) {
                    return (
                        <section className='' id={property.id}>
                            <h5>{property.title}</h5>
                            <h6>{property.description}</h6>
                            <div>{property.ownerId}</div>
                            <div>{property.facilities}</div>
                            <br/>
                        </section>
                )
                    })
                }
                <button onClick={this.getProperties.bind(this)}>Push me!</button>
            </div>
        );
    }
}

export default PropertiesApi;
