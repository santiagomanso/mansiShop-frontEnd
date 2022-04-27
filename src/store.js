import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
})

const initialState = {}

const middleWare = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
