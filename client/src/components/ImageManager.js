import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';
import { Alert } from 'react-bootstrap';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.fetchImagesFromAPI = this.fetchImagesFromAPI.bind(this);
    this.createImage = this.createImage.bind(this);
    this.addToUploadArray = this.addToUploadArray.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.showPreviewThumbnail = this.showPreviewThumbnail.bind(this);
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
      const { priority, filesToUpload } = this.state;
      if (priority) {
        const fileToAddToArray = oneItemArray[0];
        fileToAddToArray.priority = Number(priority);
        filesToUpload.push(fileToAddToArray);
        this.setState({
          filesToUpload,
          file: null,
          priority: '',
          preview: null,
          errorMsg: null
        });
        this.displayBase64Images(
          fileToAddToArray,
          'add',
          fileToAddToArray.name
        );
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

  submitPictures(files) {
    console.log('files', files, files.length);
    if (files.length > 0) {
      let counter = 0;
      this.setState({ loading: true });
      files = files.map(file => {
        return {
          priority: Number(file.priority),
          base64: file.base64
        };
      });
      // TODO: fix this await to await for axios and not forEach
      files.forEach(file => {
        console.log('posting:', `Counter: ${counter}`, file);
        this.props.apiClient
          .post(this.url, file)
          .then(response => {
            counter++;
            console.log('Success!', 'counter:', counter, file, response);
            if (counter >= files.length) {
              console.log('Done!');
              this.setState({
                filesToUpload: [],
                toUploadThumbnails: [],
                loading: false
              });
              this.fetchImagesFromAPI();
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

  async fetchImagesFromAPI() {
    console.log('fetching images from api');
    await this.props.apiClient.get(`${this.url}s`).then(response => {
      if (
        response.data.length > 0 &&
        this.state.uploadedImages.length !== response.data.length
      ) {
        this.setState({
          alreadyOnline: response.data.map(image =>
            this.createImage(image.url, image.id, image.priority)
          )
        });
      }
      this.setState({ uploadedImages: response.data });
    });
  }

  createImage(src, id, priority = 0) {
    return (
      <img
        key={id}
        alt={src}
        src={src}
        style={{ margin: '10px', cursor: 'pointer' }}
        id={id}
        width="200"
        onClick={e => this.goToImage(e)}
      />
    );
  }

  getFiles(file) {
    this.displayBase64Images(file[0], 'set', file[0].name);
    this.setState({ file });
  }

  handlePriority(e) {
    this.setState({ priority: e.target.value });
  }

  addThumbnailToToUpload(src, id) {
    const { toUploadThumbnails } = this.state;
    toUploadThumbnails.push(this.createImage(src, id));
    this.setState({
      toUploadThumbnails
    });
  }

  showPreviewThumbnail(src, id) {
    const preview = this.createImage(src, id);
    this.setState({ preview });
  }

  displayBase64Images(base64Object, setOrAdd = 'add', id) {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        if (setOrAdd === 'add') {
          this.addThumbnailToToUpload(e.target.result, id);
        } else {
          this.showPreviewThumbnail(e.target.result, id);
        }
      };
    })(file);
    return reader.readAsDataURL(file);
  }

  componentDidMount() {
    this.fetchImagesFromAPI();
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
