import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface SettingsState {
  splashVisible: boolean;
}

const initialState: SettingsState = {
  splashVisible: true,
};

// #region ACTIONS
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSplashVisible: (state, action: PayloadAction<boolean>) => {
      state.splashVisible = action.payload;
    },
  },
});

export const { setSplashVisible } = settingsSlice.actions;
// #endregion ACTIONS

// #region THUNKS
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setSplashVisibleAsync = (value: boolean): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(setSplashVisible(value));
  }, 1000);
};
// #endregion THUNKS

// #region SELECTORS
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const getSplashVisible = (state: RootState) => state.settings.splashVisible;
// #endregion SELECTORS

export default settingsSlice.reducer;
