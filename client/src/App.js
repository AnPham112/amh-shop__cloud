import React, { useContext } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Shop from './pages/Shop/Shop'
import Cart from './pages/cart/Cart'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { GlobalStateContext } from './GlobalState'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import OrderDetails from './pages/OrderHistory/OrderDetails'
import Categories from './pages/Categories/Categories'
import CreateProduct from './pages/createProduct/CreateProduct'



function App() {
  const state = useContext(GlobalStateContext);
  const [isLogged] = state.userAPI.isLogged
  const isAdmin = state.userAPI.isAdmin

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="detail/:id" element={<ProductDetail />} />

            <Route path="login" element={isLogged ? <NotFound /> : <Login />} />
            <Route path="register" element={isLogged ? <NotFound /> : <Register />} />

            <Route path="category" element={isAdmin ? <Categories /> : <NotFound />} />
            <Route path="create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
            <Route path="edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />

            <Route path="history" element={isLogged ? <OrderHistory /> : <NotFound />} />
            <Route path="history/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />

            <Route path="cart" element={isAdmin ? <NotFound /> : <Cart />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
