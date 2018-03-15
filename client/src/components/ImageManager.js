import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';
import axios from '../modules/axios';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.getPreexistingImages = this.getPreexistingImages.bind(this);
    this.addHTMLImageToList = this.addHTMLImageToList.bind(this);
    this.setHTMLImageToList = this.setHTMLImageToList.bind(this);
    this.addToUploadArray = this.addToUploadArray.bind(this);
    this.clearImageDiv = this.clearImageDiv.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
    this.state = {
      file: null,
      filesToUpload: [],
      uploadedImages: [],
      priority: '',
      loading: false
    };
  }

  addToUploadArray(oneItemArray) {
    if (oneItemArray && oneItemArray[0]) {
      if (this.state.priority) {
        const file = oneItemArray[0];
        file.priority = Number(this.state.priority);
        const { filesToUpload } = this.state;
        filesToUpload.push(file);
        this.setState({ filesToUpload, file: null, priority: '' });
        console.log(file);
        this.displayBase64Images(file, 'add', 'toUpload');
        this.clearImageDiv('toAdd');
      } else {
        console.log('choose priority');
      }
    } else {
      console.log('choose a file');
    }
  }

  async submitPictures(files) {
    if (files.length > 0) {
      let counter = 0;
      await this.setState({ loading: true });
      files = files.map(file => {
        return {
          // priority: Math.floor(Math.random() * 10 + 1),
          priority: Number(file.priority),
          base64: file.base64
        };
      });
      // TODO: fix this await to await for axios and not forEach
      await files.forEach(file => {
        axios
          .post(this.url, file)
          .then(response => {
            console.log('Success!');
            counter++;
            if (counter >= files.length) {
              this.setState({ filesToUpload: [], loading: false });
              this.clearImageDiv('toUpload');
              this.getPreexistingImages();
            }
          })
          .catch(errorResponse => {
            console.log(errorResponse);
            counter++;
            this.setState({ loading: false });
          });
      });
    } else {
      console.log('nothing to upload');
    }
  }

  getPreexistingImages() {
    this.clearImageDiv('alreadyOnline');
    axios.get(`${this.url}s`).then(response => {
      if (
        response.data.length > 0 &&
        this.state.uploadedImages.length !== response.data.lenght
      ) {
        response.data.forEach(image =>
          this.addHTMLImageToList(
            'alreadyOnline',
            image.url,
            image.id,
            image.priority
          )
        );
      }
      this.setState({ uploadedImages: response.data });
    });
  }

  clearImageDiv(divID) {
    document.getElementById(divID).innerHTML = '';
  }

  addHTMLImageToList(list, src, id, priority = 0) {
    document.getElementById(
      list
    ).innerHTML += `<img src=${src} style="margin: 10px" title=${priority} id=${id} width="200" />`;
  }

  setHTMLImageToList(list, src, id, priority = 0) {
    document.getElementById(
      list
    ).innerHTML = `<img src=${src} style="margin: 10px" title=${priority} id=${id} width="200" />`;
  }

  getFiles(file) {
    this.displayBase64Images(file[0], 'set', 'toAdd');
    this.setState({ file });
  }

  handlePriority(e) {
    this.setState({ priority: e.target.value });
  }

  displayBase64Images(base64Object, setOrAdd = 'add', id = 'toUpload') {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        if (setOrAdd === 'add') {
          this.addHTMLImageToList(id, e.target.result, theFile.name);
        } else {
          this.setHTMLImageToList(id, e.target.result, theFile.name);
        }
      };
    })(file);
    return reader.readAsDataURL(file);
  }

  componentDidMount() {
    this.getPreexistingImages();
  }

  render() {
    const { file, filesToUpload } = this.state;
    return (
      <div className="center-align">
        <h4 style={{ margin: '30px' }}>Manage images for {this.id}</h4>
        <Row className="container">
          <FileBase64 multiple={true} onDone={file => this.getFiles(file)} />
          <Input
            s={1}
            type="number"
            label="priority"
            value={this.state.priority}
            onChange={e => this.handlePriority(e)}
          />
        </Row>
        {this.state.file ? <h5>Preview</h5> : ''}
        <div id="toAdd" style={{ margin: '20px' }} />
        <Button onClick={() => this.addToUploadArray(file)}>Add</Button>
        <h5>To Upload to CareFreeBreaks</h5>
        <div id="toUpload" style={{ margin: '20px' }} />
        {this.state.loading ? (
          <Preloader />
        ) : (
          <Button onClick={() => this.submitPictures(filesToUpload)}>
            Submit
          </Button>
        )}
        <div className="divider" style={{ margin: '20px' }} />
        <h5>Currently Online</h5>
        <div id="alreadyOnline" />
      </div>
    );
  }
}

export default ImageManager;
