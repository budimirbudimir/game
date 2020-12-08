import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface SettingsState {
  splashVisible: boolean;
}

const initialState: SettingsState = {
  splashVisible: true,
};

// #region ACTIONS
export const settingsSlice = createSlice({
  name: "settings",
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
export const setSplashVisibleAsync = (value: boolean): AppThunk => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(setSplashVisible(value));
  }, 1000);
};
// #endregion THUNKS

// #region SELECTORS
export const getSplashVisible = (state: RootState) =>
  state.settings.splashVisible;
// #endregion SELECTORS

export default settingsSlice.reducer;
