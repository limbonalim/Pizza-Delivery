import {createSlice} from '@reduxjs/toolkit';
import {Cart} from '../../types';
import {RootState} from '../../app/store';
import {createOrder} from './clientThunks';

interface ClientState {
  cart: Cart;
  total: number;
  isShowCheckoutModal: boolean;
  isShowCheckForm: boolean;
  isCreateOrder: boolean;
  isShowAlert: boolean;
  messageAlert: string;
}

const initialState: ClientState = {
  cart: {},
  total: 0,
  isShowCheckoutModal: false,
  isShowCheckForm: false,
  isCreateOrder: false,
  isShowAlert: false,
  messageAlert: '',
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
    showCheckoutModal: (state) => {
      state.isShowCheckoutModal = true;
    },
    closeCheckoutModal: (state) => {
      state.isShowCheckoutModal = false;
    },
    showCheckForm: (state) => {
      state.isShowCheckForm = true;
    },
    closeCheckForm: (state) => {
      state.isShowCheckForm = false;
    },
    getTotal: (state, {payload: total}) => {
      state.total = total;
    },
    closeAlert: (state) => {
      state.isShowAlert = false;
      state.messageAlert = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isCreateOrder = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.isCreateOrder = false;
    });
    builder.addCase(createOrder.rejected, (state, {error}) => {
      state.isCreateOrder = false;
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
  }
});

export const selectCart = (state: RootState) => state.client.cart;
export const selectTotal = (state: RootState) => state.client.total;
export const selectIsShowCheckoutModal = (state: RootState) => state.client.isShowCheckoutModal;
export const selectIsShowCheckForm = (state: RootState) => state.client.isShowCheckForm;
export const selectIsCreateOrder = (state: RootState) => state.client.isCreateOrder;
export const selectIsShowAlert = (state: RootState) => state.client.isShowAlert;
export const selectMessageAlert = (state: RootState) => state.client.messageAlert;

export const {
  addToCart,
  deleteItemFromCart,
  clearChart,
  showCheckoutModal,
  closeCheckoutModal,
  showCheckForm,
  closeCheckForm,
  getTotal,
  closeAlert,
} = clientSlice.actions;

export const clientReducers = clientSlice.reducer;