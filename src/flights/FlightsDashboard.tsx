import {flightsSlice} from "./flights.slice";
import {useAppSelector} from "@/store";
import FlightList from "@/flights/FlightList";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

export default function FlightsDashboard() {
  const selectedFlightId = useAppSelector(flightsSlice.selectors.selectSelectedFlightId);
  return (
    <div className="flex flex-col w-200">
      {selectedFlightId === undefined
        ? <AddForm />
        : <EditForm flightId={selectedFlightId} />
      }
      <FlightList />
    </div>
  )
}