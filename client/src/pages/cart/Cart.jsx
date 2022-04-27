import React, { useContext, useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import { GlobalStateContext } from '../../GlobalState'
import { Text } from '@nextui-org/react';
import axios from 'axios';
import PaypalButton from './Paypal';
import { toast } from 'react-toastify';

function Cart() {
  const state = useContext(GlobalStateContext);
  const [cart, setCart] = state.userAPI.cart
  const token = state.token;
  const [total, setTotal] = useState(0)

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', { cart }, {
      headers: { Authorization: token }
    })
  }

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [cart])

  const increment = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })
    setCart([...cart])
    addToCart(cart)
  }

  const handleRemoveProduct = (id) => {
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1)
      }
    })
    setCart([...cart])
    addToCart()
  }

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment

    await axios.post('/api/payment', { cart, paymentID, address }, {
      headers: { Authorization: token }
    })

    setCart([])
    addToCart([])
    toast.success("You have placed an order successfully!")
  }

  if (cart.length === 0)
    return (
      <div className="container center">
        <Text h3 color="white">Cart empty</Text>
      </div>
    )

  return (
    <Helmet title="Cart">
      <div className="container">
        <div className="cart">
          <table className="cart__table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th className="cart__table__heading__qty">Quantity</th>
                <th></th>
              </tr>
            </thead>
            {
              cart.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="cart__table__item__info__box">
                      <div className="cart__table__item__info">
                        {
                          item.productImages?.length &&
                          <div className="cart__table__item__info__image__container">
                            <img src={item.productImages[0].url} alt={item.productImages[0].url} />
                          </div>
                        }
                        <span className="cart__table__item__info__title">{item.title}</span>
                      </div>
                    </td>
                    <td className="cart__table__item__info__description__box"
                    ><span className="cart__table__item__info__description">{item.description}</span></td>
                    <td className="cart__table__item__info__price__box"
                    ><span className="cart__table__item__info__price">${item.price * item.quantity}</span></td>
                    <td className="cart__table__item__info__quantity__control__box"
                    >
                      <div className="cart__table__item__quantity__control">
                        <button onClick={() => decrement(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item._id)}>+</button>
                      </div>
                    </td>
                    <td>
                      <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => handleRemoveProduct(item._id)}>
                        <i className="fa-solid fa-trash-can cart__table__item__icon"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            }
            <tfoot className="cart__total">
              <tr>
                <td colSpan="4">Total:</td>
                <td className="cart__total__price">${total}</td>
              </tr>
            </tfoot>
          </table>
          <div className="cart__payment">
            <PaypalButton
              total={total}
              tranSuccess={tranSuccess}
            />
          </div>
        </div>
      </div>
    </Helmet >
  )
}

export default Cart