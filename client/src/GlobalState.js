import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
// import ProductAPI from './api/ProductAPI'
import UserAPI from './api/UserAPI'

const GlobalStateContext = createContext()

function GlobalStateProvider({ children }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accesstoken)
        setTimeout(() => {
          refreshToken()
        }, 10 * 60 * 1000)
      }
      refreshToken()
    }
  }, [])


  const state = {
    token: [token],
    userAPI: UserAPI(token),
  }

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export { GlobalStateContext, GlobalStateProvider }