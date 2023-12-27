import {createSlice} from '@reduxjs/toolkit';
import {fetchDeleteDish, fetchDeleteOrder, fetchDish, fetchDishes, fetchOrders} from './adminThunks';
import {RootState} from '../../app/store';
import {Dish, Order} from '../../types';

interface AdminState {
  dishes: Dish[];
  orders: Order[];
  editDish: Dish | null;
}

const initialState: AdminState = {
  dishes: [],
  orders: [],
  editDish: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearEditDish: (state) => {
      state.editDish = null;
    },
    setDeletingDish: (state, {payload: id}) => {
      const index = state.dishes.findIndex((item) => item.id === id);
      state.dishes[index].isDeleting = true;
    },
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
    builder.addCase(fetchOrders.pending, (state) => {
      console.log('[fetchOrders.pending] ' + state);

    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
      console.log('[fetchOrders.fulfilled] ' + state);
      if (state.dishes.length > 0 && orders.length > 0) {
        state.orders = orders.map((item) => {
          return {
            client: item.client,
            id: item.id,
            dishes: Object.keys(item.order).map((id) => {
              const index = state.dishes.findIndex((dish) => id === dish.id);
              if (index === -1) {
                return {
                  title: 'ERROR!',
                  quantity: item.order[id],
                  price: 0
                };
              }
              return {
                title: state.dishes[index].title,
                quantity: item.order[id],
                price: state.dishes[index].price
              };
            }),
          };
        });
      }
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      console.log('[fetchOrders.rejected] ' + state);
    });
    builder.addCase(fetchDeleteOrder.pending, (state) => {
      console.log('[fetchDeleteOrder.pending] ' + state);

    });
    builder.addCase(fetchDeleteOrder.fulfilled, (state) => {
      console.log('[fetchDeleteOrder.fulfilled] ' + state);

    });
    builder.addCase(fetchDeleteOrder.rejected, (state) => {
      console.log('[fetchDeleteOrder.rejected] ' + state);
    });
  }
});

export const selectDishes = (state: RootState) => state.admin.dishes;
export const selectOrders = (state: RootState) => state.admin.orders;
export const selectEditDish = (state: RootState) => state.admin.editDish;

export const {clearEditDish, setDeletingDish} = adminSlice.actions;
export const adminReducers = adminSlice.reducer;