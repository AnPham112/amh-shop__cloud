import { Button, Input, Modal, Text } from "@nextui-org/react"
import React from 'react'

function ModalAddCategory({ open, onClose, title, category, setCategory, onCreateCategory }) {
  return (
    <Modal
      open={open}
      closeButton
      aria-labelledby="modal-title"
      onClose={onClose}
    >
      <Modal.Header>
        <Text h5 color="success" css={{ fontWeight: "600", letterSpacing: "0.6px" }}>{title}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          rounded
          bordered
          label="Category name"
          placeholder="Enter new category..."
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="success"
          css={{ w: "100%" }}
          onClick={() => onCreateCategory(category)}
        >Create</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddCategory