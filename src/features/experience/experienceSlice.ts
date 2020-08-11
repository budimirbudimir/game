import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

import { PLAYER_GRID } from '../../utils/grid'

export interface PlayerProps {
  id: string
  position: [number, number, number]
}

export interface ExperienceState {
  paused: boolean
  points: number
  players: PlayerProps[]
}

const initialState: ExperienceState = {
  paused: false,
  points: 0,
  players: [
    {
      id: 'first',
      position: PLAYER_GRID.BOTTOM_LEFT,
    },
    {
      id: 'second',
      position: PLAYER_GRID.BOTTOM_CENTER,
    },
    {
      id: 'third',
      position: PLAYER_GRID.BOTTOM_RIGHT,
    },
  ]
};

// #region ACTIONS
export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setPaused: (state, action: PayloadAction<boolean>) => {
      state.paused = action.payload
    },
    setPoints: (state, action: PayloadAction<number>) => {
      state.points = action.payload
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload
    },
    updatePlayer: (state, action: PayloadAction<PlayerProps>) => {
      state.players = [
        ...state.players.filter((p: PlayerProps) => p.id !== action.payload.id),
        action.payload,
      ]
    }
  },
});

export const { setPaused, setPoints, addPoints, updatePlayer } = experienceSlice.actions;
// #endregion ACTIONS

// #region THUNKS
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setPausedAsync = (value: boolean): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(setPaused(value));
  }, 1000);
};
// #endregion THUNKS

// #region SELECTORS
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;
export const getPaused = (state: RootState): boolean => state.experience.paused;
export const getPoints = (state: RootState): number => state.experience.points;
export const getPlayer = (state: RootState, id: string): PlayerProps => {
  return state.experience.players.filter((p: PlayerProps) => p.id === id)[0]
};
// #endregion SELECTORS

export default experienceSlice.reducer;
