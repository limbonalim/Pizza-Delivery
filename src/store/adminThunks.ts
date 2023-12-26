import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosApi} from '../axios-Api';


export const fetchDishes = createAsyncThunk<Dish[]>(
  'admin/fetchAllDishes',
  async () => {
    const response = await axiosApi.get<ApiAnswer | null>('/dishes.json');
    const data = response.data;
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