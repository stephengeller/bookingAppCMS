import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-materialize';

const ModalNotice = ({ notice, setState }) => {
    return (
        <Modal
        show={notice.show}
        style={notice.style}
        id="notice"
        className="center"
    >
        <Modal.Header>
            <Modal.Title>{'Notice'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notice.message}</Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {
                setState({notice: {show: false}})
            }
            }>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ModalNotice;
