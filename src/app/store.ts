import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import adminSlice from '../components/admin/adminSlice/adminSlice';
import whatIsNewSlice from '../components/admin/adminWhatIsNew/whatIsNewSlice/whatIsNewSlice';

export const store = configureStore({
  reducer: {
    admin: adminSlice,
    whatIsNew: whatIsNewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
