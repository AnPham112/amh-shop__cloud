import axios from 'axios';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([])
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token }
          })
          setIsLogged(true)

          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
          setCart(res.data.cart)
          setUserInfo(res.data)

        } catch (error) {
          return toast.error(error.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])



  const addCart = async (product) => {
    if (!isLogged) return toast.warning("Please login to continue")

    const check = cart.every((item) => {
      return item._id !== product._id
    })

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }])
      await axios.patch('/user/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
        headers: { Authorization: token }
      })
    } else {
      toast.warning("This product has been added to cart")
    }
  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: isAdmin,
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    userInfo: [userInfo, setUserInfo]
  }
}

export default UserAPI