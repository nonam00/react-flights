import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type SortType =
  | "none"
  | "title"
  | "date"
  | "fromCity"
  | "toCity";

type CustomDate = {
  year: number;
  month: number;
  day: number;
}

export type Flight = {
  id: number;
  title: string;
  fromCity: string;
  toCity: string;
  date: CustomDate
};

const initialFlightsArray: Flight[] = [
  {
    id: 1,
    title: 'ACS-120',
    toCity: 'Moscow',
    fromCity: 'Prague',
    date: {
      year: 2000,
      month: 11,
      day: 20
    }
  },
  {
    id: 2,
    title: 'MWD-321',
    toCity: 'New-York',
    fromCity: 'Paris',
    date: {
      year: 1999,
      month: 2,
      day: 10
    }
  },
  {
    id: 3,
    title: 'SKF-230',
    toCity: 'Tokyo',
    fromCity: 'San Francisco',
    date: {
      year: 2004,
      month: 2,
      day: 26
    }
  },
  {
    id: 4,
    title: "OAS-822",
    toCity: "Madrid",
    fromCity: "Berlin",
    date: {
      year: 2008,
      month: 12,
      day: 2
    }
  }
];

type FlightsState = {
  ids: number[]
  entities: Record<number, Flight>,
  selectedFlightId: number | undefined,
}

const initialFlightsState: FlightsState = {
  entities: initialFlightsArray.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {} as Record<number, Flight>),
  ids: initialFlightsArray.map(f => f.id),
  selectedFlightId: undefined
}

export const flightsSlice = createSlice({
  name: "flights",
  initialState: initialFlightsState,
  selectors: {
    selectFlight: createSelector(
      (state: FlightsState) => state.entities,
      (_: FlightsState, flightId: number) => flightId,
      (entities, flightId) => entities[flightId]
    ),
    selectSelectedFlightId: (state) => state.selectedFlightId,
    selectSortedIds: createSelector(
      (state: FlightsState) => state.ids,
      (state: FlightsState) => state.entities,
      (_: FlightsState, sort: SortType) => sort,
      (ids, entities, sort) => {
        const flights= ids.map(id => entities[id]);
        flights.sort((a, b) => {
            switch (sort) {
              case "none":  return a.id < b.id ? -1 : 1;
              case "title": return a.title.localeCompare(b.title);
              case "date":
                if (a.date.year > b.date.year) return -1;
                if (a.date.year < b.date.year) return 1
                if (a.date.month > b.date.month) return -1;
                if (a.date.month < b.date.month) return 1;
                if (a.date.day > b.date.day) return -1;
                if (a.date.day < b.date.day) return 1;
                return a.id < b.id ? -1 : 1;
              case "fromCity": return a.fromCity.localeCompare(b.fromCity);
              case "toCity":   return a.toCity.localeCompare(b.toCity);
            }
          });
        return flights.map(flight => flight.id);
      }
    )
  },
  reducers: {
    add: (state, action: PayloadAction<{
      title: string,
      toCity: string,
      fromCity: string,
      date: CustomDate,
    }>) => {
      const id = state.ids.map(i => i).sort()[state.ids.length - 1] + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload
      }
    },
    edit: (state, action: PayloadAction<{flight: Flight}>) => {
      const { flight } = action.payload;
      state.entities[flight.id] = {
        ...flight
      }
    },
    remove: (state, action: PayloadAction<{flightId: number}>) => {
      const { flightId } = action.payload;
      const index = state.ids.findIndex(id => id === flightId);
      state.ids.splice(index, 1);
      if (state.selectedFlightId === flightId) {
        state.selectedFlightId = undefined;
      }
      delete state.entities[flightId];
    },
    select: (state, action: PayloadAction<{flightId: number | undefined}>) => {
      const { flightId } = action.payload;
      state.selectedFlightId = flightId;
    }
  }
});
