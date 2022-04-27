
import { Card, Text } from "@nextui-org/react"
import NotFoundImg from "../../assets/images/not-found-icon.jpg"
import React from 'react'

function NotFound() {
  return (
    <div className="container center">
      <Card css={{ mw: "500px" }}>
        <img src={NotFoundImg} alt="not-found-img" />
        <Text h3 css={{ ta: "center" }}>404 | Not Found</Text>
      </Card>
    </div>
  )
}

export default NotFound