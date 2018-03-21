import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';
import { Alert } from 'react-bootstrap';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.getPreexistingImages = this.getPreexistingImages.bind(this);
    this.setHTMLImageToList = this.setHTMLImageToList.bind(this);
    this.addToUploadArray = this.addToUploadArray.bind(this);
    this.clearImageDiv = this.clearImageDiv.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.renderError = this.renderError.bind(this);
    this.goToImage = this.goToImage.bind(this);
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
    this.state = {
      file: null,
      filesToUpload: [],
      toUploadThumbnails: [],
      uploadedImages: [],
      priority: '',
      loading: false,
      errorMsg: null
    };
  }

  addToUploadArray(oneItemArray) {
    if (oneItemArray && oneItemArray[0]) {
      if (this.state.priority) {
        this.setState({ errorMsg: null });
        const file = oneItemArray[0];
        file.priority = Number(this.state.priority);
        const { filesToUpload } = this.state;
        filesToUpload.push(file);
        this.setState({
          filesToUpload,
          file: null,
          priority: '',
          preview: null
        });
        this.displayBase64Images(file, 'add', 'toUpload');
      } else {
        this.setState({
          errorMsg: 'Choose priority'
        });
      }
    } else {
      this.setState({
        errorMsg: 'Choose a file'
      });
    }
  }

  goToImage(e) {
    console.log('clicked on:', e.target);
  }

  async submitPictures(files) {
    if (files.length > 0) {
      let counter = 0;
      await this.setState({ loading: true });
      files = files.map(file => {
        return {
          priority: Number(file.priority),
          base64: file.base64
        };
      });
      // TODO: fix this await to await for axios and not forEach
      await files.forEach(file => {
        this.props.apiClient
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

  async getPreexistingImages() {
    this.clearImageDiv('alreadyOnline');
    await this.props.apiClient.get(`${this.url}s`).then(response => {
      if (
        response.data.length > 0 &&
        this.state.uploadedImages.length !== response.data.lenght
      ) {
        this.setState({
          alreadyOnline: response.data.map(image =>
            this.setHTMLImageToList(
              'alreadyOnline',
              image.url,
              image.id,
              image.priority
            )
          )
        });
      }
      this.setState({ uploadedImages: response.data });
    });
  }

  clearImageDiv(divID) {
    document.getElementById(divID).innerHTML = '';
    this.setState({});
  }

  setHTMLImageToList(list, src, id, priority = 0) {
    return (
      <img
        key={id}
        alt={src}
        src={src}
        style={{ margin: '10px', cursor: 'pointer' }}
        title={priority}
        id={id}
        width="200"
        onClick={e => this.goToImage(e)}
      />
    );
  }

  getFiles(file) {
    this.displayBase64Images(file[0], 'set', 'preview');
    this.setState({ file });
  }

  handlePriority(e) {
    this.setState({ priority: e.target.value });
  }

  displayBase64Images(base64Object, setOrAdd = 'add', id) {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        if (setOrAdd === 'add') {
          const { toUploadThumbnails } = this.state;
          console.log(this.state);
          toUploadThumbnails.push(
            this.setHTMLImageToList(id, e.target.result, theFile.name)
          );
          this.setState({
            toUploadThumbnails
          });
        } else {
          const preview = this.setHTMLImageToList(
            id,
            e.target.result,
            theFile.name
          );
          this.setState({ preview });
        }
      };
    })(file);
    return reader.readAsDataURL(file);
  }

  componentDidMount() {
    this.getPreexistingImages();
  }

  renderError() {
    if (this.state.errorMsg === null) {
      return;
    }
    return (
      <Alert bsStyle="danger">
        <p>{this.state.errorMsg}</p>
      </Alert>
    );
  }

  render() {
    const {
      file,
      toUploadThumbnails,
      filesToUpload,
      preview,
      toUpload,
      alreadyOnline
    } = this.state;
    return (
      <div className="center-align">
        <h4 style={{ margin: '30px' }}>Manage images for {this.id}</h4>
        <Row className="container">
          {this.renderError()}
          <FileBase64 multiple={true} onDone={file => this.getFiles(file)} />
          <Input
            s={1}
            type="number"
            limit={0}
            label="priority"
            value={this.state.priority}
            onChange={e => this.handlePriority(e)}
          />
        </Row>
        {this.state.file ? <h5>Preview</h5> : ''}
        <div id="preview" style={{ margin: '20px' }}>
          {preview}
        </div>
        <Button onClick={() => this.addToUploadArray(file)}>Add</Button>
        <h5>To Upload to CareFreeBreaks</h5>
        <div id="toUpload" style={{ margin: '20px' }}>
          {toUploadThumbnails}
        </div>
        {this.state.loading ? (
          <Preloader />
        ) : (
          <Button onClick={() => this.submitPictures(filesToUpload)}>
            Submit
          </Button>
        )}
        <div className="divider" style={{ margin: '20px' }} />
        <h5>Currently Online</h5>
        <div id="alreadyOnline">{alreadyOnline}</div>
      </div>
    );
  }
}

export default ImageManager;
