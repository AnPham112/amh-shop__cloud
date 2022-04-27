import React, { useContext, useEffect } from 'react'
import { GlobalStateContext } from '../../GlobalState'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { Text } from "@nextui-org/react"

function OrderHistory() {
  const state = useContext(GlobalStateContext)
  const [history, setHistory] = state.userAPI.history
  const isAdmin = state.userAPI.isAdmin
  const [token] = state.token

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment ', {
            headers: { Authorization: token }
          })
          setHistory(res.data)
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token }
          })
          setHistory(res.data)
        }
      }
      getHistory()
    }
  }, [token, isAdmin, setHistory])

  return (
    <div className="container full-screen">
      <div className="order-history">
        {isAdmin
          ? (
            <div className="order-history__heading">
              <Text h2 color="white">History</Text>
            </div>
          )
          : (
            <div className="order-history__heading">
              <Text h2 color="white">History</Text>
              <Text h4 color="white">You have {history.length} ordered</Text>
            </div>
          )
        }

        <table className="order-history__table">
          <thead>
            <tr>
              <th>PaymentID</th>
              <th>Date of Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              history.map(item => (
                <tr key={item._id}>
                  <td>{item.paymentID}</td>
                  <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                  <td>
                    <Link to={`/history/${item._id}`}>
                      <i className="fa-solid fa-eye order-history__table__view__icon"></i>
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory