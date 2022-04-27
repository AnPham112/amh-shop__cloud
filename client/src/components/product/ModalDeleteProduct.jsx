import React from 'react'
import { Modal, Row, Text, Button } from '@nextui-org/react'

function NewModal({ open, onClose, title, onDeleteProduct, product }) {
  return (
    <Modal
      open={open}
      closeButton
      aria-labelledby="modal-title"
      onClose={onClose}
    >
      <Modal.Header>
        <Text css={{ fontWeight: "500", color: "#ff0000" }}>{title}</Text>
      </Modal.Header>
      <Modal.Footer>
        <Row justify='space-between' align='center'>
          <Button auto onClick={onClose} css={{ bgColor: "$gray300" }}>Close</Button>
          <Button auto css={{ bgColor: "#ff0000" }} onClick={() => onDeleteProduct(product)}>Yes</Button>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}

export default NewModal