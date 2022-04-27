import { Button, Modal, Row, Text } from "@nextui-org/react"
import React from 'react'

function ModalDeleteCategory({ open, onClose, title, onDeleteCategory, delId }) {
  return (
    <Modal
      open={open}
      closeButton
      aria-labelledby="modal-title"
      onClose={onClose}
    >
      <Modal.Header>
        <Text h5 color="error" css={{ fontWeight: "600", letterSpacing: "0.6px" }}>{title}</Text>
      </Modal.Header>
      <Modal.Footer>
        <Row align="center" justify="space-between">
          <Button auto onClick={onClose}
            css={{ bgColor: "$gray400" }}
          >Close</Button>
          <Button auto color="error" onClick={() => onDeleteCategory(delId)}
          >Yes</Button>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDeleteCategory