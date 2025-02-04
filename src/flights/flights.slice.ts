import {createReducer, createSelector} from "@reduxjs/toolkit";
import {AppState} from "../store";

export type SortType =
  | "none"
  | "title"
  | "date"
  | "fromCity"
  | "toCity";

export type Flight = {
  id: string;
  title: string;
  fromCity: string;
  toCity: string;
  date: Date
};

type FlightsState = Flight[];

const initialFlightsState: FlightsState = [
  {
    id: '1',
    title: 'ACS-120',
    toCity: 'Moscow',
    fromCity: 'Prague',
    date: new Date('2000/11/20'),
  },
  {
    id: '2',
    title: 'MWD-321',
    toCity: 'New-York',
    fromCity: 'Paris',
    date: new Date('2002/09/22'),
  },
  {
    id: '3',
    title: 'SKF-230',
    toCity: 'Tokyo',
    fromCity: 'San Francisco',
    date: new Date('2012/07/01'),
  },
  {
    id: '4',
    title: "OAS-822",
    toCity: "Madrid",
    fromCity: "Berlin",
    date: new Date('2016/08/12'),
  }
];

export const flightsReducer = createReducer(
  initialFlightsState,
  () => {
    // TODO: reducers
  }
);

export const selectSortedFlight = createSelector(
  (state: AppState) => state.flights,
  (_: AppState, sort: SortType)=> sort,
  (flights, sort) => {
    return flights.map(f => f).sort((a, b) => {
      switch (sort) {
        case "none":
          return a.id.localeCompare(b.id);
        case "title":
            return a.title.localeCompare(b.title);
        case "date":
          return a.date > b.date ? -1 : 1;
        case "fromCity":
          return a.fromCity.localeCompare(b.fromCity);
        case "toCity":
          return a.toCity.localeCompare(b.toCity);
      }
    });
  }
);
