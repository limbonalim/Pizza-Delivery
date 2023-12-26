import {Cart} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface ClientState {
  cart: Cart;
}

const initialState: ClientState = {
  cart: {},
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addToCart: (state, {payload: id}) => {
      if (Object.keys(state.cart).includes(id)) {
        state.cart[id]++;
      } else {
        state.cart[id] = 1;
      }
    },
  }
});

export const selectCart = (state: RootState) => state.client.cart;

export const {addToCart} = clientSlice.actions;

export const clientReducers = clientSlice.reducer;