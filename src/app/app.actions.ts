import { createAction, props } from '@ngrx/store';

export const createSession = createAction('[Header Component] createSession', props<{ user: any }> ());
export const removeSession = createAction('[Header Component] removeSession');
export const resetProducts = createAction('[Header Component] resetProducts');
export const addProduct = createAction('[Product Component] addProduct', props<{ product: any }> ());
export const updateProduct = createAction('[Product Component] updateProduct', props<{ product: any }> ());
export const removeProduct = createAction('[Product Component] removeProduct', props<{ product: any }> ());

