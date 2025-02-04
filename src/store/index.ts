import {combineReducers, configureStore, createSelector} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";
import {flightsReducer} from "../flights/flights.slice.ts";

const reducer = combineReducers({
  flights: flightsReducer
});

export const store = configureStore({
  reducer
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();