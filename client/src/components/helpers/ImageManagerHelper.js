import React from 'react';
import FileBase64 from 'react-file-base64';
import { Row, Button, Input, Preloader } from 'react-materialize';
import { Alert } from 'react-bootstrap';

class ImageManagerHelper {
  constructor(clickOnImageThumbnailFunction) {
    this.createImage = this.createImage.bind(this);
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
}

export default ImageManagerHelper;
