import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../../axios-Api';
import {ApiDishes, ApiDish, Dish, EditDish, ApiOrders, ApiOrder} from '../../types';


export const fetchDishes = createAsyncThunk<Dish[]>(
  'admin/fetchAllDishes',
  async () => {
    const response = await axiosApi.get<ApiDishes | null>('/dishes.json');
    const data = response.data;
    if (response.status !== 200) {
      console.log('TODO something');
    }
    if (data) {
      const keys = Object.keys(data);
      return keys.map((id) => {
        return {
          ...data[id],
          id
        };
      });
    }
    return [];
  }
);

export const fetchDish = createAsyncThunk<Dish | null, string>(
  'admin/fetchOneDish',
  async (id) => {
    const response = await axiosApi.get<ApiDish | null>(`/dishes/${id}.json`);
    const data = response.data;
    if (response.status !== 200) {
      console.log('TODO something');
    }
    if (data) {
      return {
        ...data,
        isDeleting: false,
        id
      };
    }
    return null;
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'admin/fetchCreateDish',
  async (dish) => {
    const response = await axiosApi.post('/dishes.json', dish);
    if (response.status !== 200) {
      console.log('TODO something');
    }
  }
);

export const fetchEditDish = createAsyncThunk<void, EditDish>(
  'admin/fetchEditDish',
  async ({dish, id}) => {
    const response = await axiosApi.put(`/dishes/${id}.json`, dish);
    if (response.status !== 200) {
      console.log('TODO something');
    }
  }
);

export const fetchDeleteDish = createAsyncThunk<void, string>(
  'admin/fetchDeleteDish',
  async (id) => {
    const response = await axiosApi.delete(`/dishes/${id}.json`);
    if (response.status !== 200) {
      console.log('TODO something');
    }
  }
);

export const fetchOrders = createAsyncThunk<ApiOrder[]>(
  'admin/fetchAllOrders',
  async () => {
    const response = await axiosApi.get<ApiOrders | null>('/orders.json');
    const data = response.data;
    if (response.status !== 200) {
      console.log('TODO something');
    }
    if (data) {
      const keys = Object.keys(data);
      return keys.map((id): ApiOrder => {
        return {
          ...data[id],
          id
        };
      });
    }
    return [];
  }
);
