import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from "../../components/product/ProductCard";
import ProductInfo from "../../components/product/ProductInfo";
import { GlobalStateContext } from '../../GlobalState';
import { getAllProduct } from '../../redux/actions/productActions';

function ProductDetail() {
  const state = useContext(GlobalStateContext)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch])
  const params = useParams();
  const { products } = useSelector(state => state.product)
  const addCart = state.userAPI.addCart
  const isAdmin = state.userAPI.isAdmin
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product)
        }
      })
    }

    return () => setProductDetail([])
  }, [params.id, products])


  if (productDetail.length === 0) return null

  return (
    <>
      {productDetail && <ProductInfo productDetail={productDetail} addCart={addCart} />}
      <div className="container">
        {!isAdmin ?
          <>
            <h2 className="related-products__title">Related products</h2>
            <div className="grid wide">
              <div className="row">
                {products.map((product) => {
                  return product.category === productDetail.category
                    ? (
                      <ProductCard key={product._id} product={product} isAdmin={isAdmin} />
                    ) : null
                })}
              </div>
            </div>
          </>
          : null
        }
      </div>
    </>
  )
}

export default ProductDetail