import React, { Component } from 'react';
import PropertyManager from '../components/PropertyManager'

class Properties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: 'Stephen'
        }
    }

    render() {
        return (
            <div>
                <h2>Properties</h2>
                < PropertyManager />
            </div>
        );
    }
}

export default Properties
