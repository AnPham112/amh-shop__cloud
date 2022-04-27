import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS, UPDATE_PRODUCT } from "../constants"

const initState = {
  products: [],
  result: null,
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        result: action.payload.result
      }
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case UPDATE_PRODUCT:
      const newProduct = state.products.map(product => (
        product._id === action.payload._id
          ? action.payload
          : product
      ))
      return {
        ...state,
        products: newProduct
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => (
          product._id !== action.payload
        ))
      }
    default:
      return state
  }
}

export default productReducer