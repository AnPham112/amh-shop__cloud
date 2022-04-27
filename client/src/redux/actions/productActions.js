import axios from "axios"
import { toast } from "react-toastify";
import { CREATE_PRODUCT, DELETE_PRODUCT, GET_ALL_PRODUCTS, UPDATE_PRODUCT } from "../constants";

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/products`);
      const { products, result } = res.data
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: { products, result }
      })
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
}

export const uploadProductImage = (formData, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token
        }
      })
      console.log(res)
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }
}

export const createProduct = ({ productImages, ...product }, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/products', { ...product, productImages }, {
        headers: { Authorization: token }
      })
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data.product
      })
      toast.success("Create product successfully")
    }
    catch (error) {
      return toast.error(error.response.data.error)
    }
  }
}

export const updateProduct = ({ productImages, ...product }, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/products/${product._id}`, { ...product, productImages }, {
        headers: { Authorization: token }
      })
      console.log({ ...product, productImages })

      dispatch({
        type: UPDATE_PRODUCT,
        payload: { ...product, productImages }
      })
      toast.success(res.data.msg)
    }
    catch (error) {
      return toast.error(error.response.data.error)
    }
  }
}

export const deleteProduct = (productId, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/products/${productId}`, {
        headers: { Authorization: token }
      })
      dispatch({
        type: DELETE_PRODUCT,
        payload: productId
      })
      toast.success(res.data.msg)
    }
    catch (error) {
      return toast.error(error.response.data.error)
    }
  }
}

