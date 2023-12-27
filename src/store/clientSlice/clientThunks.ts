import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder} from '../../types';
import {axiosApi} from '../../axios-Api';


export const createOrder = createAsyncThunk<void, ApiOrder>(
  'client/fetchCreateOrder',
  async (order) => {
    const response = await axiosApi.post('/orders.json', order);
    if (response.status !== 200) {
      console.log('TODO something');
    }
  }
);