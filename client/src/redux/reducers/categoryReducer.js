import { CREATE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORIES } from "../constants"


const initState = {
  categories: []
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload]
      }
    case EDIT_CATEGORY:
      const newCategory = state.categories.map(category => (
        category._id === action.payload._id
          ? action.payload
          : category
      ))
      return {
        ...state,
        categories: newCategory
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => (
          category._id !== action.payload
        ))
      }
    default:
      return state
  }
}

export default categoryReducer;