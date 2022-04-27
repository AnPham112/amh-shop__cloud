import { Card, Spacer, Text } from "@nextui-org/react"
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalStateContext } from '../../GlobalState'

function OrderDetails() {
  const state = useContext(GlobalStateContext)
  const [history] = state.userAPI.history
  const [orderDetails, setOrderDetails] = useState([])
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      history.forEach(item => {
        if (item._id === params.id)
          setOrderDetails(item)
      })
    }
  }, [params.id, history])

  if (orderDetails.length === 0) return null;


  return (
    <div className="container">
      <div className="order-details">
        <Card>
          <div className="grid wide">
            <div className="row">
              <div className="col l-3 m-3 c-4">
                <Text css={{ fontWeight: "600" }}>Name</Text>
                <Spacer y={0.5} />
                <Text css={{ fontWeight: "600" }}>Address</Text>
                <Spacer y={0.5} />
                <Text css={{ fontWeight: "600" }}>Postal Code</Text>
                <Spacer y={0.5} />
                <Text css={{ fontWeight: "600" }}>Country Code</Text>
              </div>
              <div className="col l-9 m-9 c-8">
                <Text>{orderDetails.address.recipient_name}</Text>
                <Spacer y={0.5} />
                <Text>{orderDetails.address.line1 + " - " + orderDetails.address.city}</Text>
                <Spacer y={0.5} />
                <Text>{orderDetails.address.postal_code}</Text>
                <Spacer y={0.5} />
                <Text>{orderDetails.address.country_code}</Text>
              </div>
            </div>
          </div>
        </Card>

        <table className="order-details__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              orderDetails.cart.map((item, index) => (
                <tr key={index} >
                  <td className="order-details__table__info__box">
                    <div className="order-details__table__info">
                      <img className="order-details__table__info__img" src={item.productImages[0]?.url} alt={item.productImages[0]?.url} />
                      <span className="order-details__table__info__title">{item.title}</span>
                    </div>
                  </td>
                  <td><span className="order-details__table__quantity">{item.quantity}</span></td>
                  <td><span className="order-details__table__price">${item.price * item.quantity}</span></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default OrderDetails