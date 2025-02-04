import {memo, useState} from "react";
import {selectSortedFlight, SortType} from "./flights.slice";
import {useAppSelector} from "../store";

export default function FlightList() {
  const [sortType, setSortType] = useState<SortType>("none");

  const sortedFlights = useAppSelector((state) =>
    selectSortedFlight(state, sortType)
  );

  const changeSortType = (value: SortType) => {
    if (value == sortType) {
      return setSortType("none");
    }
    setSortType(value);
  }

  return (
    <div className="flex flex-col items-center w-200">
      <div className="flex flex-row gap-1 items-center w-[100%] m-3">
        <button
          className={`flex-1 ${sortType === 'title' ? 'button-selected': ''} `}
          onClick={() => changeSortType("title")}
        >
          Title
        </button>
        <button
          className={`flex-1 ${sortType === 'toCity' ? 'button-selected': ''} `}
          onClick={() => changeSortType("toCity")}
        >
          To City
        </button>
        <button
          className={`flex-1 ${sortType === 'fromCity' ? 'button-selected': ''} `}
          onClick={() => changeSortType("fromCity")}
        >
          From City
        </button>
        <button
          className={`flex-1 ${sortType === 'date' ? 'button-selected': ''} `}
          onClick={() => changeSortType("date")}
        >
          Date
        </button>
      </div>
      <ul className="flex flex-col list-none w-[100%]">
        {sortedFlights.map((user) => (
          <FlightListItem flightId={user.id} key={user.id}/>
        ))}
      </ul>
    </div>
  )
}

const FlightListItem = memo(function UserListItem({
  flightId
}: {
  flightId: string
}) {
  const flight = useAppSelector((state => {
    return state.flights.find(f => f.id === flightId);
  }));

  if (!flight) throw Error(`Flight with id ${flightId} not found in flights store`);

  return (
    <li key={flight.id} className="flex flex-row m-1 gap-1">
      <p className="flex-1">{flight.title}</p>
      <p className="flex-1">{flight.fromCity}</p>
      <p className="flex-1">{flight.toCity}</p>
      <p className="flex-1">{flight.date.toDateString()}</p>
    </li>
  )
})