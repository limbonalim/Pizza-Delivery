import {Cart} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {DELIVERY} from '../../constants';
import {createOrder} from './clientThunks';

interface ClientState {
  cart: Cart;
  total: number;
  isShowCheckoutModal: boolean;
  isShowCheckForm: boolean;
}

const initialState: ClientState = {
  cart: {},
  total: 0,
  isShowCheckoutModal: false,
  isShowCheckForm: false,
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
    deleteItemFromCart: (state, {payload: id}) => {
      if (state.cart[id] > 1) {
        state.cart[id]--;
      } else {
        delete state.cart[id];
      }
    },
    clearChart: (state) => {
      state.cart = {};
      state.total = 0;
    },
    showCheckoutModal: (state, {payload: total}) => {
      state.isShowCheckoutModal = true;
      state.total = total + DELIVERY;
    },
    closeCheckoutModal: (state) => {
      state.isShowCheckoutModal = false;
    },
    showCheckForm: (state) => {
      state.isShowCheckForm = true;
    },
    closeCheckForm: (state) => {
      state.isShowCheckForm = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, state => {
      console.log('[createOrder.pending]' + state);
    });
    builder.addCase(createOrder.fulfilled, state => {
      console.log('[createOrder.fulfilled]' + state);
    });
    builder.addCase(createOrder.rejected, state => {
      console.log('[createOrder.rejected]' + state);
    });
  }
});

export const selectCart = (state: RootState) => state.client.cart;
export const selectTotal = (state: RootState) => state.client.total;
export const selectIsShowCheckoutModal = (state: RootState) => state.client.isShowCheckoutModal;
export const selectIsShowCheckForm = (state: RootState) => state.client.isShowCheckForm;

export const {
  addToCart,
  deleteItemFromCart,
  clearChart,
  showCheckoutModal,
  closeCheckoutModal,
  showCheckForm,
  closeCheckForm
} = clientSlice.actions;

export const clientReducers = clientSlice.reducer;