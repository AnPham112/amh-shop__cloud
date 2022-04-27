import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  category: categoryReducer
});

export default rootReducer;