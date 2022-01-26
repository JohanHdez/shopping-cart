import { createReducer, on } from '@ngrx/store';
import { createSession, addProduct, removeProduct} from './app.actions';
 
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
  on(createSession, (state) => [...state, state.user]),
);

const _cartsReducer = createReducer(
  initialStateCarts,
  on(addProduct, (state, {produts}) => ({products:[...state.products, produts]})),
  on(removeProduct, (state, {produts}) => ({products: produts}))
);
 
export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}

export function cartsReducer(state: any, action: any) {
  return _cartsReducer(state, action);
}


