import {configureStore} from '@reduxjs/toolkit';
import {adminReducers} from '../store/adminSlice/adminSlice';
import {clientReducers} from '../store/clientSlice/clientSlice';


export const store = configureStore({
  reducer: {
    admin: adminReducers,
    client: clientReducers,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;