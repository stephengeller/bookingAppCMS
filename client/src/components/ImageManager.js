import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input } from 'react-materialize';
import axios from '../modules/axios';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
    this.state = { files: [] };
  }

  submitPictures() {
    let { files } = this.state;
    files = files.map(file => {
      return {
        priority: Math.floor(Math.random() * 10 + 1),
        base64: file.base64
      };
    });
    console.log(files);
    files.forEach(file => {
      axios
        .post(this.url, file)
        .then(response => {
          console.log('Success!');
          console.log(response);
        })
        .catch(errorResponse => {
          console.log(errorResponse);
        });
    });
  }

  getFiles(file) {
    this.displayImages(file[0]);
    const { files } = this.state;
    files.push(file[0]);
    this.setState({ files });
    console.log(this.state);
  }

  handleChange(e) {
    this.setState({ priority: e.target.value });
  }

  displayImages(base64Object) {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        document.getElementById('list').innerHTML += [
          '<img src="',
          e.target.result,
          '" title="',
          theFile.name,
          '" width="100" />'
        ].join('');
      };
    })(file);
    return reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="container center-align">
        <h2>ImageManager</h2>
        <div id="list" />
        <Row>
          <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
          <Input
            s={1}
            type="number"
            label="priority"
            onChange={e => this.handleChange(e)}
          />
        </Row>
        <Button onClick={() => this.submitPictures()}>Submit</Button>
      </div>
    );
  }
}

export default ImageManager;
