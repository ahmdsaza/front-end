import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function CallModal() {
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>If yes click on delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleDeleteClose(item.id)} variant="primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
