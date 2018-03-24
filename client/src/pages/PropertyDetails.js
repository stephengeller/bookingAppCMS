import React, { Component } from 'react';
import PropertyItemEditor from '../components/PropertyItemEditor';

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Stephen',
      properties: []
    };
  }

  componentDidMount() {
    document.title = `${this.props.match.params.id}`;
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div className="">
        <PropertyItemEditor apiClient={this.props.apiClient} id={id} />
      </div>
    );
  }
}

export default PropertyDetails;
