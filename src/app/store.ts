import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import adminSlice from '../components/admin/adminSlice/adminSlice';
import whatIsNewSlice from '../components/admin/adminWhatIsNew/whatIsNewSlice/whatIsNewSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    admin: adminSlice,
    whatIsNew: whatIsNewSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
