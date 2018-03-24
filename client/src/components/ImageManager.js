import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';
import { Alert } from 'react-bootstrap';

import ErrorHandler from '../modules/ErrorHandler';
import ImageManagerHelper from './helpers/ImageManagerHelper';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.clearStateAndFetch = this.clearStateAndFetch.bind(this);
    this.fetchImagesFromAPI = this.fetchImagesFromAPI.bind(this);
    this.addToUploadArray = this.addToUploadArray.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.showPreviewThumbnail = this.showPreviewThumbnail.bind(this);
    this.removeImageFromFetchedImages = this.removeImageFromFetchedImages.bind(
      this
    );
    this.clickOnImageThumbnail = this.clickOnImageThumbnail.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.errorHandler = new ErrorHandler();
    this.imageManagerHelper = new ImageManagerHelper(
      this.clickOnImageThumbnail
    );
    this.id = this.props.match.params.id;
    this.url = `/properties/${this.id}/image`;
    this.state = {
      file: null,
      filesToUpload: [],
      toUploadThumbnails: [],
      uploadedImages: [],
      priority: '',
      loading: false,
      error: null
    };
  }

  addImageObjectToArray(image, array, priority) {
    image.priority = Number(priority);
    array.push(image);
    return array;
  }

  resetState(filesToUpload) {
    this.setState({
      filesToUpload,
      file: null,
      preview: null,
      error: null,
      priority: ''
    });
  }

  addToUploadArray(oneItemArray) {
    if (oneItemArray && oneItemArray[0]) {
      const image = oneItemArray[0];
      let { priority, filesToUpload } = this.state;
      if (priority) {
        filesToUpload = this.addImageObjectToArray(
          image,
          filesToUpload,
          priority
        );
        this.resetState(filesToUpload);
        this.displayBase64Images(image, 'add', image.name);
      } else {
        this.setState({
          error: this.errorHandler.createErrorMessage(
            'Choose a priority',
            false
          )
        });
      }
    } else {
      this.setState({
        error: this.errorHandler.createErrorMessage('Choose a file', false)
      });
    }
  }

  clickOnImageThumbnail(e) {
    if (window.confirm('Delete the image?')) {
      this.deleteImage(e.target.id);
    }
  }

  removeImageFromFetchedImages(id) {
    console.log(`deleting ${id} from alreadyOnline`);
    const { alreadyOnline } = this.state;
    const index = alreadyOnline.findIndex(e => e.props.id === id);
    alreadyOnline.splice(index, 1);
    this.setState({ alreadyOnline });
  }

  deleteImage(id) {
    const url = `${this.url}/${id}`;
    this.props.apiClient
      .delete(url)
      .then(r => {
        this.removeImageFromFetchedImages(id);
        console.log('successful delete:', r);
      })
      .catch(err => console.log(err));
  }

  submitPictures(files) {
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
      for (let file of files) {
        console.log('posting:', `Counter: ${counter}`, file);
        this.props.apiClient
          .post(this.url, file)
          .then(response => {
            counter++;
            console.log('Successful submit!', file, response);
            if (counter >= files.length) {
              console.log('Done!');
              this.clearStateAndFetch();
            }
          })
          .catch(errorResponse => {
            console.log(errorResponse);
            counter++;
            this.setState({ loading: false });
          });
      }
    } else {
      console.log('nothing to upload');
    }
  }

  clearStateAndFetch() {
    this.setState({
      filesToUpload: [],
      toUploadThumbnails: [],
      loading: false
    });
    this.fetchImagesFromAPI();
  }

  async fetchImagesFromAPI() {
    console.log('fetching images from api');
    await this.props.apiClient.get(`${this.url}s`).then(response => {
      if (
        response.data.length > 0 &&
        this.state.uploadedImages.length !== response.data.length
      ) {
        console.log('fetched:', response.data);
        this.setState({
          alreadyOnline: response.data.map(image =>
            this.imageManagerHelper.createImage(
              image.url,
              image.id,
              image.priority
            )
          )
        });
      } else {
        console.log(
          'fetch unsuccessful:',
          response.data,
          this.state.uploadedImages
        );
      }
      this.setState({ uploadedImages: response.data });
    });
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
    toUploadThumbnails.push(this.imageManagerHelper.createImage(src, id));
    this.setState({
      toUploadThumbnails
    });
  }

  showPreviewThumbnail(src, id) {
    const preview = this.imageManagerHelper.createImage(src, id);
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
    document.title = `Images: ${this.id}`;
    this.fetchImagesFromAPI();
  }

  render() {
    const {
      file,
      toUploadThumbnails,
      filesToUpload,
      preview,
      alreadyOnline,
      error
    } = this.state;

    return (
      <div className="center-align">
        <h4 style={{ margin: '30px' }}>Manage images for {this.id}</h4>
        <Row className="container">
          {this.errorHandler.renderAlert(error)}
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
