import axios from "axios"
import { toast } from "react-toastify"
import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORIES } from "../constants"

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/category')
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      })
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
}

export const createCategory = (name, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/category', name, {
        headers: { Authorization: token }
      })
      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data.category
      })
      toast.success("Create category successfully")
    } catch (error) {
      return toast.error(error.response.data.msg)
    }
  }
}

export const editCategory = ({ name, ...cate }, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/category/${cate._id}`, { name: name }, {
        headers: { Authorization: token }
      })
      dispatch({
        type: EDIT_CATEGORY,
        payload: { name, ...cate }
      })
      toast.success(res.data.msg)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
}

export const deleteCategory = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token }
      })
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      })
      toast.success(res.data.msg)
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
}