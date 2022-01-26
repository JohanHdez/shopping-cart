import { createAction, props } from '@ngrx/store';

export const createSession = createAction('[Header Component] CreateSession');
export const addProduct = createAction('[Product Component] addProduct', props<{ produts: any }> ());
export const removeProduct = createAction('[Product Component] removeProduct', props<{ produts: any }> ());

