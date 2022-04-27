import React from 'react'
import { Card, Row, Avatar, Text } from '@nextui-org/react'

function PolicyCard({ icon, name, description }) {
  return (
    <Card css={{ mb: '0.8rem' }}>
      <Card.Header>
        <Row justify='center'>
          <Avatar
            squared
            icon={<i className={icon}></i>}
            css={{ zIndex: 1 }}
          />
        </Row>
      </Card.Header>
      <Card.Body>
        <Row justify='center'>
          <Text h4>{name}</Text>
        </Row>
        <Row justify='center'>
          <Text className="policy-card__info__description">{description}</Text>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PolicyCard