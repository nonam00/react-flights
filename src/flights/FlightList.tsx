import {memo, useCallback, useState, useTransition} from "react";
import {flightsSlice, SortType} from "./flights.slice";
import {useAppDispatch, useAppSelector} from "@/store";

export default function FlightList() {
  const [sortType, setSortType] = useState<SortType>("none");

  const sortedFlightsIds = useAppSelector((state) =>
    flightsSlice.selectors.selectSortedIds(state, sortType)
  );

  const [isPending, startTransition] = useTransition();

  const changeSortType = useCallback((value: SortType) => {
    startTransition(() => {
      if (value == sortType) {
        return setSortType("none");
      }
      setSortType(value);
    })
  }, [sortType]);

  return (
    <div className="flex flex-col items-center w-[100%]">
      <div className="flex flex-row gap-1 items-center w-[100%] mb-3">
        <button
          className={`flex-1 ${sortType === 'title' ? 'selected': ''}`}
          onClick={() => changeSortType("title")}
          disabled={isPending}
        >
          Title
        </button>
        <button
          className={`flex-1 ${sortType === 'toCity' ? 'selected': ''} `}
          onClick={() => changeSortType("toCity")}
          disabled={isPending}
        >
          To City
        </button>
        <button
          className={`flex-1 ${sortType === 'fromCity' ? 'selected': ''} `}
          onClick={() => changeSortType("fromCity")}
          disabled={isPending}
        >
          From City
        </button>
        <button
          className={`flex-1 ${sortType === 'date' ? 'selected': ''} `}
          onClick={() => changeSortType("date")}
          disabled={isPending}
        >
          Date
        </button>
        <div className="flex-1 mx-[2px]"></div>
        <div className="flex-1 mx-[2px]"></div>
      </div>
      <ul className="flex flex-col list-none w-[100%]">
        {sortedFlightsIds.map((id) => (
          <FlightListItem flightId={id} key={id}/>
        ))}
      </ul>
    </div>
  )
}

const FlightListItem = memo(function UserListItem({
  flightId
}: {
  flightId: number
}) {
  const flight = useAppSelector((state) =>
    flightsSlice.selectors.selectFlight(state, flightId)
  );
  const dispatch = useAppDispatch();

  if (!flight) throw Error(`Flight with id ${flightId} not found in flights store`);

  return (
    <li key={flight.id} className="flex flex-row m-1 gap-1">
      <p className="border-2 border-solid border-transparent flex-1">{flight.title}</p>
      <p className="border-2 border-solid border-transparent flex-1">{flight.fromCity}</p>
      <p className="border-2 border-solid border-transparent flex-1">{flight.toCity}</p>
      <p className="border-2 border-solid border-transparent flex-1">{flight.date.day}/{flight.date.month}/{flight.date.year}</p>
      <button
        className="border-2 border-solid border-transparent flex-1"
        onClick={() => dispatch(flightsSlice.actions.select({flightId}))}
      >
        Edit
      </button>
      <button
        className="border-2 border-solid border-transparent flex-1"
        onClick={() => dispatch(flightsSlice.actions.remove({flightId}))}
      >
        Delete
      </button>
    </li>
  )
})