import {createAsyncThunk} from '@reduxjs/toolkit';
import {FormApiOrder} from '../../types';
import {axiosApi} from '../../axios-Api';


export const createOrder = createAsyncThunk<void, FormApiOrder>(
  'client/fetchCreateOrder',
  async (order) => {
    const response = await axiosApi.post('/orders.json', order);
    if (response.status !== 200) {
      throw new Error('Add Order is fail');
    }
  }
);