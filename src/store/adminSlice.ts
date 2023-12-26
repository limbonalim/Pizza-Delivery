import {createSlice} from '@reduxjs/toolkit';
import {fetchDishes} from './adminThunks';
import {RootState} from '../app/store';

interface AdminState {
  dishes: Dish[];
}

const initialState: AdminState = {
  dishes: []
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      console.log('[fetchDishes.pending] ' + state);
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      console.log('[fetchDishes.fulfilled] ' + state);
      state.dishes = dishes;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      console.log('[fetchDishes.rejected] ' + state);
    });
  }
});

export const selectDishes = (state: RootState) => state.admin.dishes;

export const {} = adminSlice.actions;
export const adminReducers = adminSlice.reducer;