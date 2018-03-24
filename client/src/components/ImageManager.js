import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';

import ErrorHandler from '../modules/ErrorHandler';
import ImageManagerHelper from './helpers/ImageManagerHelper';

class ImageManager extends Component {
  constructor(props) {
    super(props);
    this.getFiles = this.getFiles.bind(this);
    this.submitPictures = this.submitPictures.bind(this);
    this.resetAfterCompleteSubmission = this.resetAfterCompleteSubmission.bind(
      this
    );
    this.fetchImagesFromAPI = this.fetchImagesFromAPI.bind(this);
    this.addToUploadArray = this.addToUploadArray.bind(this);
    this.handlePriority = this.handlePriority.bind(this);
    this.handleEncodedImage = this.handleEncodedImage.bind(this);
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

  createImageObjWithPriority(image, priority) {
    image.priority = Number(priority);
    return image;
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
      const { priority, filesToUpload } = this.state;
      if (priority) {
        filesToUpload.push(this.createImageObjWithPriority(image, priority));
        this.imageManagerHelper.displayBase64Images(
          image,
          'add',
          image.name,
          this.handleEncodedImage
        );
        this.resetState(filesToUpload);
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
        const error = this.errorHandler.createErrorMessage(
          'successful delete of image id: ' + id,
          true
        );
        this.setState({ error });
      })
      .catch(err => {
        console.log(err);
        const error = this.errorHandler.createErrorMessage(
          'could not delete image id: ' + id,
          true
        );
        this.setState({ error });
      });
  }

  submitPictures(files) {
    if (files.length > 0) {
      let counter = 0;
      this.setState({ loading: true });

      files = this.imageManagerHelper.formatImages(files);

      for (let file of files) {
        console.log('posting:', `Counter: ${counter}`, file);
        this.props.apiClient
          .post(this.url, file)
          .then(response => {
            counter++;
            console.log('Successful submit!', file, response);
            this.addToAlreadyOnline(response.data);

            if (counter >= files.length) {
              this.resetAfterCompleteSubmission();
            }
          })
          .catch(errorResponse => {
            counter++;
            const error = this.errorHandler.createErrorMessage(
              'Problem submitting image' + errorResponse,
              false
            );
            this.setState({ loading: false, error });
          });
      }
    } else {
      const error = this.errorHandler.createErrorMessage(
        'Nothing to upload',
        false
      );
      this.setState({ error });
    }
  }

  addToAlreadyOnline(image) {
    const { alreadyOnline } = this.state;
    alreadyOnline.push(
      this.imageManagerHelper.createImage(image.url, image.id, image.priority)
    );
    this.setState({ alreadyOnline });
  }

  resetAfterCompleteSubmission() {
    console.log('All files have been submitted');
    this.setState({
      filesToUpload: [],
      toUploadThumbnails: [],
      loading: false
    });
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
    this.imageManagerHelper.displayBase64Images(
      file[0],
      'set',
      file[0].name,
      this.handleEncodedImage
    );
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

  handleEncodedImage(base64, setOrAdd, id) {
    if (setOrAdd === 'add') {
      this.addThumbnailToToUpload(base64, id);
    } else {
      this.showPreviewThumbnail(base64, id);
    }
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
            s={3}
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
