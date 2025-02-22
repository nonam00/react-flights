import {useAppDispatch, useAppSelector} from "@/store";
import {flightsSlice} from "@/flights/flights.slice.ts";
import {FormEvent, useCallback, useLayoutEffect, useState, useTransition} from "react";

export const useEditFlight = (
  flightId: number
) => {
  const dispatch = useAppDispatch();
  const flight = useAppSelector(state =>
    flightsSlice.selectors.selectFlight(state, flightId));
  const [title, setTitle] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    startTransition(() => {
      setTitle(flight.title);
      setFromCity(flight.fromCity);
      setToCity(flight.toCity);

      const { year, month, day } = flight.date;
      const monthStr = month >= 10 ? month : "0" + month.toString();
      const dayStr = day >= 10 ? day : "0" + day.toString();

      setDate(`${year}-${monthStr}-${dayStr}`);
    })
  }, [flight]);

  function handleEdit(e: FormEvent) {
    startTransition(() => {
      e.preventDefault();
      const [year, month, day] = date.split("-").map(Number);
      dispatch(flightsSlice.actions.edit({
        flight: {
          id: flightId,
          title,
          fromCity,
          toCity,
          date: {
            year,
            month,
            day
          }
        }
      }))
      dispatch(flightsSlice.actions.select({flightId: undefined}))
    })
  }

  const handleCancel = useCallback(() => {
    startTransition(() => {
      dispatch(flightsSlice.actions.select({flightId: undefined}))
    })
  }, [dispatch]);

  return {
    handleEdit, handleCancel,
    flight: { title, date, fromCity, toCity },
    setTitle, setFromCity, setToCity, setDate, isPending
  };
}