import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import experienceReducer from '../features/experience/experienceSlice';
import settingsReducer from '../features/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    experience: experienceReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
