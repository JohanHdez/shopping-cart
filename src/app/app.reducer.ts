import { createReducer, on } from '@ngrx/store';
import { createSession, addProduct, removeProduct, removeSession, updateProduct, resetProducts} from './app.actions';
 
export const initialState = 0;

export const initialStateAuth:any = {
  user: null,
  isLoggedIn: false
};

export const initialStateCarts:any = {
  products: [],
};
 
const _authReducer = createReducer(
  initialStateAuth,
  on(createSession, (state, {user}) => ({user: user, isLoggedIn: true})),
  on(removeSession, (state) => ({user: null, isLoggedIn: false})),
);

const _cartsReducer = createReducer(
  initialStateCarts,
  on(addProduct, (state, {product}) => ({products:[...state.products, product]})),
  on(removeProduct, (state, {product}) => ({products: product })),
  on(updateProduct, (state, {product}) => ({products: product })),
  on(resetProducts, (state) => ({products: [] })),

);
// products:[...state.products, produts]
 
export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

export function cartsReducer(state: any, action: any) {
  return _cartsReducer(state, action);
}


