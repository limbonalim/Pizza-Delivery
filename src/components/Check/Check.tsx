import {Button, Modal} from 'react-bootstrap';
import {useState} from 'react';


const Check = () => {

  /// ИСПАВИТЬ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  //////////////////////////////////////////////////////////
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Order:</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Check;