import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input } from 'react-materialize';
import axios from '../modules/axios';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.getPreexistingImages = this.getPreexistingImages.bind(this);
    this.addHTMLImageToList = this.addHTMLImageToList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
    this.state = { files: [] };
  }

  submitPictures() {
    let { files } = this.state;
    files = files.map(file => {
      return {
        // priority: Math.floor(Math.random() * 10 + 1),
        priority: 1,
        base64: file.base64
      };
    });
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

  getPreexistingImages() {
    axios.get(`${this.url}s`).then(response => {
      if (response.data.length > 0) {
        console.log(response.data);
        response.data.forEach(image =>
          this.addHTMLImageToList(image.url, image.id)
        );
      }
      this.setState({ uploadedImages: response.data });
    });
  }

  addHTMLImageToList(src, id) {
    document.getElementById(
      'list'
    ).innerHTML += `<img src=${src} title=${id} id=${id} width="200" />`;
  }

  getFiles(file) {
    this.displayImages(file[0]);
    const { files } = this.state;
    files.push(file[0]);
    this.setState({ files });
  }

  handleChange(e) {
    this.setState({ priority: e.target.value });
  }

  displayImages(base64Object) {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        this.addHTMLImageToList(e.target.result, theFile.name);
      };
    })(file);
    return reader.readAsDataURL(file);
  }

  componentWillMount() {
    this.getPreexistingImages();
  }

  render() {
    return (
      <div className="center-align">
        <h2>ImageManager</h2>
        <Row className="container">
          <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} />
          <Input
            s={1}
            type="number"
            label="priority"
            onChange={e => this.handleChange(e)}
          />
        </Row>
        <Button onClick={() => this.submitPictures()}>Submit</Button>
        <div id="list" />
      </div>
    );
  }
}

export default ImageManager;
