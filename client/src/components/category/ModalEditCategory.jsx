import { Button, Input, Modal, Row, Text } from "@nextui-org/react"
import React from 'react'

function ModalEditCategory({
  open,
  onClose,
  title,
  category,
  setCategory,
  onEditCategory,
  cate }) {
  return (
    <Modal
      open={open}
      closeButton
      aria-labelledby="modal-title"
      onClose={onClose}
    >
      <Modal.Header>
        <Text h5 color="warning" css={{ fontWeight: "600", letterSpacing: "0.6px" }}>{title}</Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          rounded
          bordered
          label="Category name"
          placeholder="Enter new category name..."
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          css={{ w: "100%" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Row align="center" justify="space-between">
          <Button auto css={{ bgColor: "$gray400" }}
            onClick={onClose}
          >
            Close</Button>
          <Button auto color="warning"
            onClick={() => onEditCategory({ ...cate, name: category })}
          >Edit</Button>
        </Row>

      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditCategory