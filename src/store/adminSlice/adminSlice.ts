import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchDeleteDish, fetchDeleteOrder, fetchDish, fetchDishes, fetchOrders} from './adminThunks';
import {RootState} from '../../app/store';
import {ApiOrder, Dish, Order} from '../../types';

interface AdminState {
  dishes: Dish[];
  orders: Order[];
  editDish: Dish | null;
  isDishesLoading: boolean;
  isDishLoading: boolean;
  isOrdersLoading: boolean;
  isShowAlert: boolean;
  messageAlert: string;
}

const initialState: AdminState = {
  dishes: [],
  orders: [],
  editDish: null,
  isDishesLoading: false,
  isDishLoading: false,
  isOrdersLoading: false,
  isShowAlert: false,
  messageAlert: '',
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearEditDish: (state) => {
      state.editDish = null;
    },
    setDeletingDish: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.dishes.findIndex((item) => item.id === id);
      state.dishes[index].isDeleting = true;
    },
    setDeletingOrder: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.orders.findIndex((item) => item.id === id);
      state.orders[index].isDeleting = true;
    },
    adminCloseAlert: (state) => {
      state.isShowAlert = false;
      state.messageAlert = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.isDishesLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      state.dishes = dishes;
      state.isDishesLoading = false;
    });
    builder.addCase(fetchDishes.rejected, (state, {error}) => {
      state.isDishesLoading = false;
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
    builder.addCase(fetchDish.pending, (state) => {
      state.editDish = null;
      state.isDishLoading = true;
    });
    builder.addCase(fetchDish.fulfilled, (state, {payload: dish}: PayloadAction<Dish | null>) => {
      state.editDish = dish;
      state.isDishLoading = false;
    });
    builder.addCase(fetchDish.rejected, (state, {error}) => {
      state.isDishLoading = false;
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
    builder.addCase(fetchDeleteDish.rejected, (state, {error}) => {
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.isOrdersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}: PayloadAction<ApiOrder[]>) => {
      if (state.dishes.length > 0 && orders.length > 0) {
        state.orders = orders.map((item) => {
          return {
            client: item.client,
            id: item.id,
            isDeleting: false,
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
        state.isOrdersLoading = false;
      }
    });
    builder.addCase(fetchOrders.rejected, (state, {error}) => {
      state.isOrdersLoading = false;
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
    builder.addCase(fetchDeleteOrder.rejected, (state, {error}) => {
      state.isShowAlert = true;
      state.messageAlert = error.message ? error.message : 'unknown error';
    });
  }
});

export const selectDishes = (state: RootState) => state.admin.dishes;
export const selectOrders = (state: RootState) => state.admin.orders;
export const selectEditDish = (state: RootState) => state.admin.editDish;
export const selectIsDishesLoading = (state: RootState) => state.admin.isDishesLoading;
export const selectIsDishLoading = (state: RootState) => state.admin.isDishLoading;
export const selectIsOrdersLoading = (state: RootState) => state.admin.isOrdersLoading;
export const selectIsAdminShowAlert = (state: RootState) => state.admin.isShowAlert;
export const selectAdminMessageAlert = (state: RootState) => state.admin.messageAlert;

export const {
  clearEditDish,
  setDeletingDish,
  setDeletingOrder,
  adminCloseAlert,
} = adminSlice.actions;
export const adminReducers = adminSlice.reducer;