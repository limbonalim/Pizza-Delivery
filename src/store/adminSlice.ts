import {createSlice} from '@reduxjs/toolkit';
import {fetchDeleteDish, fetchDish, fetchDishes} from './adminThunks';
import {RootState} from '../app/store';
import {Dish} from '../types';

interface AdminState {
  dishes: Dish[];
  editDish: Dish | null;
}

const initialState: AdminState = {
  dishes: [],
  editDish: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearEditDish: (state) => {
      state.editDish = null;
      console.log('clear');
    },
    setDeletingDish: (state, {payload: id}) => {
      const index = state.dishes.findIndex((item) => item.id === id);
      state.dishes[index].isDeleting = true;
    }
  },
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
    builder.addCase(fetchDish.pending, (state) => {
      console.log('[fetchOne.pending] ' + state);
      state.editDish = null;
    });
    builder.addCase(fetchDish.fulfilled, (state, {payload: dish}) => {
      console.log('[fetchOne.fulfilled] ' + state);
      state.editDish = dish;
    });
    builder.addCase(fetchDish.rejected, (state) => {
      console.log('[fetchOne.rejected] ' + state);
    });
    builder.addCase(fetchDeleteDish.pending, (state) => {
      console.log('[fetchDeleteDish.pending] ' + state);

    });
    builder.addCase(fetchDeleteDish.fulfilled, (state) => {
      console.log('[fetchDeleteDish.fulfilled] ' + state);

    });
    builder.addCase(fetchDeleteDish.rejected, (state) => {
      console.log('[fetchDeleteDish.rejected] ' + state);
    });
  }
});

export const selectDishes = (state: RootState) => state.admin.dishes;
export const selectEditDish = (state: RootState) => state.admin.editDish;

export const {clearEditDish, setDeletingDish} = adminSlice.actions;
export const adminReducers = adminSlice.reducer;