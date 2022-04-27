import axios from "axios";
import { HIDE_LOADER, REFRESH_TOKEN, SHOW_LOADER } from "../constants";
import { toast } from 'react-toastify';
import swal from 'sweetalert2';

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: SHOW_LOADER })
    try {
      const res = await axios.post('/user/login', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = "/"

      if (res.status === 200) {
        dispatch({ type: HIDE_LOADER })
        swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successfully'
        })
      }
    } catch (err) {
      dispatch({ type: HIDE_LOADER })
      return toast.error(err.response.data.msg)
    }
  }
}

export const register = (user) => {
  return async (dispatch) => {
    try {
      await axios.post('/user/register', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = "/"
    } catch (err) {
      return toast.error(err.response.data.msg)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post('/user/logout');
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      return toast.error(err.response.data.msg)
    }
  }
}