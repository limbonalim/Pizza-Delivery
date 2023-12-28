import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../../axios-Api';
import {ApiDishes, Dish, EditDish, ApiOrders, ApiOrdersAndDishes, ApiDish} from '../../types';

const getData = (keys: string[], data: ApiDishes | ApiOrders, isDish = false) => {
  if (isDish) {
    return keys.map((id) => {
      return {
        ...data[id],
        isDeleting: false,
        id
      };
    });
  }
  return keys.map((id) => {
    return {
      ...data[id],
      id
    };
  });
};

export const fetchDishes = createAsyncThunk<Dish[]>(
  'admin/fetchAllDishes',
  async () => {
    const response = await axiosApi.get<ApiDishes | null>('/dishes.json');
    const data = response.data;
    if (response.status !== 200) {
      throw new Error('Edit Dishes is fail');
    }
    if (data) {
      const keys = Object.keys(data);
      return getData(keys, data, true);
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
      throw new Error('Get Dish is fail');
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
      throw new Error('Add Dish is fail');
    }
  }
);

export const fetchEditDish = createAsyncThunk<void, EditDish>(
  'admin/fetchEditDish',
  async ({dish, id}) => {
    const response = await axiosApi.put(`/dishes/${id}.json`, dish);
    if (response.status !== 200) {
      throw new Error('Edit Dish is fail');
    }
  }
);

export const fetchDeleteDish = createAsyncThunk<void, string>(
  'admin/fetchDeleteDish',
  async (id) => {
    const response = await axiosApi.delete(`/dishes/${id}.json`);
    if (response.status !== 200) {
      throw new Error('Delete Dish is fail');
    }
  }
);

export const fetchOrders = createAsyncThunk<ApiOrdersAndDishes | null>(
  'admin/fetchAllOrders',
  async () => {
    const responseOrders = await axiosApi.get<ApiOrders | null>('/orders.json');
    const responseDishes = await axiosApi.get<ApiDishes | null>('/dishes.json');
    const dataOrders = responseOrders.data;
    const dataDishes = responseDishes.data;
    if (responseOrders.status !== 200 || responseDishes.status !== 200) {
      throw new Error('Get Orders is fail');
    }

    if (dataOrders && dataDishes) {
      const keysOrders = Object.keys(dataOrders);
      const keysDishes = Object.keys(dataDishes);
      return {
        orders: getData(keysOrders, dataOrders),
        dishes: getData(keysDishes, dataDishes, true),
      };
    }
    return null;
  }
);

export const fetchDeleteOrder = createAsyncThunk<void, string>(
  'admin/fetchDeleteOrder',
  async (id) => {
    const response = await axiosApi.delete(`/orders/${id}.json`);
    if (response.status !== 200) {
      throw new Error('Delete Order is fail');
    }
  }
);
