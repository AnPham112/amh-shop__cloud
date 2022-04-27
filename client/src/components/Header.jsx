import { Button } from "@nextui-org/react"
import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from '../assets/icons/logo.svg'
import { GlobalStateContext } from '../GlobalState'
import { logout } from '../redux/actions/authActions'
import '../sass/index.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

function Header() {
  const state = useContext(GlobalStateContext)
  const [isLogged] = state.userAPI.isLogged
  const isAdmin = state.userAPI.isAdmin
  const [cart] = state.userAPI.cart
  const [userInfo] = state.userAPI.userInfo
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className="header">
      <div className="header__wrapper">

        <div className="header__logo">
          <Link to='/'>
            {isAdmin
              ? (
                <div className="header__logo--admin">
                  <img className="header__logo-img" src={Logo} alt="" />
                  <h2>Admin</h2>
                </div>
              )
              : <img className="header__logo-img" src={Logo} alt="" />
            }
          </Link>
        </div>
        <div className="header__menu__icon" onClick={handleToggle}>
          <i className={toggle ? "fa-solid fa-angle-left header__menu__icon__angle__left" : "fa-solid fa-bars header__menu__icon__bars"}></i>
        </div>
        <ul className={toggle ? "header__menu active" : "header__menu"}>
          <li className="header__menu__item" onClick={handleToggle}>
            <Link to="/shop" className="header__menu__item__link">{isAdmin ? "Products" : "Shop"}</Link>
          </li>
          {isAdmin ? (
            <>
              <li className="header__menu__item" onClick={handleToggle}>
                <Link to="/create_product" className="header__menu__item__link">Create product</Link>
              </li>
              <li className="header__menu__item" onClick={handleToggle}>
                <Link to="/category" className="header__menu__item__link">Categories</Link>
              </li>
            </>
          )
            : null
          }

          {isLogged ? (
            <>
              <li className="header__menu__item" onClick={handleToggle} >
                <Link to="/history" className="header__menu__item__link">History</Link>
              </li>

              {
                !isAdmin ? (
                  <li className="header__menu__item">
                    <i className="fa-solid fa-user header__menu__item__user__icon"></i>
                    <span className="header__menu__item__user__name">{userInfo.name}</span>
                  </li>
                ) : null
              }


              <li className="header__menu__item" onClick={handleToggle}>
                <Button
                  auto
                  css={{
                    color: "$black",
                    bgColor: "#efdf9a",
                    borderRadius: "0.3rem",
                    fontSize: '1rem'
                  }}
                  onClick={handleLogout}
                  className="header__menu__item__link__logout"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="header__menu__item" onClick={handleToggle}>
                <Link to="/login" className="header__menu__item__link__login">Login</Link>
              </li>
              <li className="header__menu__item" onClick={handleToggle}>
                <Link to="/register" className="header__menu__item__link__register">Register</Link>
              </li>
            </>
          )}
        </ul>

        {isAdmin ? null : (
          <div className="header__menu__cart">
            <span>{cart.length}</span>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping header__menu__cart__icon"></i>
            </Link>
          </div>
        )}

      </div>
    </div>
    // </div>
  )
}

export default Header