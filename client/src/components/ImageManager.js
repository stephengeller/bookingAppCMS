import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input } from 'react-materialize';
import axios from '../modules/axios';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.readFile = this.readFile.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.submitPicture = this.submitPicture.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
  }

  readFile() {
    console.log(this.props.match.params.id);
  }

  submitPicture() {
    const { files } = this.state;
    const json = {
      priority: this.state.priority,
      base64: files[0].base64
    };
    const array = [json, json];
    console.log(json, this.url);
    axios
      .post(this.url, json)
      .then(response => {
        console.log('Success!');
        console.log(response);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

  getFiles(files) {
    this.setState({ files });
    console.log(this.state);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ priority: e.target.value });
  }

  render() {
    return (
      <div className="container center-align">
        <h2>ImageManager</h2>
        <Row>
          <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
          <Input
            s={6}
            type="number"
            placeholder="priority"
            onChange={e => this.handleChange(e)}
          />
        </Row>
        <Button onClick={() => this.submitPicture()}>Submit</Button>
      </div>
    );
  }
}

export default ImageManager;
