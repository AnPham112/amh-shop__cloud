import React, { useContext, useEffect, useState } from 'react'
import Helmet from '../../components/Helmet'
import ProductCard from '../../components/product/ProductCard'
import { GlobalStateContext } from '../../GlobalState'
import { Button, Card, Text } from '@nextui-org/react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "../../redux/actions/categoryActions"

function Shop() {
  const state = useContext(GlobalStateContext)
  const isAdmin = state.userAPI.isAdmin
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [result, setResult] = useState("")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page * 4}&${category}&${sort}&title[regex]=${search}`)
      setProducts(res.data.products)
      setResult(res.data.result)
    }
    getProducts()
  }, [page, category, sort, search])

  const handleCategory = (e) => {
    setCategory(e.target.value)
    setSearch("")
  }

  const { categories } = useSelector(state => state.category)

  return (
    <Helmet title="Shop">
      <div className="container">
        <div className="products">
          <div className="products__filter__menu">
            <div className="products__filter__menu__container">
              <span className="products__filter__menu__label">Filters: </span>
              <select className="products__filter__menu__select" name="category" value={category} onChange={handleCategory} >
                <option value=''>All Products</option>
                {
                  categories?.map(category => (
                    <option value={"category=" + category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))
                }
              </select>
            </div>

            <input className="products__filter__menu__search__input" type="text" value={search} placeholder="Enter your search!"
              onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="products__filter__menu__sort">
              <span className="products__filter__menu__sort__label">Sort By: </span>
              <select className="products__filter__menu__sort__select" value={sort} onChange={(e) => setSort(e.target.value)} >
                <option value=''>Newest</option>
                <option value='sort=oldest'>Oldest</option>
                <option value='sort=-sold'>Best sales</option>
                <option value='sort=-price'>Price: High-Low</option>
                <option value='sort=price'>Price: Low-High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="products__list">
          <div className="grid wide">
            <div className="row">
              {products ? products.map((product) => (
                (
                  <ProductCard key={product._id} product={product} isAdmin={isAdmin} />
                )
              )) : null}
            </div>
          </div>
        </div>
        <div className="products__load__more">
          {result < page * 4 ? null :
            <Button css={{ m: "4px auto 16px auto" }}
              onClick={() => setPage(page + 1)}
            >
              Load more
            </Button>
          }
        </div>
      </div>
      {products.length === 0 &&
        <div className="container center">
          <Card css={{ mw: "450px" }}>
            <Text h3 css={{ ta: "center" }}>No products exist</Text>
          </Card>
        </div>
      }
    </Helmet >
  )
}

export default Shop