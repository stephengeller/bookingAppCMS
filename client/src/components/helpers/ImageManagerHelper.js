import React from 'react';
import FileBase64 from 'react-file-base64';
import { Alert } from 'react-bootstrap';

class ImageManagerHelper {
  constructor(clickOnImageThumbnailFunction) {
    this.createImage = this.createImage.bind(this);
    this.displayBase64Images = this.displayBase64Images.bind(this);
    this.clickOnImageThumbnail = clickOnImageThumbnailFunction;
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
        onClick={e => this.clickOnImageThumbnail(e)}
      />
    );
  }

  formatImages(files) {
    return files.map(file => {
      return {
        priority: Number(file.priority),
        base64: file.base64
      };
    });
  }

  displayBase64Images(base64Object, setOrAdd = 'add', id, handleEncodedImage) {
    const { file } = base64Object;
    const reader = new FileReader();
    reader.onload = (theFile => {
      return e => {
        handleEncodedImage(e.target.result, setOrAdd, id);
      };
    })(file);
    return reader.readAsDataURL(file);
  }
}

export default ImageManagerHelper;
