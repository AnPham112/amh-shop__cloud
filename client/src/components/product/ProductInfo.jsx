
import React, { useContext, useState } from "react"
import { Row, Button } from "@nextui-org/react"
import { GlobalStateContext } from "../../GlobalState";
import { useNavigate } from "react-router-dom";

function ProductInfo({ productDetail, addCart }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const state = useContext(GlobalStateContext)
  const isAdmin = state.userAPI.isAdmin

  const navigate = useNavigate();
  return (
    <div className="container">
      {isAdmin &&
        <Row css={{ pt: "16px" }}>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </Row>
      }

      <div className="product-info__details">
        {productDetail.productImages?.length &&
          <div className="product-info__details__img">
            <img src={productDetail.productImages[activeThumb].url} alt={productDetail.productImages[activeThumb].url} />
          </div>
        }

        <div className="product-info__box__details">
          <h2 className="product-info__detail__title">{productDetail.title}</h2>
          <p className="product-info__detail__price">${productDetail.price}</p>
          <p className="product-info__detail__desc">{productDetail.description}</p>
          <p className="product-info__detail__sold">Sold: {productDetail.sold}</p>
          <div className="product-info__detail__thumbs">


            {productDetail.productImages?.map((thumb, index) => (
              <div
                key={index}
                onClick={() => setActiveThumb(index)}
                className={`product-info__detail__thumb ${index === activeThumb ? 'active' : ''}`}>
                <img
                  className="thumbnail__img"
                  src={thumb.url}
                  alt={thumb.url}
                />
              </div>
            ))}
          </div>
          {!isAdmin &&
            <Button
              bordered
              auto
              rounded
              css={{
                mt: "16px",
                bgColor: "#fff"
              }}
              className="product-info__detail__buy__btn"
              icon={<i className="fa-solid fa-cart-shopping"></i>}
              onClick={() => addCart(productDetail)}
            >
              Buy now
            </Button>
          }
        </div>
      </div>
    </div >
  )

}

export default ProductInfo