import {useAppDispatch} from "@/store";
import {useState, useTransition} from "react";
import {flightsSlice} from "@/flights/flights.slice.ts";

export const useAddFlight = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");

  const [isPending, startTransition] = useTransition();

  function handle() {
    startTransition(() => {
      const [year, month, day] = date.split('-').map(Number);
      dispatch(flightsSlice.actions.add({
        title,
        fromCity,
        toCity,
        date: {
          year,
          month,
          day
        }
      }))
    })
  }

  return { handle, setTitle, setDate, setFromCity, setToCity, isPending };
}